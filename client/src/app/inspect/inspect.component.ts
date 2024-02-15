import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';


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
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css']
})


export class InspectComponent implements OnInit {

  username: string = "";
  userProfile: UserProfile | undefined;
  error: string = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsername(valueEmitted: string) {
    this.username = valueEmitted;
  }

  onSubmit() {
    this.userService.inspectUser(this.username)
      .then((data) => {
        const userProfileData = data as UserProfile | undefined;
  
        if (userProfileData) {
          this.userProfile = userProfileData;
          this.error = "";
        } else {
          this.error = 'User not found';
        }
      })
      .catch((error) => {
        console.error(error);
        this.error = 'User not found';
      });
  }
  
}
