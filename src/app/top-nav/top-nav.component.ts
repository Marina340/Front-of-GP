import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent {
  constructor(private http: HttpClient) {}

  logout() {
    console.log("asfada");
    localStorage.removeItem('token');
    return this.http
      .post('http://127.0.0.1:8000/api/logout',{})
      .subscribe(
        (data: any) => {
          console.log(data);
        },
        (error: any) => console.log(error)
      );
  }
}
