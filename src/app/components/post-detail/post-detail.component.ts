import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/post';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  public post: any;

  constructor(public postService: PostService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit(): void {
    this.getPost();
  }


  getPost() {
    this.route.params.subscribe(params => {
      const id = +params.id;

      this.postService.getPost(id).subscribe(
        response => {
          if (response.status === 'success') {
            this.post = response.post;
            console.log(this.post);
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

}
