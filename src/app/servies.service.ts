import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ServiesService {
  token = localStorage.getItem('token');
  constructor(private http: HttpClient) {}

  getTAProfile(id: number): string {
    var ta = '';
    this.http
      .get(`http://127.0.0.1:8000/api/ta/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        // console.log(res);
        ta = res;
      });

    return ta;
  }

  getUserInfo(token: any) {
    this.http.get('http://127.0.0.1:8000/api/getUser', {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
  }
}
