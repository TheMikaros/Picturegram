import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiService } from '../../services/ui.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('sPrincipal') slides!: IonSlides;



  loginUser = {
    email: 'MikoGrenore@Outlook.com',
    password: 'Shana0906MM'
  }

  regUser: Usuario = {
    email: "test0",
    password: "123qwe",
    nombre: "test0",
    avatar: 'av-1.png'
  }


  constructor(private userService: UsuarioService, private navCtrl: NavController, private uiService: UiService) {
  }


  ngOnInit() {

  }


  async login(fLogin: NgForm) {

    if (fLogin.invalid) { return; }

    const valido = await this.userService.login(this.loginUser.email, this.loginUser.password)

    if (valido) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true })
    } else {
      this.uiService.infAlert('El Usuario y contraseña no son correctos');
    }

  }


  async regitro(fReg: NgForm) {

    if( fReg.invalid){ return;}

    const valido = await this.userService.Registro(this.regUser);

    if (valido) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true })
    } else {
      this.uiService.infAlert('El Correo ya existe');
    }

    console.log(fReg.valid)
  }


  toLogin() {
    this.slides.slideTo(0);
  }

  toRegister() {
    this.slides.slideTo(1);
  }

}
