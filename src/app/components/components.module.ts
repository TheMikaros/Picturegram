import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { PostsService } from '../services/posts.service';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectionComponent } from './avatar-selection/avatar-selection.component';



@NgModule({
  declarations: [PostComponent, PostsComponent, AvatarSelectionComponent],
  imports: [
    CommonModule, IonicModule, PipesModule
  ],
   exports: [PostsComponent,AvatarSelectionComponent]
})
export class ComponentsModule { }
