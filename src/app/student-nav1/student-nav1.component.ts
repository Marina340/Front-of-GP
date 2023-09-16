import { Component } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-student-nav1',
  templateUrl: './student-nav1.component.html',
  styleUrls: ['./student-nav1.component.css']
})
export class StudentNav1Component {
  openFriendRequestsModal() {
    $('#friendRequestsModal').modal('show');
  }

}
