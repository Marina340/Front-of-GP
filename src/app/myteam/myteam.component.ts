import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.css'],
})
export class MyteamComponent {
  token = localStorage.getItem('token');
  message = '';
  myTeam: any;
  members!: String[];
  doctors!: any[];
  departments!: String[];
  ideas: any[] = [];
  newIdea: any = {};
  haveIdea!: boolean;
  haveProject: boolean = false;
  myIdea: any;
  myProject: any;

  listOfTAs: any[] = [];
  ta1!: any;
  ta2!: any;
  ta3!: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.http
      .get('http://127.0.0.1:8000/api/myTeamProfile', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.myTeam = res;
          this.handleMembers(res.members);
          this.handleDepartments(res.departments);
        },
        (error: any) => {
          console.log(error);
          this.message = 'You are not in Team yet.';
        }
      );

    this.http
      .get('http://127.0.0.1:8000/api/getAllTAs', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.listOfTAs = res;
      });

    this.getAllDrs();
    this.getMyIdea();
    this.getMyProject();
  }

  openAddIdeaModal() {
    this.newIdea = {};
    $('#addIdeaModal').modal('show');
  }

  deleteIdea() {
    this.http
      .get('http://127.0.0.1:8000/api/deleteIdea', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          location.reload();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  addIdea() {
    this.ideas.push(this.newIdea);
    const newIdeaForm = this.formBuilder.group({
      doctorName: this.newIdea.doctorName,
      title: this.newIdea.title,
      ideaDescription: this.newIdea.ideaDescription,
      technology: this.newIdea.technology,
      ta1: this.ta1,
      ta2: this.ta2,
      ta3: this.ta3,
    });

    this.http
      .post('http://127.0.0.1:8000/api/createIdea', newIdeaForm.getRawValue(), {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          console.log('done');
          location.reload();
        },
        (error: any) => {
          console.log(error);
          console.log('error');
        }
      );

    this.newIdea = {};
    $('#addIdeaModal').modal('hide');
  }

  handleMembers(members: any) {
    this.members = Object.values(members);
    this.members = this.members.filter((member) => member !== null);
  }

  handleDoctors(doctors: any) {
    this.doctors = Object.values(doctors);
    this.doctors = this.doctors.filter((doctor) => doctor !== null);
  }

  handleDepartments(departments: any) {
    this.departments = Object.values(departments);
    this.departments = Array.from(new Set(this.departments));
    this.departments = this.departments.filter(
      (department) => department !== null
    );
  }

  getAllDrs() {
    this.http
      .get('http://127.0.0.1:8000/api/getAllDoctors', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.handleDoctors(res);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getMyIdea() {
    this.http
      .get('http://127.0.0.1:8000/api/getMyIdea', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.haveIdea = res;
          this.myIdea = res;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getMyProject() {
    this.http
      .get('http://127.0.0.1:8000/api/getMyProject', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.myProject = res;
          this.haveProject = true;
        },
        (error: any) => {
          console.log(error);
          this.haveProject = false;
          console.log(this.haveProject);
        }
      );
  }

  onFileChange(event: any) {}
}
