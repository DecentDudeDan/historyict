import { Response } from '@angular/http';
import { User } from './../../core/models/user';
import { BackendService } from './../../core/backend.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'userList',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.css']
})
export class UserListComponent implements OnInit {

  private chance = require('../../../../node_modules/chance').Chance();
  data: User[];
  selectedUsers: User[] = new Array<User>();
  currentUser: User;
  showEdit: Boolean = false;

  constructor(private backendService: BackendService) {
   }

  ngOnInit() {
    this.currentUser = null;

    this.backendService.get('/data')
    .subscribe( (res: User[]) => {
      this.data = res;
    })
  }
  
  addNewUser() {
    this.currentUser = null;
    this.showEdit = !this.showEdit;
  }

  addRandomUser() {
    let user: User = {
      "Name": this.chance.name(),
      "Id": this.chance.natural()
    };

    this.backendService.post('/data', user)
    .subscribe( () => {
      location.reload();
    });
  };

  deleteUser() {
    this.backendService.delete('/data', this.currentUser)
    .subscribe( () => {
      location.reload();
    });
  }

  onSelect(user: User) {
    if ( this.currentUser === user) {
      this.currentUser = null;
    } else {
      this.currentUser = user;
    }

    // if (this.isActive(user)) {
    //   let index = this.selectedUsers.indexOf(user);
    //   if (index > -1) {
    //     this.selectedUsers.splice(index,1);
    //   }
    // } else {
    //   this.selectedUsers.push(user);
    // }

    this.resetState();
  }

  onEditEnter(value: string) {
    let id: string; 
    let name: string = value;
    
    if (this.currentUser === null) {
      id = this.chance.natural();
      let newUser: User = {
        Name: name,
        Id: id
      };

      this.backendService.post('/data', newUser)
      .subscribe( () => {
        location.reload();
      });

    } else {
      id = this.currentUser.Id;
      let editUser: User = {
        Name: name,
        Id: id
      };

      this.backendService.put('/data', editUser)
      .subscribe( () => {
        location.reload();
      });

    }
  }

  isActive(user: User) {
    return this.currentUser === user;
    // for (let i = 0; i < this.selectedUsers.length; i++) {
    //   if (this.selectedUsers[i].Id === user.Id) return true;
    // }
  }

  resetState() {
    this.showEdit = false;
  }

}
