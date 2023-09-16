import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

declare const $: any; // Declare the jQuery variable

@Component({
  selector: 'app-representative-home',
  templateUrl: './representative-home.component.html',
  styleUrls: ['./representative-home.component.css'],
})
export class RepresentativeHomeComponent {
  token = localStorage.getItem('token');
  ideas: any[] = [];
  newIdea: any = {};
  selectedIdea: any = {};

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.getMyIdeas();
  }

  openAddIdeaModal(): void {
    this.newIdea = {};
    $('#addIdeaModal').modal('show');
  }

  addIdea(): void {
    this.ideas.push(this.newIdea);
    console.log(this.newIdea);

    const newIdeaForm = this.formBuilder.group({
      title: this.newIdea.title,
      description: this.newIdea.ideaDescription,
      tools: this.newIdea.technology,
    });

    this.http
      .post(
        'http://127.0.0.1:8000/api/createRepIdea',
        newIdeaForm.getRawValue(),
        {
          headers: { Authorization: `Bearer ${this.token}` },
          withCredentials: true,
        }
      )
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

  openIdeaDetailsModal(event: Event, idea: any): void {
    event.preventDefault();
    this.selectedIdea = idea;
    $('#ideaDetailsModal').modal('show');
  }

  removeIdea(id: number): void {
    console.log(id);
    this.ideas.splice(id, 1);
    this.http
      .get(`http://127.0.0.1:8000/api/deleteIdea/${id}`, {
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

  getMyIdeas() {
    this.http
      .get('http://127.0.0.1:8000/api/viewCompanyIdeas', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.ideas = res;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
