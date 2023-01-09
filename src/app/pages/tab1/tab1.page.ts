import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];
  enable = true;

  constructor(private postsService: PostsService) { }


  ngOnInit(): void {
    this.loadData()
    this.posts = [];
      this.enable=true;
  }

  loadData(ev?: any, pull: boolean = false) {
    this.postsService.getPost(pull).subscribe(
      resp => {
        console.log(resp)
        this.posts.push(...resp.posts);

        if (ev) {
          ev.target.complete()

          if (resp.posts.length === 0) {
            ev.target.disabled = true;
            this.enable=false;
          }
        }

      }
    );


  }


  doRefresh(ev:any){
    this.loadData(ev, true);
  }

}
