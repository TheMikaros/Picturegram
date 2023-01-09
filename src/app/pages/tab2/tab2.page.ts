import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

import { Post } from 'src/app/interfaces/interfaces';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService, UserPhoto } from 'src/app/services/photo.service';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  cargandoGeo = false;

  post : Post = {
    mensaje: '',
    coords: "14,14",
    posicion: false
  };

  constructor( private postsService: PostsService,
               private route: Router, public photoService: PhotoService, public actionSheetController: ActionSheetController) {}


  async crearPost() {

    await this.photoService.photos.forEach(photo => {
      this.tempImages.unshift(photo.webviewPath)
    });
    // this.tempImages =  this.photoService.photos;

    console.log(this.post);
    const creado = await this.postsService.crearPost( this.post );

    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };

    this.tempImages = [];

    this.route.navigateByUrl('/main/tabs/tab1');

  }

  getGeo() {

    // if ( !this.post.posicion ) {
    //   this.post.coords = null;
    //   return;
    // }

    // this.cargandoGeo = true;

    // this.geolocation.getCurrentPosition().then((resp:any) => {
    //   // resp.coords.latitude
    //   // resp.coords.longitude
    //   this.cargandoGeo = false;

    //   const coords = `${ resp.coords.latitude },${ resp.coords.longitude }`;
    //   console.log(coords);
    //   this.post.coords = coords;


    //  }).catch((error:any) => {
    //    console.log('Error getting location', error);
    //    this.cargandoGeo = false;
    //  });


  }

  camara() {

    this.procesarImagen(  );

  }

  libreria() {

    // const options: CameraOptions = {
    //   quality: 60,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   correctOrientation: true,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    // };

    // this.procesarImagen( options );

  }


  async procesarImagen( ) {


    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    var imageUrl = image.webPath;


    this.postsService.subirImagen( imageUrl! );
    this.tempImages.push( imageUrl! );

    // this.camera.IniciarCamara().then( ( imageData:any ) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64 (DATA_URL):


    //   console.log(imageData)



    //  }, (err:any) => {
    //   // Handle err
    //  });
  }



  ///////////////////////////////////


  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
         }
      }]
    });
    await actionSheet.present();
  }

}
