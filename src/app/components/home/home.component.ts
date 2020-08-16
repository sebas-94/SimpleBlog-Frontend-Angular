import {Component, OnInit} from '@angular/core';

// Services
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
// Models
import {Post} from '../../models/post';
// Global
import {global} from '../../global';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public pageTitle: string;
  public url;
  public posts: Array<Post>;
  public identity;
  public token;

  constructor(public postService: PostService,
              public userService: UserService) {
    this.pageTitle = 'Inicio';
    this.url = global.url;
    this.identity = this.userService.getIdentity();
    console.log(this.identity);
    this.token = this.userService.getToken();
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(
      response => {
        if (response.status === 'success') {
          this.posts = response.posts;
        }
      },
      error => {
        console.log(error as any);
      }
    )
    ;
  }

}
