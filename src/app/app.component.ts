import { Component, OnInit } from '@angular/core';
import { environment } from "../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { count } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-firebase-app';
  message:any = null;
  count: number = 0;
  constructor(){}
  ngOnInit(): void {
    this.requestPermission();
    
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
         this.listen();
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }

  listen() {
    const messaging = getMessaging();
    console.log(messaging);
    
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
      console.log(this.message);
      
      // console.log(messaging);
      // this.count = this.count+1;
      // console.log(this.count);
    });
  }
}
