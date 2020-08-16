import {Component, DoCheck, OnInit} from '@angular/core';

// Servicios
import {UserService} from './services/user.service';
import {CategoryService} from './services/category.service';

import {global} from './global';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'blog-angular';
  public identity;
  public token;
  public imageUrl: string;
  public categories;
  public global: string;

  constructor(private userService: UserService,
              private categoryService: CategoryService) {
    this.global = global.url;
    this.loadUser();
  }

  ngOnInit() {
    console.log('onInit');
    this.getCategories();
  }

  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
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

}
