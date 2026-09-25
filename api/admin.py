from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Destination,
    Package,
    Booking,
    Testimonial,
    FAQ,
    ContactMessage,
    SiteContent,
)

# Customize Admin Site Branding
admin.site.site_header = "TravelGo Administration"
admin.site.site_title = "TravelGo Administration"
admin.site.index_title = "TravelGo Administration"


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'state',
        'category',
        'price_display',
        'rating',
        'duration',
        'featured',
        'created_at',
    )
    list_filter = ('category', 'state', 'featured', 'created_at')
    search_fields = ('name', 'state', 'category', 'description', 'custom_id')
    list_editable = ('featured',)
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

    fieldsets = (
        ('Basic Information', {
            'fields': ('custom_id', 'name', 'state', 'category', 'tagline')
        }),
        ('Pricing & Details', {
            'fields': ('price', 'rating', 'reviews_count', 'duration', 'featured')
        }),
        ('Content & Media', {
            'fields': ('image', 'description', 'highlights')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',),
        }),
    )

    actions = ['make_featured', 'make_unfeatured']

    @admin.action(description="Mark selected destinations as Featured")
    def make_featured(self, request, queryset):
        updated = queryset.update(featured=True)
        self.message_user(request, f"{updated} destination(s) successfully marked as featured.")

    @admin.action(description="Remove selected destinations from Featured")
    def make_unfeatured(self, request, queryset):
        updated = queryset.update(featured=False)
        self.message_user(request, f"{updated} destination(s) removed from featured.")

    def price_display(self, obj):
        return f"₹{obj.price:,}"
    price_display.short_description = 'Price (INR)'


@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'destination',
        'duration',
        'price_display',
        'original_price_display',
        'rating',
        'badge',
        'created_at',
    )
    list_filter = ('badge', 'rating', 'created_at')
    search_fields = ('title', 'destination', 'badge', 'overview', 'custom_id')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

    fieldsets = (
        ('Package Overview', {
            'fields': ('custom_id', 'title', 'destination', 'badge')
        }),
        ('Duration & Group Size', {
            'fields': ('duration', 'group_size', 'departure')
        }),
        ('Pricing & Rating', {
            'fields': ('price', 'original_price', 'rating')
        }),
        ('Details & Inclusions', {
            'fields': ('image', 'overview', 'includes')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',),
        }),
    )

    def price_display(self, obj):
        return f"₹{obj.price:,}"
    price_display.short_description = 'Price'

    def original_price_display(self, obj):
        if obj.original_price:
            return f"₹{obj.original_price:,}"
        return "-"
    original_price_display.short_description = 'Original Price'


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        'booking_id',
        'user_name',
        'user_email',
        'destination',
        'package_title',
        'travelers',
        'total_price_display',
        'status_badge',
        'created_at',
    )
    list_filter = ('status', 'created_at')
    search_fields = ('booking_id', 'user_name', 'user_email', 'user_phone', 'destination', 'package_title')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

    fieldsets = (
        ('Booking Reference', {
            'fields': ('booking_id', 'status')
        }),
        ('Customer Details', {
            'fields': ('user_name', 'user_email', 'user_phone')
        }),
        ('Trip Information', {
            'fields': ('destination', 'package_title', 'travel_date', 'return_date', 'travelers', 'tier')
        }),
        ('Financials', {
            'fields': ('price_per_person', 'total_price', 'booked_on')
        }),
        ('Additional Notes', {
            'fields': ('special_requests', 'created_at')
        }),
    )

    actions = ['mark_as_confirmed', 'mark_as_cancelled', 'mark_as_pending']

    @admin.action(description="Mark selected bookings as Confirmed")
    def mark_as_confirmed(self, request, queryset):
        updated = queryset.update(status="Confirmed")
        self.message_user(request, f"{updated} booking(s) marked as Confirmed.")

    @admin.action(description="Mark selected bookings as Cancelled")
    def mark_as_cancelled(self, request, queryset):
        updated = queryset.update(status="Cancelled")
        self.message_user(request, f"{updated} booking(s) marked as Cancelled.")

    @admin.action(description="Mark selected bookings as Pending")
    def mark_as_pending(self, request, queryset):
        updated = queryset.update(status="Pending")
        self.message_user(request, f"{updated} booking(s) marked as Pending.")

    def total_price_display(self, obj):
        return f"₹{obj.total_price:,}"
    total_price_display.short_description = 'Total Price'

    def status_badge(self, obj):
        colors = {
            'Confirmed': '#10b981',
            'Pending': '#f59e0b',
            'Cancelled': '#ef4444',
        }
        color = colors.get(obj.status, '#6b7280')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 8px; border-radius: 12px; font-weight: bold; font-size: 11px;">{}</span>',
            color,
            obj.status
        )
    status_badge.short_description = 'Status'


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'location', 'rating_stars', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('name', 'role', 'location', 'comment')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

    fieldsets = (
        ('Guest Information', {
            'fields': ('name', 'role', 'location', 'avatar')
        }),
        ('Review & Rating', {
            'fields': ('rating', 'comment')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',),
        }),
    )

    def rating_stars(self, obj):
        return "★" * int(obj.rating) + "☆" * (5 - int(obj.rating))
    rating_stars.short_description = 'Rating'


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question_snippet', 'custom_id', 'created_at')
    search_fields = ('question', 'answer', 'custom_id')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

    def question_snippet(self, obj):
        return obj.question[:80] + ('...' if len(obj.question) > 80 else '')
    question_snippet.short_description = 'Question'


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'subject', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('name', 'email', 'phone', 'subject', 'message', 'created_at')
    ordering = ('-created_at',)

    fieldsets = (
        ('Sender Info', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Message Content', {
            'fields': ('subject', 'message')
        }),
        ('Metadata', {
            'fields': ('created_at',),
        }),
    )


@admin.register(SiteContent)
class SiteContentAdmin(admin.ModelAdmin):
    list_display = ('key', 'updated_at')
    search_fields = ('key',)
    readonly_fields = ('updated_at',)

