import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-student-landing-page',
  templateUrl: './student-landing-page.component.html',
  styleUrls: ['./student-landing-page.component.css'],
})
export class StudentLandingPageComponent {
  token = localStorage.getItem('token');
  student!: any;
  inTeam!: boolean;
  isLeader!: boolean;
  isFull: boolean = false;
  members: any;
  haveProject: boolean = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    var token = localStorage.getItem('token');

    this.http
      .get('http://127.0.0.1:8000/api/showMyProfile', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.student = res;
          this.inTeam = res.in_team;
          this.isLeader = res.is_leader;
          this.handleIsFull();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  openFriendRequestsModal() {
    $('#friendRequestsModal').modal('show');
  }

  handleIsFull() {
    this.http
      .get('http://127.0.0.1:8000/api/myTeamProfile', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.members = res.members;
        this.members = Object.values(res.members);
        this.members = Array.from(new Set(this.members));
        this.members = this.members.filter((member: null) => member !== null);
        const count = Object.keys(this.members).length;

        res.project_id == null
          ? (this.haveProject = false)
          : (this.haveProject = true);

        if (count == 5) {
          this.isFull = true;
        }
      });
  }

  openChat() {
    this.router.navigate(['/chatify']);
  }
}
