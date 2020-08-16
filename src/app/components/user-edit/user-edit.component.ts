import {Component, OnInit} from '@angular/core';

// Modelos
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
// Global conf
import {global} from '../../global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public status: string;
  public identity;
  public token;
  public imageUrl;
  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg, .jpeg, .png, .gif',
    maxSize: '5',
    uploadAPI: {
      url: global.url + 'user/upload',
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
      attachPinBtn: 'Elige tu avatar...'
    }
  };

  constructor(private userService: UserService) {
    this.pageTitle = 'Ajustes';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.imageUrl = global.url + 'user/avatar/' + this.identity.image;
    // Rellena objeto usuario
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      '',
      this.identity.description,
      this.identity.image
    );

  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this.userService.update(this.token, this.user).subscribe(
      response => {

        if (response) {
          this.status = 'success';

          // Actualiza usuario en sesión
          if (response.changes.name) {
            this.user.name = (response as any).changes.name;
          }
          if (response.changes.surname) {
            this.user.surname = response.changes.surname;
          }
          if (response.changes.email) {
            this.user.email = response.changes.email;
          }
          if (response.changes.description) {
            this.user.description = response.changes.description;
          }
          if (response.changes.image) {
            this.user.image = response.changes.image;
          }

          this.identity = response.changes;
          localStorage.setItem('identity', JSON.stringify(this.identity));
        }

      }, error => {
        this.status = 'error';
        console.log(error as any);
      }
    );
  }

  avatarUpload(data) {
    this.user.image = data.body.image;
    console.log(data.body.image);
  }

}
