from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    health_check, DestinationViewSet, PackageViewSet, BookingViewSet,
    TestimonialViewSet, FAQViewSet, ContactMessageViewSet, site_content
)

router = DefaultRouter()
router.register(r'destinations', DestinationViewSet, basename='destination')
router.register(r'packages', PackageViewSet, basename='package')
router.register(r'bookings', BookingViewSet, basename='booking')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')
router.register(r'faqs', FAQViewSet, basename='faq')
router.register(r'messages', ContactMessageViewSet, basename='message')

urlpatterns = [
    path('health/', health_check, name='health_check'),
    path('site-content/', site_content, name='site_content'),
    path('', include(router.urls)),
]
