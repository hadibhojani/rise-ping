import { Component, OnInit } from '@angular/core';
import { NotificationService } from './common/notification.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.requestPermission();
    this.notificationService.subscribeToNotifications();
  }

  sendNotification(): void {
    const options = {
      body: 'This is a sample notification',
      icon: '../assets/icon/favicon.png'
    };
    this.notificationService.showNotification('Sample Notification', options);
  }

  // sendNotification(): void {
  //   const notification = {
  //     title: 'New Message',
  //     message: 'You have a new message!',
  //     icon: '/assets/icon.png',
  //     badge: '/assets/badge.png',
  //     url: 'https://your-website.com/message'
  //   };

  //   fetch('/api/notifications/send', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(notification)
  //   });
  // }
}