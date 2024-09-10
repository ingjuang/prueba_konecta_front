import { inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection | null = null;
  private messageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();


  constructor() { }

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44302/notificationHub')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  addReceiveMessageListener() {
    this.hubConnection?.on('ReceiveMessage', (message: string) => {
      console.log(message);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500
      });
      this.messageSource.next(message);
    });
  }
}
