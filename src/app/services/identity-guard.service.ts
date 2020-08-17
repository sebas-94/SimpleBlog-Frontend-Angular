import {Injectable} from '@angular/core';

import {CanActivate, Router} from '@angular/router';
import {UserService} from './user.service';


@Injectable({
  providedIn: 'root'
})
export class IdentityGuardService implements CanActivate {

  constructor(private router: Router,
              private userService: UserService) {
  }

  canActivate() {
    const identity = this.userService.getIdentity();

    if (identity) {
      return true;
    } else {
      this.router.navigate(['/error']);
      return false;
    }

  }

}
