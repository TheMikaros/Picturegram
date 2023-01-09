import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { RespuestaPosts, RespuestaToken, TokenResp, Usuario } from 'src/app/interfaces/interfaces'
import { NavController } from '@ionic/angular';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string | null = null;
  private usuario: Usuario = {};


  constructor(private http: HttpClient, private storage: Storage, private NavCtrl: NavController) {
    this.storage.create()
  }

  getUsuario() {

    if ( !this.usuario._id ) {
      this.checkToken();
    }

    return { ...this.usuario };

  }


  login(email: string, password: string) {

    const data = { email, password };

    return new Promise(resolve => {
      this.http.post(`${URL}/user/login`, data)
        .subscribe(async resp => {
          console.log(resp)

          if ((resp as TokenResp)['ok']) {
            await this.guardarToken((resp as TokenResp).token);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false)
          }
        });
    })

  }

  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }


  async Registro(user: Usuario) {

    return new Promise(resolve => {
      this.http.post(`${URL}/user/create`, user)
        .subscribe(resp => {
          if ((resp as TokenResp)['ok']) {
            this.guardarToken((resp as TokenResp)['token']);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        })
    })

  }


  async checkToken(): Promise<boolean> {

    await this.recovertoken()

    if (!this.token) {
      this.NavCtrl.navigateRoot('/login', { animated: true })
      return Promise.resolve(false);
    }


    return new Promise(resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token!
      });

      this.http.get(`${URL}/user/`, { headers })
        .subscribe(resp => {

          if ((resp as RespuestaToken)['ok']) {
            this.usuario = (resp as RespuestaToken)['usuario'];
            resolve(true);
          } else {
            this.NavCtrl.navigateRoot('/login', { animated: true })
            resolve(false);
          }

        });

    });
  }

  async recovertoken() {
    this.token = await this.storage.get('token') || null;
  }

  logout() {
    this.token   = null;
    this.usuario = {};
    this.storage.clear();
    this.NavCtrl.navigateRoot('/login', { animated: true });
  }

  actualizarUsuario( usuario: Usuario ) {


    const headers = new HttpHeaders({
      'x-token': this.token!
    });


    return new Promise( resolve => {

      this.http.post(`${ URL }/user/update`, usuario, { headers })
        .subscribe( resp => {

          if ( (resp as TokenResp)['ok'] ) {
            this.guardarToken( (resp as TokenResp)['token'] );
            resolve(true);
          } else {
            resolve(false);
          }

        });

    });



  }


}


