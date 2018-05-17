import { Component, OnInit } from '@angular/core';
import {MessagingService} from './messaging.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {
  errorMessage = '';
  message = '';

  constructor(private messagingService: MessagingService) { }

  ngOnInit() {
    this.messagingService.errorMessage.subscribe((message: string) => {
      this.errorMessage = message;
      setInterval(() => { this.errorMessage = '';}, 5000);
    });
    this.messagingService.successMessage.subscribe((message: string) => {
      this.message = message;
      setInterval(() => { this.message = '';}, 5000);
    });
  }

}
