import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  teams: any[] = [];
  team: any;
  projectTitle: string = 'Choose Team';
  projectID!: number;
  projectDescription: string = '';
  projectMembers: any;
  teamImageUrl: string = '';
  showTeamInfo: boolean = false;
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.teams.length > 0) {
      const firstTeam = this.teams[0];
      this.displayTeamInfo(firstTeam);
    }

    this.getAllTeams();
  }

  getAllTeams() {
    this.http
      .get('http://127.0.0.1:8000/api/allTeams', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.teams = Object.values(res);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  private displayTeamInfo(team: any) {
    // this.projectTitle = team.name;
    // this.projectDescription = team.description;
    // this.projectTeam = 'Team members: ';
    // this.teamImageUrl = team.imageUrl;

    this.showTeamInfo = true;
  }

  onViewButtonClick(id: any) {
    this.http
      .get(`http://127.0.0.1:8000/api/team/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.getProject(res.project_id);
          this.projectMembers = Object.values(res.members);
          this.projectMembers = this.projectMembers.filter(
            (department: any) => department !== null
          );
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getProject(id: any) {
    this.http
      .get(`http://127.0.0.1:8000/api/project/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.projectID = res.project_id;
          this.projectTitle = res.title;
          this.projectDescription = res.description;
          this.showTeamInfo = true;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
