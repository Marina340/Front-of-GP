import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements AfterViewInit {
  token = localStorage.getItem('token');
  @ViewChild('histogramChartCanvas') histogramChartCanvas!: ElementRef;
  @ViewChild('pieChartCanvas') pieChartCanvas!: ElementRef;
  @ViewChild('barChartCanvas') barChartCanvas!: ElementRef;
  @ViewChild('teamTaskChartCanvas') teamTaskChartCanvas!: ElementRef;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.drawHistogramChart();
    this.drawPieChart();
    this.drawBarChart();
    this.drawTeamTaskChart();
  }

  drawHistogramChart() {
    this.http
      .get('http://127.0.0.1:8000/api/getNumOfTeamsForEachDoctor', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          const labelsOutput = res.map((item: any) => item.name);
          const dataOutput = res.map((item: any) => item.team_count);

          const histogramData = {
            labels: labelsOutput,
            datasets: [
              {
                label: 'Number of Teams for each doctor',
                data: dataOutput,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
            ],
          };

          const histogramOptions: ChartConfiguration['options'] = {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          };

          const histogramChart = new Chart(
            this.histogramChartCanvas.nativeElement,
            {
              type: 'bar',
              data: histogramData,
              options: histogramOptions,
            }
          );
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  drawPieChart() {
    var totalStudent: number;
    this.http
      .get('http://127.0.0.1:8000/api/getNumStudents', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          totalStudent = res.total_students;

          this.http
            .get('http://127.0.0.1:8000/api/getNumStudentsOnTeams', {
              headers: { Authorization: `Bearer ${this.token}` },
              withCredentials: true,
            })
            .subscribe(
              (res: any) => {
                // --------------------------
                const pieData = {
                  labels: ['Registered', 'Not Registered'],
                  datasets: [
                    {
                      label: 'Percentage of Students',
                      data: [
                        (res.total_students / totalStudent) * 100,
                        ((totalStudent - res.total_students) / totalStudent) *
                          100,
                      ],
                      backgroundColor: [
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 99, 132, 0.5)',
                      ],
                      borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                };

                const pieOptions: ChartConfiguration['options'] = {
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                };

                const pieChart = new Chart(this.pieChartCanvas.nativeElement, {
                  type: 'pie',
                  data: pieData,
                  options: pieOptions,
                });
                // --------------------------
              },
              (error: any) => {
                console.log(error);
              }
            );
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  drawBarChart() {
    const barChartData = {
      labels: ['TA 1', 'TA 2', 'TA 3', 'TA 4'],
      datasets: [
        {
          label: 'Number of Teams for each TA',
          data: [3, 2, 5, 1],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    const barChartOptions: ChartConfiguration['options'] = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const barChart = new Chart(this.barChartCanvas.nativeElement, {
      type: 'bar',
      data: barChartData,
      options: barChartOptions,
    });
  }

  drawTeamTaskChart() {
    // getTasksOfEachTeam

    this.http
      .get('http://127.0.0.1:8000/api/getTasksOfEachTeam', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          const transformedData = {
            team_id: res.map((item: any) => 'Team ' + item.team_id.toString()),
            task_count: res.map((item: any) => item.task_count),
          };

          const teamTaskData = {
            labels: transformedData.team_id,
            datasets: [
              {
                label: 'Number of Tasks',
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
                data: transformedData.task_count,
              },
            ],
          };

          const teamTaskOptions: ChartConfiguration['options'] = {
            scales: {
              x: {
                beginAtZero: true,
                max: 15,
              },
              y: {
                beginAtZero: true,
              },
            },
          };

          const teamTaskChart = new Chart(
            this.teamTaskChartCanvas.nativeElement,
            {
              type: 'bar',
              data: teamTaskData,
              options: teamTaskOptions,
            }
          );
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'http://example.com/api';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<any[]> {
    const url = `${this.baseUrl}/doctors`;
    return this.http.get<any[]>(url);
  }

  getTeams(): Observable<any[]> {
    const url = `${this.baseUrl}/teams`;
    return this.http.get<any[]>(url);
  }
}
