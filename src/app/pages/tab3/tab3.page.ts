import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { UiService } from 'src/app/services/ui.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{


  usuario: Usuario = {};

  constructor( private usuarioService: UsuarioService,
               private uiService: UiService,
               private postsService: PostsService ) { }

  ngOnInit() {

    this.usuario = this.usuarioService.getUsuario();

    console.log(this.usuario);

  }


  async actualizar( fActualizar: NgForm ) {

    console.log('User update', this.usuario)

    if ( fActualizar.invalid ) { return; }

    const actualizado = await this.usuarioService.actualizarUsuario( this.usuario );
    if ( actualizado ) {
      // toast con el mensaje de actualizado
      this.uiService.presentToast( 'Registro actualizado' );
    } else {
      // toast con el error
      this.uiService.presentToast( 'No se pudo actualizar' );
    }

  }



  logout() {

    this.postsService.paginaPosts = 0;
    this.usuarioService.logout();

  }

}
