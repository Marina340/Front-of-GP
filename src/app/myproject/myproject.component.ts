import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
import * as moment from 'moment';
import { Modal } from 'bootstrap';
import { Model } from 'fullcalendar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-myproject',
  templateUrl: './myproject.component.html',
  styleUrls: ['./myproject.component.css'],
})
export class MyprojectComponent {
  token = localStorage.getItem('token');
  userRole: number = 1;
  myproject: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.initializeCalendar();
    this.getMyProject();
  }

  getMyProject() {
    this.http
      .get('http://127.0.0.1:8000/api/getMyProject', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.myproject = res;

        this.http
          .get(
            `http://127.0.0.1:8000/api/getTask/${this.myproject.project_id}`,
            {
              headers: { Authorization: `Bearer ${this.token}` },
              withCredentials: true,
            }
          )
          .subscribe((res: any) => {
            $(document).ready(() => {
              const eventModal = $('#eventModal');
              const editModal = $('#editModal');
              const removeModal = $('#removeModal');
              const gradeModal = $('#gradeModal');
              let calendarEvents = res;
              $('#calendar').fullCalendar({
                header: {
                  left: 'prev,next today',
                  center: 'title',
                  right: 'month,agendaWeek,agendaDay',
                },
                buttonText: {
                  prev: 'Prev',
                  next: 'Next',
                  today: 'Today',
                },

                selectable: this.userRole === 2 || this.userRole === 3,
                selectHelper: true,
                editable: this.userRole === 2 || this.userRole === 3,
                eventClick: (event) => {
                  const start = event.start ? moment(event.start).format() : '';
                  const end = event.end ? moment(event.end).format() : '';
                  let eventDetails = `
                  Task Title: ${event.title}<br>
                  Description: ${event['description']}<br>
                  Uploaded File:${event['uploadedFile']}<br>
                  Deadline: ${start}<br>
                  Submission date: ${event['submission']}<br>
                  Grade: ${event['grade']}<br>
                  File: ${event['file']}<br>
                  `;
                  eventModal.find('.modal-title').text('Task Details');
                  eventModal.find('.modal-body').html(eventDetails);

                  eventModal.find('.modal-footer').html(`
                      <button type="button" class="btn btn-sm btn-primary" data-action="addFile">Add File</button>
                    `);
                  eventModal.find('[data-action="addFile"]').on('click', () => {
                    const fileUploadModal = $('#fileUploadModal');
                    Modal.getOrCreateInstance(fileUploadModal[0]).show();
                    Modal.getOrCreateInstance(eventModal[0]).hide();

                    fileUploadModal
                      .find('[data-action="submitFile"]')
                      .on('click', () => {
                        const fileInput = $(
                          '#fileInput'
                        )[0] as HTMLInputElement;
                        const file = fileInput.files?.[0];

                        if (file) {
                          const submissionTime = moment().format(
                            'YYYY-MM-DD HH:mm:ss'
                          );
                          const fileName = file.name;
                          event['uploadedFile'] = fileName;
                          event['submission'] = submissionTime;
                          $('#calendar').fullCalendar('updateEvent', event);
                          Modal.getOrCreateInstance(fileUploadModal[0]).hide();
                        }
                      });
                  });
                  Modal.getOrCreateInstance(eventModal[0]).show();
                },

                select: (start, end) => {
                  if (this.userRole !== 2 && this.userRole !== 3) {
                    return;
                  }
                  console.log('Range selected:', start, end);
                  eventModal.find('.modal-title').text('Add Task');
                  eventModal.find('.modal-body').html(`
                    <div class="form-group">
                      <label for="eventTitle">Task Title:</label>
                      <input type="text" class="form-control" id="eventTitle">
                    </div>
                    <div class="form-group">
                      <label for="eventDescription">Description:</label>
                      <input type="text" class="form-control" id="eventDescription">
                    </div>
                    <div class="form-group">
                      <label for="fileInput">Choose File:</label>
                      <input type="file" class="form-control-file" id="fileInput">
                    </div>
                  `);
                  eventModal.find('.modal-footer').html(`
                    <button type="button" class="btn btn-primary" data-action="save">Save</button>
                  `);
                  Modal.getOrCreateInstance(eventModal[0]).show();

                  eventModal.find('[data-action="save"]').on('click', () => {
                    const title = eventModal
                      .find('#eventTitle')
                      .val() as string;
                    const description = eventModal
                      .find('#eventDescription')
                      .val() as string;
                    const file = $('#fileInput').prop('files')[0];
                    if (title) {
                      const eventData = {
                        title: title,
                        start: start,
                        description: description,
                        file: file ? file.name : '',
                        submission: '',
                      };
                      $('#calendar').fullCalendar(
                        'renderEvent',
                        eventData,
                        true
                      );
                      Modal.getOrCreateInstance(eventModal[0]).hide();
                    }
                  });
                },
                events: calendarEvents,
              });
            });
          });
      });
  }
}
