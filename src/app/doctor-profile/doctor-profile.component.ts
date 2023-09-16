import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css'],
})
export class DoctorProfileComponent {
  token = localStorage.getItem('token');
  ideas: any[] = [];
  myideas: any[] = [];
  isModalOpen = false;
  doctor: any;
  newIdea: any = {};
  skills!: any;
  items: any[] = [];
  userImage: string = './assets/img.png';
  userImageFromBack: any;
  teams!: any;

  imageName: string = '';
  imagePath: string = '';
  newSkill: string = '';
  canAddIdea: boolean = true;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.http
      .get('http://127.0.0.1:8000/api/showMyProfileForDoctor', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.doctor = res;
      });

    this.http
      .get('http://127.0.0.1:8000/api/getAllMyIdeas', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.myideas = res;
      });

    this.getExperience();
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
          if (this.teams.length >= 3) {
            this.deleteIdeas();
            this.canAddIdea = false;
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  toggleEditMode(item: any) {
    if (item.isEditMode) {
      item.value = item.editedValue;
    } else {
      item.editedValue = item.value;
    }

    item.isEditMode = !item.isEditMode;

    const itemsArray = this.items.map((item: { value: any }) => item.value);

    const itemsString = itemsArray.join(',');

    this.http
      .post(
        'http://127.0.0.1:8000/api/editExperienceForDoctor',
        { experience: itemsString },
        {
          headers: { Authorization: `Bearer ${this.token}` },
          withCredentials: true,
        }
      )
      .subscribe(
        (res: any) => {
          // console.log(res);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  removeItem(item: any) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }

    const itemsArray = this.items.map((item: { value: any }) => item.value);

    const itemsString = itemsArray.join(',');

    this.http
      .post(
        'http://127.0.0.1:8000/api/editExperienceForDoctor',
        { experience: itemsString },
        {
          headers: { Authorization: `Bearer ${this.token}` },
          withCredentials: true,
        }
      )
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  addSkill() {
    if (this.newSkill.trim() !== '') {
      this.items.push({
        value: this.newSkill,
        editedValue: '',
        isEditMode: false,
      });
      this.newSkill = '';
      const modal = document.getElementById('myModal');
    }

    const itemsArray = this.items.map((item: { value: any }) => item.value);

    const itemsString = itemsArray.join(',');
    console.log(itemsString);

    this.http
      .post(
        'http://127.0.0.1:8000/api/editExperienceForDoctor',
        { experience: itemsString },
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
  }

  getExperience() {
    this.http
      .get('http://127.0.0.1:8000/api/getExperience', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.skills = res;
          this.items = this.skills.map((value: any) => ({
            value,
            editedValue: '',
            isEditMode: false,
          }));
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imageName = file.name; // Save the image name
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userImage = e.target.result;
        this.uploadImage(file);
        this.getImage();
      };
      reader.readAsDataURL(file);
    }
  }

  getImage() {
    this.http
      .get('http://127.0.0.1:8000/api/getImage', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          // this.userImage = res.image;

          if (res == null) {
            console.log('the image is null');
          } else {
            console.log('the image is not null1');
            console.log(res);
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  uploadImage(file: File) {
    const formData: FormData = new FormData();
    formData.append('image', file);

    this.http
      .post('http://127.0.0.1:8000/api/storeStudentImage', formData, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  openAddIdeaModal() {
    this.newIdea = {};
    $('#addIdeaModal').modal('show');
  }

  addIdea() {
    this.ideas.push(this.newIdea);

    const newIdeaForm = this.formBuilder.group({
      title: this.newIdea.title,
      description: this.newIdea.ideaDescription,
      tools: this.newIdea.technology,
      doctorName: this.newIdea.doctorName,
    });

    this.http
      .post(
        'http://127.0.0.1:8000/api/createDoctorIdea',
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
        },
        (error: any) => {
          console.log(error);
          console.log('error');
        }
      );

    this.newIdea = {};
    $('#addIdeaModal').modal('hide');
  }

  deleteIdea() {}

  deleteIdeas() {
    this.http
      .get('http://127.0.0.1:8000/api/deleteIdeasForDoctor', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          // console.log(res);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
