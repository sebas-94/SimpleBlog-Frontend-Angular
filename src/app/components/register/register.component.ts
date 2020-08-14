import {Component, OnInit} from '@angular/core';

// Modelos
import {User} from '../../models/user';
// Servicios
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public status: string;

  constructor(private userService: UserService) {
    this.pageTitle = 'Regístrate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '')
  }

  ngOnInit(): void {
    console.log(this.userService.test());
  }

  onSubmit(form) {

    this.userService.register(this.user).subscribe(
      response => {
        console.log(response);

        if (response.status === 'success') {
          this.status = response.status;
          form.reset();
        } else {
          this.status = 'error';
        }

      },
      error => {
        console.log(error as any);
      }
    );

  }


}
