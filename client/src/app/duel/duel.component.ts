// duel.component.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';

export interface DuelResult {
  user1: UserProfile;
  user2: UserProfile;
  winner: string;
  loser: string;
}

interface UserProfile {
  username: string;
  name: string;
  bio: string;
  avatar_url: string;
  location?: string | null;
  titles?: string[] | null;
  'favorite-language'?: string | null;
  'total-stars'?: number;
  'highest-starred'?: number;
  'public-repos'?: number;
  'perfect-repos'?: number;
  followers: number;
  following: number;
}

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css']
})
export class DuelComponent implements OnInit {
  usernameOne: string = "";
  usernameTwo: string = "";
  duelResult: DuelResult | undefined;
  error: string = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
  }

  onSubmit() {
    this.userService.duelUsers(this.usernameOne, this.usernameTwo)
      .then((data: any) => {

        // Assuming the relevant properties are available in the response
        const user1: UserProfile = data[0];
        const user2: UserProfile = data[1];

        if (user1 && user1['public-repos'] !== undefined && user2 && user2['public-repos'] !== undefined) {

          // Compare number of repositories to determine the winner
          if (user1['public-repos'] > user2['public-repos']) {
            this.duelResult = { user1, user2, winner: user1.username, loser: user2.username };
          } else if (user1['public-repos'] < user2['public-repos']) {
            this.duelResult = { user1, user2, winner: user2.username, loser: user1.username };
          } else {
            this.duelResult = { user1, user2, winner: 'Tie', loser: 'Tie' };
          }
        } else {

          // Handle the case where the expected properties are missing or undefined
          this.error = 'Duel data is incomplete or undefined';
        }
  
        this.error = ""; // Clear any previous errors
      })
      .catch((error) => {
        console.error(error);
        this.error = 'Invalid usernames, please enter two valid usernames';
      });
  }
}