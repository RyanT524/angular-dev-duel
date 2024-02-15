import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Method to get user profile data by username
  getUserProfile(username: string): Observable<any> {
    const url = `${this.apiUrl}/api/profile/${username}`;
    return this.http.get(url);
  }

  // Method to get user profile data by usernames for duel
  getDuelData(username1: string, username2: string): Observable<any> {
    const url = `${this.apiUrl}/api/duel/${username1}/${username2}`;
    return this.http.get(url);
  }
}