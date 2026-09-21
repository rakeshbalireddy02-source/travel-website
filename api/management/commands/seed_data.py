from django.core.management.base import BaseCommand
from api.models import Destination, Package, Booking, Testimonial, FAQ, SiteContent

DESTINATIONS = [
  {
    "custom_id": "dest-1",
    "name": "Goa",
    "state": "Goa",
    "tagline": "Sun, Sand & Coastal Luxury",
    "category": "Beaches",
    "price": 14999,
    "rating": 4.9,
    "reviews_count": 480,
    "duration": "5 Days / 4 Nights",
    "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    "description": "Relax on golden sun-kissed beaches, explore Portuguese heritage churches, indulge in fresh seafood shacks, and cruise the Mandovi river at sunset.",
    "featured": True,
    "highlights": ["Sunset Catamaran Cruise on Mandovi", "Dudhsagar Waterfalls 4x4 Safari", "Old Goa Heritage Churches & Fort Aguada", "Scuba Diving & Watersports at Grand Island"]
  },
  {
    "custom_id": "dest-2",
    "name": "Kerala Backwaters & Munnar",
    "state": "Kerala",
    "tagline": "God's Own Country",
    "category": "Romantic",
    "price": 18499,
    "rating": 4.95,
    "reviews_count": 520,
    "duration": "6 Days / 5 Nights",
    "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    "description": "Cruise tranquil emerald palm-fringed backwaters aboard luxury houseboats, wander misty tea plantations in Munnar, and rejuvenate with authentic Ayurvedic wellness.",
    "featured": True,
    "highlights": ["Overnight Luxury Houseboat Cruise in Alleppey", "Munnar Tea Gardens & Eravikulam National Park", "Authentic Ayurvedic Rejuvenation Spa", "Kathakali & Kalaripayattu Live Cultural Show"]
  },
  {
    "custom_id": "dest-3",
    "name": "Kashmir (Srinagar & Gulmarg)",
    "state": "Jammu & Kashmir",
    "tagline": "Paradise on Earth",
    "category": "Mountains",
    "price": 24999,
    "rating": 4.98,
    "reviews_count": 610,
    "duration": "6 Days / 5 Nights",
    "image": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
    "description": "Experience iconic cedar-wood houseboats on Dal Lake, ride the world's highest Gulmarg Gondola over snow peaks, and stroll fragrant Mughal Gardens.",
    "featured": True,
    "highlights": ["Romantic Shikara Ride & Dal Lake Houseboat", "Gulmarg Gondola Ride Phase II Snow Peaks", "Pahalgam Valley & Betaab Valley Excursion", "Sonamarg Thajiwas Glacier Day Trip"]
  },
  {
    "custom_id": "dest-4",
    "name": "Jaipur & Udaipur",
    "state": "Rajasthan",
    "tagline": "The Royal Land of Maharajas",
    "category": "Historic",
    "price": 22500,
    "rating": 4.92,
    "reviews_count": 435,
    "duration": "6 Days / 5 Nights",
    "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    "description": "Walk through majestic hilltop forts, vibrant bazaars, shimmering palace lakes in Udaipur, and savor authentic royal Rajputana hospitality.",
    "featured": True,
    "highlights": ["Amber Fort Jeep Safari & Hawa Mahal", "Lake Pichola Sunset Boat Cruise in Udaipur", "Grand City Palace & Jal Mahal Views", "Authentic Royal Rajasthani Cultural Dinner"]
  },
  {
    "custom_id": "dest-5",
    "name": "Leh Ladakh",
    "state": "Ladakh",
    "tagline": "Land of High Mountain Passes",
    "category": "Adventure",
    "price": 28999,
    "rating": 4.96,
    "reviews_count": 390,
    "duration": "7 Days / 6 Nights",
    "image": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
    "description": "Conquer the world's highest motorable roads, gaze upon the color-changing waters of Pangong Tso, and ride double-humped camels in Nubra Valley sand dunes.",
    "featured": True,
    "highlights": ["Pangong Tso Lake Luxury Stargazing Camp", "Nubra Valley & Hunder Sand Dunes Safari", "Khardung La High Mountain Pass Drive", "Ancient Thiksey & Hemis Monasteries"]
  },
  {
    "custom_id": "dest-6",
    "name": "Andaman & Nicobar Islands",
    "state": "Andaman & Nicobar",
    "tagline": "Emerald Tropical Archipelago",
    "category": "Beaches",
    "price": 32000,
    "rating": 4.94,
    "reviews_count": 310,
    "duration": "6 Days / 5 Nights",
    "image": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
    "description": "Discover Asia's best Radhanagar Beach with powdery white sand, vibrant coral reef scuba diving, and secluded turquoise bays in Havelock.",
    "featured": True,
    "highlights": ["Radhanagar Beach Voted Best in Asia", "Scuba Diving & Sea Walking at Elephant Beach", "Cellular Jail Sound & Light Historical Show", "Private Glass-Bottom Boat Coral Reef Tour"]
  }
]

PACKAGES = [
  {
    "custom_id": "pkg-1",
    "title": "6-Day Royal Rajasthan Heritage Tour",
    "destination": "Jaipur, Jodhpur & Udaipur",
    "duration": "6 Days / 5 Nights",
    "price": 24999,
    "original_price": 29999,
    "rating": 4.95,
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    "overview": "A majestic regal escape through Rajasthan's Pink City, Blue City, and City of Lakes with heritage palace stays and private chauffeur.",
    "includes": [
      "4★ & 5★ Heritage Palace & Haveli Stays",
      "Daily Royal Buffet Breakfast & 2 Dinners",
      "Private AC Chauffeur for All Intercity Transfers",
      "Lake Pichola Sunset Boat Cruise in Udaipur",
      "Skip-the-Line Guided Entry to Amber Fort & City Palace"
    ],
    "group_size": "2 - 8 Persons",
    "departure": "Every Monday & Thursday"
  },
  {
    "custom_id": "pkg-2",
    "title": "6-Day Kashmir Heavenly Valley & Snow Escape",
    "destination": "Srinagar, Gulmarg & Pahalgam",
    "duration": "6 Days / 5 Nights",
    "price": 26500,
    "original_price": 32000,
    "rating": 4.98,
    "badge": "Most Popular",
    "image": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
    "overview": "Indulge in snow-clad Himalayan beauty, stay in luxury heritage houseboats on Dal Lake, and ride the Gulmarg Gondola.",
    "includes": [
      "1 Night Premium Dal Lake Houseboat + 4★ Mountain Resorts",
      "Gulmarg Gondola Cable Car Phase I & II Tickets",
      "Shikara Ride & Floating Market Tour",
      "Pahalgam Valley & Betaab Valley Sightseeing",
      "Daily Traditional Kashmiri Breakfast & Dinner"
    ],
    "group_size": "Couples & Families",
    "departure": "Daily Departures"
  },
  {
    "custom_id": "pkg-3",
    "title": "5-Day Kerala Backwaters & Hill Serenity",
    "destination": "Munnar & Alleppey",
    "duration": "5 Days / 4 Nights",
    "price": 18999,
    "original_price": 23500,
    "rating": 4.94,
    "badge": "Romantic VIP",
    "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    "overview": "Unwind amidst tea-carpeted mountains in Munnar followed by an overnight private luxury houseboat cruise on Alleppey backwaters.",
    "includes": [
      "1 Night Private Air-Conditioned Deluxe Houseboat",
      "3 Nights 5★ Tea Plantation Resort in Munnar",
      "All Houseboat Meals (Traditional Kerala Sadya & Seafood)",
      "Ayurvedic Full Body Rejuvenation Massage",
      "Private Airport / Railway Transfers from Kochi"
    ],
    "group_size": "Private / Couples",
    "departure": "Daily Departures"
  }
]

BOOKINGS = [
  {
    "booking_id": "TG-94821",
    "destination": "Kashmir (Srinagar & Gulmarg)",
    "package_title": "6-Day Kashmir Heavenly Valley & Snow Escape",
    "user_name": "Rakesh Reddy",
    "user_email": "rakesh.reddy@example.com",
    "user_phone": "+91 98765 43210",
    "travel_date": "2026-09-15",
    "return_date": "2026-09-21",
    "travelers": 2,
    "tier": "Deluxe 4★ Mountain Resort (+ ₹2,000/p)",
    "price_per_person": 28500,
    "total_price": 57000,
    "status": "Confirmed",
    "booked_on": "2026-08-22",
    "special_requests": "Dal lake houseboat on first night, vegetarian Kashmiri Wazwan meals."
  }
]

TESTIMONIALS = [
  {
    "name": "Ananya Iyer",
    "role": "Travel Blogger & Photographer",
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    "rating": 5,
    "location": "Bengaluru, India",
    "comment": "TravelGo curated our Kashmir holiday to perfection. The Dal Lake houseboat, the Gulmarg Gondola Phase 2, and the local driver were all 5-star quality!"
  },
  {
    "name": "Rohan & Priya Mehta",
    "role": "Honeymooners",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    "rating": 5,
    "location": "Mumbai, India",
    "comment": "Our Kerala honeymoon booked through TravelGo was completely hassle-free. The private houseboat in Alleppey and the Munnar tea resort exceeded all our expectations."
  }
]

FAQS = [
  {
    "custom_id": "faq-1",
    "question": "How does the booking and payment process work for Indian tours?",
    "answer": "Select your desired destination or tour package, choose your dates and number of travelers, fill out traveler details, and submit. You will receive an instant confirmation ID and downloadable receipt in My Bookings."
  },
  {
    "custom_id": "faq-2",
    "question": "Are hotel stays, private transfers, and sightseeing permits included?",
    "answer": "Yes! All our curated packages include handpicked 4★/5★ hotels or heritage houseboats, private AC vehicles with verified chauffeurs, entry passes (such as Gulmarg Gondola or Ladakh Inner Line permits), and daily meals as per itinerary."
  }
]

class Command(BaseCommand):
    help = 'Seeds initial TravelGo website data into SQLite database'

    def handle(self, *args, **options):
        self.stdout.write("Seeding TravelGo database...")
        
        # Seed Destinations
        for dest in DESTINATIONS:
            Destination.objects.update_or_create(
                custom_id=dest['custom_id'],
                defaults=dest
            )

        # Seed Packages
        for pkg in PACKAGES:
            Package.objects.update_or_create(
                custom_id=pkg['custom_id'],
                defaults=pkg
            )

        # Seed Bookings
        for b in BOOKINGS:
            Booking.objects.update_or_create(
                booking_id=b['booking_id'],
                defaults=b
            )

        # Seed Testimonials
        for t in TESTIMONIALS:
            Testimonial.objects.get_or_create(
                name=t['name'],
                defaults=t
            )

        # Seed FAQs
        for f in FAQS:
            FAQ.objects.update_or_create(
                custom_id=f['custom_id'],
                defaults=f
            )

        # Seed SiteContent
        SiteContent.objects.get_or_create(
            key="default",
            defaults={"content": {
                'heroEyebrow': 'DISCOVER INCREDIBLE INDIA',
                'heroTitle': "Explore India's Majestic Wonders & Heritage",
                'heroDescription': 'Curated royal palace retreats, serene backwater cruises, snow-capped Himalayan escapes, and tropical beach getaways across India.',
                'heroImage': '/travel-bg.jpg'
            }}
        )

        self.stdout.write(self.style.SUCCESS("Successfully seeded TravelGo database!"))
