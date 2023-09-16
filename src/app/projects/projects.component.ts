import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  token = localStorage.getItem('token');
  projects: any;
  projectsFordepartment: any;
  selectedProject: any;
  filteredData: any[] = [];
  countFilteredData: number = 0;
  years: number[] = [2021, 2022, 2023]; // Replace with your available years
  departments: string[] = ['Department A', 'Department B', 'Department C']; // Replace with your available departments
  supervisors: string[] = ['Supervisor A', 'Supervisor B', 'Supervisor C']; // Replace with your available supervisors
  selectedYear: number | null = null;
  selectedDepartment: string = '';
  selectedSupervisor: string = '';
  searchTerm: string = '';

  constructor(private http: HttpClient) {}

  filterData() {
    this.filteredData = this.projects.filter((project: any) => {
      // Apply filters based on selectedYear, selectedDepartment, and selectedSupervisor
      let isYearMatch = true;
      let isDepartmentMatch = true;
      let isSupervisorMatch = true;

      if (this.selectedYear !== null) {
        isYearMatch = project.year === this.selectedYear;
      }

      if (this.selectedDepartment !== '') {
        isDepartmentMatch = project.department === this.selectedDepartment;
      }

      if (this.selectedSupervisor !== '') {
        isSupervisorMatch = project.supervisor === this.selectedSupervisor;
      }

      // Apply search filter based on searchTerm
      const isSearchMatch =
        project.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Return true if all filters match
      return isYearMatch && isDepartmentMatch && isSupervisorMatch && isSearchMatch;
    });

    this.countFilteredData = this.filteredData.length;
  }

  ngOnInit() {
    this.http
      .get('http://127.0.0.1:8000/api/AllPreviousProjects', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.projects = Object.values(res);
          this.filteredData = this.projects;
          this.countFilteredData = this.projects.length;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  AllPreviousProjectsForDepartment(department: string): Observable<any> {
    return this.http.get(
      `http://127.0.0.1:8000/api/AllPreviousProjectsForDepartment/${department}`,
      {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      }
    );
  }

  openModal(project: any) {
    this.selectedProject = project;
    const modal = document.getElementById('projectModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  closeModal() {
    this.selectedProject = null;
    const modal = document.getElementById('projectModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }
}
