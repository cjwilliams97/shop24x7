import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAtuthenticated = false;

  // userIsAtuthenticated = false;
  private authListnerSubs: Subscription = new Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.authListnerSubs = this.userService.getAuthStatusListner().subscribe(isAuthenticated => {
      this.userIsAtuthenticated = isAuthenticated;
    });
  }

  onLogout(){
    this.userService.logout();
  }

  ngOnDestroy() {
    this.authListnerSubs.unsubscribe();
  }

}
