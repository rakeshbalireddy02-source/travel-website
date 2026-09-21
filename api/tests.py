from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from api.models import Destination, Package, Booking, Testimonial, FAQ, ContactMessage, SiteContent

class TravelGoApiTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.destination = Destination.objects.create(
            custom_id="dest-test",
            name="Test Destination",
            state="Test State",
            tagline="Test Tagline",
            category="Beaches",
            price=15000,
            rating=4.9,
            reviews_count=50,
            duration="3 Days",
            image="https://example.com/image.jpg",
            description="Test Description",
            featured=True,
            highlights=["Highlight 1", "Highlight 2"]
        )
        self.package = Package.objects.create(
            custom_id="pkg-test",
            title="Test Package",
            destination="Test Destination",
            duration="4 Days",
            price=20000,
            original_price=25000,
            rating=4.8,
            badge="Best Seller",
            image="https://example.com/pkg.jpg",
            overview="Test Overview",
            includes=["Item 1", "Item 2"],
            group_size="2-4",
            departure="Daily"
        )

    def test_health_check(self):
        response = self.client.get('/api/health/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('status'), 'ok')

    def test_get_destinations(self):
        response = self.client.get('/api/destinations/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_get_packages(self):
        response = self.client.get('/api/packages/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_create_booking(self):
        data = {
            "booking_id": "TG-TEST12345",
            "destination": "Goa",
            "package_title": "5-Day Goa Package",
            "user_name": "Test User",
            "user_email": "test@example.com",
            "user_phone": "+91 9999999999",
            "travelers": 2,
            "total_price": 29998,
            "status": "Confirmed"
        }
        response = self.client.post('/api/bookings/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Booking.objects.filter(booking_id="TG-TEST12345").count(), 1)

    def test_send_contact_message(self):
        data = {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "phone": "+91 9876543210",
            "subject": "Inquiry about Kashmir",
            "message": "I would like to book a trip to Kashmir for 4 people."
        }
        response = self.client.post('/api/messages/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.filter(email="jane@example.com").count(), 1)

    def test_site_content(self):
        response = self.client.get('/api/site-content/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        update_data = {"heroTitle": "Updated Hero Title"}
        update_resp = self.client.post('/api/site-content/', update_data, format='json')
        self.assertEqual(update_resp.status_code, status.HTTP_200_OK)
