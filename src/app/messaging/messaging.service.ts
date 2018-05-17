import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MessagingService {

  successMessage: Subject<string> = new Subject<string>();
  errorMessage: Subject<string> = new Subject<string>();

  constructor() { }

  success(message: string) {
    this.successMessage.next(message);
  }

  error(message: string) {
    this.errorMessage.next(message);
  }
}
