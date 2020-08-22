import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/post';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/user';
import {global} from '../../global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public pageTitle: string;
  public url;
  public user: User;
  public posts: Array<Post>;
  public identity;
  public token;

  constructor(private postService: PostService,
              private userService: UserService,
              private route: ActivatedRoute) {
    this.url = global.url;
  }

  ngOnInit(): void {
    this.loadUser();
    this.getProfile();
  }

  loadUser() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  getProfile() {
    // UserId desde la URL
    this.route.params.subscribe(params => {
      const userId = +params.id;
      this.getUser(userId);
      this.getPosts(userId);
    });
  }

  getUser(userId) {
    this.userService.getUser(userId).subscribe(
      response => {
        this.user = response.user;

      }, error => {
        console.log(error as any);
      }
    );
  }

  getPosts(userId) {
    this.userService.getPosts(userId).subscribe(
      response => {
        if (response.status === 'success') {
          this.posts = response.posts;
        }

      }, error => {
        console.log(error as any);
      }
    );
  }

  deletePost(id) {
    this.postService.delete(this.token, id).subscribe(
      response => {
        this.getProfile();

      }, error => {
        console.log(error as any);
      }
    );
  }


}
