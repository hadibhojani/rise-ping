import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  async subscribeToNotifications() {
    const registration = await navigator.serviceWorker.register('/service-worker.js');
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'BLK8Zf73Hlj7GBvVW5_MaRWwAsKMY_AbpE_6oRwQYol4hE_75hc9nkVRHXQNsYtE48W85rqUDXJRQHFP5Yk5z3s'
    });

    // Send subscription to your server
    await fetch('/api/notifications/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscription)
    });
  }

  requestPermission(): void {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      });
    } else {
      console.log('This browser does not support notifications.');
    }
  }

  showNotification(title: string, options?: NotificationOptions): void {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(title, options);
      } else {
        console.log('Notification permission is not granted.');
      }
    } else {
      console.log('This browser does not support notifications.');
    }
  }
}