from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Destination, Package, Booking, Testimonial, FAQ, ContactMessage, SiteContent
from .serializers import (
    DestinationSerializer, PackageSerializer, BookingSerializer,
    TestimonialSerializer, FAQSerializer, ContactMessageSerializer,
    SiteContentSerializer
)

@api_view(['GET'])
def health_check(request):
    return Response({
        "status": "ok",
        "service": "TravelGo Django REST Backend",
        "version": "1.0.0"
    }, status=status.HTTP_200_OK)

class DestinationViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.all().order_by('-created_at')
    serializer_class = DestinationSerializer

class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all().order_by('-created_at')
    serializer_class = PackageSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by('-created_at')
    serializer_class = BookingSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        # Generate booking_id if not provided
        if not data.get('booking_id') and not data.get('id'):
            import random
            data['booking_id'] = f"TG-{random.randint(10000, 99999)}"
        elif not data.get('booking_id') and data.get('id'):
            data['booking_id'] = data.get('id')
            
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all().order_by('-created_at')
    serializer_class = TestimonialSerializer

class FAQViewSet(viewsets.ModelViewSet):
    queryset = FAQ.objects.all().order_by('id')
    serializer_class = FAQSerializer

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer

@api_view(['GET', 'POST', 'PUT'])
def site_content(request):
    obj, _ = SiteContent.objects.get_or_create(key="default")
    if request.method == 'GET':
        return Response(obj.content or {})
    else:
        obj.content = request.data
        obj.save()
        return Response({"status": "updated", "content": obj.content})
