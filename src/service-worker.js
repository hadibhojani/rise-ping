// Listen for the push event
self.addEventListener('push', event => {
    const data = event.data.json(); // Parse the push event data

    const options = {
        body: data.message,
        icon: data.icon,
        badge: data.badge,
        data: {
            url: data.url // Store the URL to open when the notification is clicked
        }
    };

    // Show the notification
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Handle notification click event
self.addEventListener('notificationclick', event => {
    event.notification.close();

    // Open the URL stored in the notification data
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});