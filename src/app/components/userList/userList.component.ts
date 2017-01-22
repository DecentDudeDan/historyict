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

  data: User[];
  selectedUsers: User[] = new Array<User>();
  currentUser: User;

  constructor(private backendService: BackendService) {
   }

  ngOnInit() {
    this.backendService.get('/data')
    .subscribe( (res: User[]) => {
      this.data = res;
    })
  }

  addUser() {
    this.backendService.post('/data')
    .subscribe( () => {
      location.reload();
    });
  };

  deleteUsers() {
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
  }

  isActive(user: User) {
    return this.currentUser === user;
    // for (let i = 0; i < this.selectedUsers.length; i++) {
    //   if (this.selectedUsers[i].Id === user.Id) return true;
    // }
  }

}
