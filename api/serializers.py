from rest_framework import serializers
from .models import Destination, Package, Booking, Testimonial, FAQ, ContactMessage, SiteContent

class DestinationSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Destination
        fields = [
            'db_id', 'id', 'custom_id', 'name', 'state', 'tagline', 'category',
            'price', 'rating', 'reviews_count', 'duration', 'image',
            'description', 'featured', 'highlights', 'created_at'
        ]
        extra_kwargs = {
            'id': {'read_only': True}
        }

    db_id = serializers.IntegerField(source='id', read_only=True)

    def get_id(self, obj):
        return obj.custom_id or f"dest-{obj.id}"

class PackageSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Package
        fields = [
            'db_id', 'id', 'custom_id', 'title', 'destination', 'duration',
            'price', 'original_price', 'rating', 'badge', 'image', 'overview',
            'includes', 'group_size', 'departure', 'created_at'
        ]

    db_id = serializers.IntegerField(source='id', read_only=True)

    def get_id(self, obj):
        return obj.custom_id or f"pkg-{obj.id}"

class BookingSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='booking_id', required=False)

    class Meta:
        model = Booking
        fields = [
            'db_id', 'id', 'booking_id', 'destination', 'package_title',
            'user_name', 'user_email', 'user_phone', 'travel_date', 'return_date',
            'travelers', 'tier', 'price_per_person', 'total_price', 'status',
            'booked_on', 'special_requests', 'created_at'
        ]

    db_id = serializers.IntegerField(source='id', read_only=True)

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class FAQSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = FAQ
        fields = ['db_id', 'id', 'custom_id', 'question', 'answer', 'created_at']

    db_id = serializers.IntegerField(source='id', read_only=True)

    def get_id(self, obj):
        return obj.custom_id or f"faq-{obj.id}"

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class SiteContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteContent
        fields = ['key', 'content', 'updated_at']
