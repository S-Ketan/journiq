"use client";
import React, { useState, useEffect } from "react";


const page = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      title: "Itinerary Planning",
      description:
        "Plan every detail of your trip with ease—custom schedules, activity suggestions, and real-time updates all in one place.",
    },
    {
      title: "Expense Management",
      description:
        "Track your travel budget effortlessly. Manage expenses, split costs with friends, and get detailed reports of your spending.",
    },
    {
      title: "Hotel Bookings",
      description:
        "Find and book the best hotels at competitive prices. Filter by location, amenities, and reviews to match your preferences.",
    },
    {
      title: "Flight Reservations",
      description:
        "Search, compare, and book flights from top airlines globally. Enjoy flexible booking options and live price tracking.",
    },
    {
      title: "Trip Collaboration",
      description:
        "Travel with others? Share plans, assign tasks, and keep everyone in the loop with real-time collaboration tools.",
    },
    {
      title: "Travel Document Vault",
      description:
        "Securely store and access all your travel documents—passports, tickets, insurance—anytime, anywhere.",
    },
  ];
  const services = [
    {
      title: "Trip Booking Engine",
      icon: "✈️",
      features: [
        "Flights + Hotels Bundles",
        "Real-time Availability",
        "Price Comparison",
        "Instant Confirmation",
      ],
    },
    {
      title: "Smart Itinerary Planner",
      icon: "🗓️",
      features: [
        "Drag-and-Drop Timeline",
        "Map Integration",
        "Local Experience Suggestions",
        "Sync to Calendar",
      ],
    },
    {
      title: "Expense Management",
      icon: "💳",
      features: [
        "Receipt Scanning",
        "Currency Converter",
        "Spending Analytics",
        "Report Generation",
      ],
    },
    {
      title: "Connected Travel Ecosystem",
      icon: "🔌",
      features: [
        "Google Maps Integration",
        "Expense → QuickBooks Sync",
        "iCal/Outlook Calendar",
        "Slack Notifications",
      ],
    },
    {
      title: "Group Travel Coordinator",
      icon: "👥",
      features: [
        "Shared itinerary editing",
        "Expense splitting calculator",
        "Activity voting system",
        "Group chat integration",
      ],
    },
    {
      title: "Local Experience Finder",
      icon: "🏛️",
      features: [
        "Authentic guided tours",
        "Hidden gem recommendations",
        "Local event calendar",
        "Cultural immersion packages",
      ],
    },
    {
      title: "Travel Safety Monitor",
      icon: "🛡️",
      features: [
        "Real-time alerts",
        "Emergency contact integration",
        "Hospital locator",
        "Travel insurance matching",
      ],
    },
    {
      title: "Packing List Generator",
      icon: "🧳",
      features: [
        "AI-powered suggestions",
        "Weather-based recommendations",
        "Shareable lists",
        "Checklist progress tracking",
      ],
    },
    {
      title: "Flight Tracker Pro",
      icon: "🛫",
      features: [
        "Real-time status updates",
        "Gate change alerts",
        "Baggage claim info",
        "Airport terminal maps",
      ],
    },
    {
      title: "Sustainable Travel Guide",
      icon: "🌱",
      features: [
        "Eco-friendly lodging",
        "Carbon footprint calculator",
        "Green transportation options",
        "Ethical tour operators",
      ],
    },
    {
      title: "Business Travel Suite",
      icon: "💼",
      features: [
        "Corporate policy compliance",
        "Expense report automation",
        "Approval workflows",
        "Centralized billing",
      ],
    },
    {
      title: "Multi-City Trip Planner",
      icon: "🌎",
      features: [
        "Route optimization",
        "Stopover suggestions",
        "Transportation linking",
        "Time zone calculator",
      ],
    },
    {
      title: "Food & Dining Explorer",
      icon: "🍽️",
      features: [
        "Dietary restriction filters",
        "Local cuisine guides",
        "Reservation booking",
        "Food tour packages",
      ],
    },
    {
      title: "Travel Document Manager",
      icon: "📋",
      features: [
        "Passport/visa tracker",
        "Vaccination records",
        "Digital copy storage",
        "Renewal reminders",
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <div
        className="h-[50vh] relative pt-10 bg-cover bg-center hidden sm:block"
        style={{
          backgroundImage: `url(/assets/images/travelBanner.jpg)`,
          backgroundSize: "cover",
        }}
      >
        {/*         Carousel  */}
        <div className="relative w-full h-full p-5">
          <div className="absolute inset-0 flex items-center justify-between">
            {/* Buttons are optional */}
            {/* 
        <button className="text-black" onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)}>
          Previous
        </button>
        <button className="text-black" onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)}>
          Next
        </button> 
        */}
          </div>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="min-w-full">
                  <strong className="text-5xl text-black">
                    {slide.title} 
                  </strong>
                  <p className="mt-5 text-gray-800 text-xl max-w-[45vw]">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Content after banner */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Comprehensive Travel Solutions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <ul className="space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-center text-gray-600"
                    >
                      <span className="mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Trust Badges Section */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-4">Trusted By</p>
            <div className="flex justify-center gap-8">
              <img
                src="/trusted-airlines.png"
                className="h-12"
                alt="Airlines"
              />
              <img
                src="/gdpr-badge.svg"
                className="h-12"
                alt="GDPR Certified"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
