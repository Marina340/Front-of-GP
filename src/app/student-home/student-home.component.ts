import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css'],
})
export class StudentHomeComponent {
  token = localStorage.getItem('token');
  messageNotification: string = '';
  notifications: any;
  name = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    var token = localStorage.getItem('token');

    this.http
      .get('http://127.0.0.1:8000/api/user', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.name = res.name;
        },
        (error: any) => {
          console.log(error);
        }
      );

    this.getNotifications();
  }

  getNotifications() {
    this.http
      .get('http://127.0.0.1:8000/api/getAllNotifications', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          if (res == -1) {
            this.messageNotification = 'No Notifications Yet';
            // console.log(this.messageNotification);
          } else {
            this.notifications = res;
            this.notifications = Object.values(this.notifications);
          }
        }
        // (error: any) => {
        //   console.log(error);
        //   this.messageNotification = 'No Notifications Yet';
        //   console.log(this.messageNotification);
        // }
      );
  }

  getNotificationSender(role: any) {
    if (role == 999) {
      return 'System';
    } else if (role == 1) {
      return 'Student';
    } else if (role == 0) {
      return 'Admin';
    } else if (role == 2) {
      return 'Doctor';
    } else if (role == 3) {
      return 'Teaching Assistant';
    } else {
      return 'Not Handle yet';
    }
  }
}
