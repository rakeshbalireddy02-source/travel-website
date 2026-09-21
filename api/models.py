from django.db import models

class Destination(models.Model):
    custom_id = models.CharField(max_length=50, unique=True, blank=True, null=True)
    name = models.CharField(max_length=255)
    state = models.CharField(max_length=100)
    tagline = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=100)
    price = models.IntegerField(default=0)
    rating = models.FloatField(default=4.8)
    reviews_count = models.IntegerField(default=100)
    duration = models.CharField(max_length=100)
    image = models.TextField()
    description = models.TextField()
    featured = models.BooleanField(default=False)
    highlights = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Package(models.Model):
    custom_id = models.CharField(max_length=50, unique=True, blank=True, null=True)
    title = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    duration = models.CharField(max_length=100)
    price = models.IntegerField(default=0)
    original_price = models.IntegerField(default=0, null=True, blank=True)
    rating = models.FloatField(default=4.9)
    badge = models.CharField(max_length=100, blank=True)
    image = models.TextField()
    overview = models.TextField()
    includes = models.JSONField(default=list, blank=True)
    group_size = models.CharField(max_length=100, blank=True)
    departure = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Booking(models.Model):
    booking_id = models.CharField(max_length=50, unique=True)
    destination = models.CharField(max_length=255)
    package_title = models.CharField(max_length=255, blank=True)
    user_name = models.CharField(max_length=255)
    user_email = models.EmailField()
    user_phone = models.CharField(max_length=50)
    travel_date = models.CharField(max_length=50, blank=True)
    return_date = models.CharField(max_length=50, blank=True)
    travelers = models.IntegerField(default=1)
    tier = models.CharField(max_length=255, blank=True)
    price_per_person = models.IntegerField(default=0)
    total_price = models.IntegerField(default=0)
    status = models.CharField(max_length=50, default="Confirmed")
    booked_on = models.CharField(max_length=50, blank=True)
    special_requests = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.booking_id} - {self.user_name}"

class Testimonial(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    avatar = models.TextField()
    rating = models.IntegerField(default=5)
    location = models.CharField(max_length=255)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class FAQ(models.Model):
    custom_id = models.CharField(max_length=50, blank=True, null=True)
    question = models.TextField()
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question[:50]

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    subject = models.CharField(max_length=255, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} ({self.email})"

class SiteContent(models.Model):
    key = models.CharField(max_length=100, unique=True, default="default")
    content = models.JSONField(default=dict)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"SiteContent ({self.key})"
