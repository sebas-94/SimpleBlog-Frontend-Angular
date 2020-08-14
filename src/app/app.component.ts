import {Component, DoCheck, OnInit} from '@angular/core';

// Servicios
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'blog-angular';
  public identity;
  public token;

  constructor(public userService: UserService) {
    this.loadUser();
  }

  ngOnInit() {
    console.log('onInit');
  }

  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

}
