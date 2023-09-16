import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
import * as moment from 'moment';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-admin-agenda',
  templateUrl: './admin-agenda.component.html',
  styleUrls: ['./admin-agenda.component.css'],
})
export class AdminAgendaComponent implements OnInit {
  ngOnInit() {
    this.initializeCalendar();
  }

  initializeCalendar() {
    $(document).ready(() => {
      const eventModal = $('#eventModal');
      const editModal = $('#editModal');
      const removeModal = $('#removeModal');
      const currentYear = moment().year();
      const functions = [
        { name: 'Start Teams Registration', fieldType: 'start', description: 'Description for Start Teams Registration' },
        { name: 'Deadline of Registration', fieldType: 'deadline', description: 'Description for Deadline of Registration' },
        { name: 'Start Uploading First Term Documentation', fieldType: 'start', description: 'Description for Start Uploading First Term Documentation' },
        { name: 'Start Uploading First Term Presentation', fieldType: 'start', description: 'Description for Start Uploading First Term Presentation' },
        { name: 'Deadline of Uploading First Term Documentation', fieldType: 'deadline', description: 'Description for Deadline of Uploading First Term Documentation' },
        { name: 'Deadline of Uploading First Term Presentation', fieldType: 'deadline', description: 'Description for Deadline of Uploading First Term Presentation' },
        { name: 'Start Uploading Final Documentation', fieldType: 'start', description: 'Description for Start Uploading Final Documentation' },
        { name: 'Start Uploading Final Presentation', fieldType: 'start', description: 'Description for Start Uploading Final Presentation' },
        { name: 'Start Uploading Poster', fieldType: 'start', description: 'Description for Start Uploading Poster' },
        { name: 'Deadline of Uploading Final Documentation', fieldType: 'deadline', description: 'Description for Deadline of Uploading Final Documentation' },
        { name: 'Deadline of Uploading Final Presentation', fieldType: 'deadline', description: 'Description for Deadline of Uploading Final Presentation' },
        { name: 'Deadline of Uploading Poster', fieldType: 'deadline', description: 'Description for Deadline of Uploading Poster' },
      ];


      $('#calendar').fullCalendar({
        defaultView: 'month',
        validRange: {
          start: moment(`${currentYear}-07-01`),
          end: moment(`${currentYear + 1}-07-30`).subtract(1, 'day'), // Subtract 1 day to exclude the first day of the next year
        },
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
        selectable: true,
        selectHelper: true,
        editable: true,
        eventResize: function (event, delta, revertFunc) {
          // Handle event resize
        },
        eventDrop: function (event, delta, revertFunc) {
          // Handle event drop
        },
        eventClick: (event) => {
          const start = event.start ? moment(event.start).format() : '';
          const end = event.end ? moment(event.end).format() : '';
          const fieldType = functions.find((func) => func.name === event.title)?.fieldType;
          const startLabel = fieldType === 'start' ? 'Start Date' : 'Deadline';
          const eventDetails = `
            Event Title: ${event.title}<br>
            Description: ${event['description']}<br>
            ${startLabel}: ${start}<br>
          `;
          eventModal.find('.modal-title').text('Event Details');
          eventModal.find('.modal-body').html(eventDetails);
          eventModal.find('.modal-footer').html(`
            <button type="button" class="btn btn-sm btn-danger" data-action="remove">Remove</button>
          `);
          Modal.getOrCreateInstance(eventModal[0]).show();

          // Handle button clicks inside the modal
          eventModal.find('[data-action="remove"]').on('click', () => {
            removeModal.find('.modal-title').text('Remove Event');
            removeModal
              .find('.modal-body')
              .html('Are you sure you want to remove this event?');
            removeModal.find('.modal-footer').html(`
              <button type="button" class="btn btn-danger" data-action="confirm">Remove</button>
            `);
            Modal.getOrCreateInstance(removeModal[0]).show();
            Modal.getOrCreateInstance(eventModal[0]).hide();
            // Handle button clicks inside the remove modal
            removeModal.find('[data-action="confirm"]').on('click', () => {
              $('#calendar').fullCalendar('removeEvents', event._id);
              console.log('Event removed:', event);
              Modal.getOrCreateInstance(removeModal[0]).hide();
              Modal.getOrCreateInstance(eventModal[0]).hide();
            });
          });
        },
        select: (start, end) => {
          eventModal.find('.modal-title').text('Add Event');
          const functionOptions = functions.map((func) => `<option value="${func.name}">${func.name}</option>`).join('');

          eventModal.find('.modal-body').html(`
          <div class="form-group" id="startDateGroup" style="display: none;">
            <label for="eventStartDate">Start Date:</label>
            <input type="text" class="form-control" id="eventStartDate">
          </div>
          <div class="form-group" id="functionDescriptionGroup" style="display: none;">
            <label for="functionDescription">Description:</label>
            <textarea class="form-control" id="functionDescription" rows="3" readonly></textarea>
          </div>
          <div class="form-group">
            <label for="eventFunction">Main Events:</label>
            <select class="form-select" id="eventFunction">
              ${functionOptions}
              <option value="other">Other</option>
            </select>
          </div>
        `);
          eventModal.find('.modal-footer').html(`
            <button type="button" class="btn btn-primary" data-action="save">Save</button>
          `);
          Modal.getOrCreateInstance(eventModal[0]).show();

          const startDateGroup = $('#startDateGroup');
          const functionDescriptionGroup = $('#functionDescriptionGroup');
          const functionDescriptionTextarea = $('#functionDescription');

          eventModal.find('[data-action="save"]').on('click', () => {
            const selectedFunction = eventModal.find('#eventFunction').val() as string;
            if (selectedFunction !== 'other') {
              const title = selectedFunction;
              const fieldType = functions.find((func) => func.name === selectedFunction)?.fieldType;
              const description = functions.find((func) => func.name === selectedFunction)?.description ?? '';
              let eventData: any = {
                title: title,
                description:description,
                start: start,
              };
              if (fieldType === 'start') {
                eventData.end = null;
              }
              $('#calendar').fullCalendar('renderEvent', eventData, true);
            } else {
              // Handle "other" function
              const customEventModal = $('#customEventModal');
              customEventModal.find('.modal-title').text('Add Custom Event');
              customEventModal.find('.modal-body').html(`
                <div class="form-group">
                  <label for="customEventTitle">Event Title:</label>
                  <input type="text" class="form-control" id="customEventTitle">
                </div>
                <div class="form-group">
                  <label for="customEventDescription">Description:</label>
                  <input type="text" class="form-control" id="customEventDescription">
                </div>
              `);
              customEventModal.find('.modal-footer').html(`
                <button type="button" class="btn btn-primary" data-action="save">Save</button>
              `);
              Modal.getOrCreateInstance(customEventModal[0]).show();

              customEventModal.find('[data-action="save"]').on('click', () => {
                const title = customEventModal.find('#customEventTitle').val() as string;
                const description = customEventModal.find('#customEventDescription').val() as string;
                if (title) {
                  const eventData = {
                    title: title,
                    description: description,
                    start: start,
                  };
                  $('#calendar').fullCalendar('renderEvent', eventData, true);
                }
                Modal.getOrCreateInstance(customEventModal[0]).hide();
              });
            }
            Modal.getOrCreateInstance(eventModal[0]).hide();
          });
        },

        events: [
          // Array of events
          {
            title: 'Event 1',
            description: 'Event 1 Description',
            start: '2023-07-01',
          },
          {
            title: 'Event 2',
            description: 'Event 1 Description',
            start: '2023-07-05',
          },
          // Add more events as needed
        ],
      });
    });
  }
}
