import {Component, OnInit} from '@angular/core';

// Modelos
import {User} from '../../models/user';
// Servicios
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public status: string;
  public token: string;
  public identity: any;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
    this.pageTitle = 'Identifícate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit(): void {
    // Se ejecuta siempre, pero solo cierra cuando le llega 'sure'
    this.logout();
  }

  onSubmit(form) {
    this.userService.signup(this.user).subscribe(
      response => {

        // Devuelve el token
        if (response.status !== 'error') {
          this.status = 'success';
          this.token = response;

          // Devuelve usuario identificado
          this.userService.signup(this.user, true).subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            response => {
              this.identity = response;

              // Persiste token e identity
              console.log(this.token);
              console.log(this.identity);
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));

              this.router.navigate(['inicio']);

            },
            error => {
              this.status = 'error';
              console.log(error as any);

            }
          );
          // FIN Devuelve usuario identificado

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

  logout() {
    this.route.params.subscribe(params => {
      const logout = +params.sure;

      if (logout === 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        this.router.navigate(['inicio']);
      }

    });
  }

}
