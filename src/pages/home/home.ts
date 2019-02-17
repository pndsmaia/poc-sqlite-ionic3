import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  formValues: Array<any> = [];
  usersList;

  constructor(
    public navCtrl: NavController,
    private usersProvider: UsersProvider
  ) {

  }
  ionViewDidEnter() {
    this.getAllUser();
  }

  setUser() {
    this.usersProvider.insert(this.formValues);
    this.getAllUser()
  }

  getAllUser() {
    this.usersProvider.getUsersAll()
      .then((result: any[]) => {
        console.log(result);

        this.usersList = result;
        console.log(this.usersList);
      }).catch((error) => {
        console.log(error);
      })
  }

  deleteUser(id) {
    this.usersProvider.remove(id).then(() => {
      this.getAllUser();
      console.log(this.usersList);
    }).catch((err) => {
      console.log(err);
    });
  }

}
