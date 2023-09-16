import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-available-ideas',
  templateUrl: './available-ideas.component.html',
  styleUrls: ['./available-ideas.component.css'],
})
export class AvailableIdeasComponent {
  token = localStorage.getItem('token');
  role: number = 2;
  doctor: string = '';
  selectedIdea: any = {};
  ideas!: any[];
  ta1!: any;
  ta2!: any;
  ta3!: any;
  listOfTAs: any[] = [];
  listOfDoctors: any[] = [];
  listOfIdeas: any[] = [];
  isSended: boolean = false;
  isEmpty = false;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.http
      .get('http://127.0.0.1:8000/api/getAllDoctors', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.listOfDoctors = res;
      });
    this.http
      .get('http://127.0.0.1:8000/api/getAllDoctorsIdeas', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.listOfIdeas = res;
        console.log(this.listOfIdeas.length);
        if (this.listOfIdeas.length == 0) {
          this.isEmpty = true;
        }
      });
    this.http
      .get('http://127.0.0.1:8000/api/getAllTAs', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.listOfTAs = res;
        console.log(this.listOfTAs);
      });
  }

  showIdeaDetailsModal(idea: any): void {
    this.selectedIdea = idea;
    $('#ideaDetailsModal').modal('show');
  }

  hideIdeaDetailsModal(): void {
    this.selectedIdea = null;
    $('#ideaDetailsModal').modal('hide');
  }

  showAddTAsModal(idea: any): void {
    this.selectedIdea = idea;
    $('#addTAsModal').modal('show');
    const ideaDetailsModal = $('#ideaDetailsModal');

    Modal.getOrCreateInstance(ideaDetailsModal[0]).hide();
  }

  submitTAs(): void {
    var newProject = this.formBuilder.group({
      idea_id: this.selectedIdea.id,
      ta1: this.ta1,
      ta2: this.ta2,
      ta3: this.ta3,
    });

    console.log(newProject.value);

    this.http
      .post(
        'http://127.0.0.1:8000/api/convertIdeaProject',
        {},
        {
          headers: { Authorization: `Bearer ${this.token}` },
          withCredentials: true,
        }
      )
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (error: any) => {
          console.log(error);
        }
      );

    this.isSended = true;
    this.hideAddTAsModal();
  }

  hideAddTAsModal(): void {
    const addTAsModal = $('#addTAsModal');
    this.selectedIdea = null;
    this.ta1 = '';
    this.ta2 = '';
    this.ta3 = '';
    Modal.getOrCreateInstance(addTAsModal[0]).hide();
  }
}
