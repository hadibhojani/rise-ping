
import { Component } from '@angular/core';
import { AuthService } from '../../assets/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  data: any;

  constructor(private apiService: AuthService) {}

  async givePointsToUser() {
    try {
      const userId = 1;
      const points = 100;
      const result = await this.apiService.givePoints(userId, points);
      console.log('Points given:', result);
    } catch (error) {
      console.error('Error giving points:', error);
    }
  }

  async createNewEvent() {
    const eventData = { title: 'New Event', date: '2024-07-01', location: 'Online' };
    try {
      const result = await this.apiService.createEvent(eventData);
      console.log('Event created:', result);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  }

  async notifyEvent() {
    try {
      const eventId = 1;
      const message = 'Event is starting soon!';
      const result = await this.apiService.sendEventNotification(eventId, message);
      console.log('Event notification sent:', result);
    } catch (error) {
      console.error('Error sending event notification:', error);
    }
  }

  async sendUserAlert() {
    const alertData = { userId: 1, message: 'This is an important alert!' };
    try {
      const result = await this.apiService.sendAlert(alertData);
      console.log('Alert sent:', result);
    } catch (error) {
      console.error('Error sending alert:', error);
    }
  }
}
