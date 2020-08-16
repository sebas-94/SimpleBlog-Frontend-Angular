import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category.service';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/post';
import {Category} from '../../models/category';
import {global} from '../../global';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  public pageTitle: string;
  public identity;
  public token;
  public post: any;
  public status: string;
  public categories: Array<Category>;
  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg, .jpeg, .png, .gif',
    maxSize: '5',
    uploadAPI: {
      url: global.url + 'post/upload',
      method: 'POST',
      headers: {
        Authorization: this.userService.getToken()
      }
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      attachPinBtn: 'Elige tu imagen...'
    }
  };

  constructor(public route: ActivatedRoute,
              public router: Router,
              public userService: UserService,
              public categoryService: CategoryService,
              public postService: PostService) {
    this.pageTitle = 'Editar entrada';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit(): void {
    this.getCategories();
    this.getPost();
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
  }


  onSubmit(form) {
    console.log(this.post);
    this.postService.update(this.token, this.post).subscribe(
      response => {
        if (response.status === 'success') {
          // this.post = response.post;
          this.status = 'success';
          this.router.navigate(['/entrada', this.post.id]);
        } else {
          this.status = 'error';
        }

      }, error => {
        this.status = 'error';
        console.log(error as any);
      }
    );
  }

  getPost() {
    this.route.params.subscribe(params => {
      const id = +params.id;

      this.postService.getPost(id).subscribe(
        response => {
          if (response.status === 'success') {
            this.post = response.post;
          } else {
            this.router.navigate(['/inicio']);
          }

        }, error => {
          console.log(error as any);
          this.router.navigate(['/inicio']);

        }
      );
    });

  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      response => {
        if (response.status === 'success') {
          this.categories = response.categories;
        }

      }, error => {
        console.log(error as any);
      }
    );
  }

  imageUpload(data) {
    this.post.image = data.body.image;
  }

}
