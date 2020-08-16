import {Component, OnInit} from '@angular/core';

// Router
import {ActivatedRoute, Router} from '@angular/router';
// Services
import {UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category.service';
// Models
import {Category} from '../../models/category';
import {Observable} from "rxjs";

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css']
})
export class CategoryNewComponent implements OnInit {

  public pageTitle: string;
  public identity;
  public token;
  public category: Category;
  public status;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private categoryService: CategoryService) {
    this.pageTitle = 'Crear nueva categoría';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.category = new Category(1, '');

  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this.categoryService.create(this.token, this.category).subscribe(
      response => {
        if (response.status === 'success') {
          this.category = response.status;
          this.status = 'success';
          this.router.navigate(['/inicio']);
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error as any);

      }
    );
  }


}
