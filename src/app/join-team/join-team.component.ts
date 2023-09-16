import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.css'],
})
export class JoinTeamComponent {
  token = localStorage.getItem('token');
  students!: [];
  teams!: [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('http://127.0.0.1:8000/api/availableStudents&teams', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.students = res.students;
          this.teams = res.teams;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  sendRequest(id: number, role: number) {
    this.http
      .get(
        `http://127.0.0.1:8000/api/SendRequestForStudent?id=${id}&role=${role}`,
        {
          headers: { Authorization: `Bearer ${this.token}` },
          withCredentials: true,
        }
      )
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
}
