import {Component, OnInit} from '@angular/core';

// Route
import {ActivatedRoute, Router} from '@angular/router';
// Services
import {UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category.service';
import {PostService} from '../../services/post.service';
// Models
import {Post} from '../../models/post';
import {Category} from '../../models/category';
import {global} from '../../global';


@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {

  public pageTitle: string;
  public identity;
  public token;
  public post: Post;
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
    this.pageTitle = 'Crear entrada';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit(): void {
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
  }


  onSubmit(form) {
    console.log(this.post);
    this.postService.create(this.token, this.post).subscribe(
      response => {
        if (response.status === 'success') {
          this.post = response.post;
          this.status = 'success';
          this.router.navigate(['/inicio']);
        } else {
          this.status = 'error';
        }

      }, error => {
        this.status = 'error';
        console.log(error as any);
      }
    );
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
