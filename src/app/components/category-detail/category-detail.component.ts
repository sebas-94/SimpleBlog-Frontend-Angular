import {Component, OnInit} from '@angular/core';

import {global} from '../../global';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {Post} from '../../models/post';
import {Category} from '../../models/category';
import {UserService} from '../../services/user.service';
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  public pageTitle: string;
  public category: Category;
  public posts: Array<Post>;
  public url: string;
  public identity;
  public token;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private postService: PostService,
              private userService: UserService) {
    this.url = global.url;
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();
  }

  ngOnInit(): void {
    this.getPostsByCategory();
  }


  getPostsByCategory() {
    this.route.params.subscribe(params => {
      const id = +params.id;

      this.categoryService.getCategory(id).subscribe(
        response => {
          if (response.status === 'success') {
            this.category = response.category;


            this.categoryService.getPosts(id).subscribe(
              // tslint:disable-next-line:no-shadowed-variable
              response => {
                console.log(response);
                if (response.status === 'success') {
                  this.posts = response.posts;
                } else {
                  this.router.navigate(['/inicio']);
                }

              }, error => {
                console.log(error as any);
              }
            );


          } else {
            this.router.navigate(['/inicio']);
          }

        }, error => {
          console.log(error as any);
        }
      );

    });

  }


  deletePost(post) {
    this.postService.delete(this.token, post).subscribe(
      response => {
        this.getPostsByCategory();
      },
      error => {
        console.log(error as any);
      }
    );

  }


}
