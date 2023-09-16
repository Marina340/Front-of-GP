import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-allprojects',
  templateUrl: './allprojects.component.html',
  styleUrls: ['./allprojects.component.css'],
})
export class AllprojectsComponent {
  token = localStorage.getItem('token');
  userRole = 0; // Replace with the actual user role value
  selectedDepartment = '';
  selectedSupervisor: string = '';
  projectTitle: string = 'Choose Project';
  projectDescription: string = '';
  projectTeam: string = '';
  projectTools: string = '';
  projects!: any;
  departments = ['Department 1', 'Department 2', 'Department 3']; // Replace with actual department values
  supervisors: string[] = ['ahmed','mohamed','ali'];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.http
      .get('http://127.0.0.1:8000/api/allprojects', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.projects = res;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  onProjectButtonClick(project: {
    title: string;
    description: string;
    team: string;
    tools: string;
  }) {
    this.projectTitle = project.title;
    this.projectDescription = project.description;
    this.projectTools = project.tools;
  }

  filterByDepartment() {
    // Implement filtering logic based on the selected department
    // You can filter the 'projects' array or make an API call to fetch filtered projects
    // Update the 'projects' array with the filtered results
  }
  filterBySupervisor() {

  }
}
