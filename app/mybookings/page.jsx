'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, DollarSign, Hotel } from 'lucide-react';

// Mock authentication check (replace with your actual auth logic)
const isUserLoggedIn = () => {
  // Example: Check for a token in localStorage
  // return !!localStorage.getItem('authToken');
  // For demo, return true to show logged-in UI, false for non-logged-in UI
  return true; // Change to false to test non-logged-in UI
};

export default function MyBookings() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookingsData, setBookingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check authentication on mount
  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  // Fetch bookings data if logged in
  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch('/api/bookings', {
          headers: {
            // Add auth headers if needed, e.g., Authorization: `Bearer ${token}`
          },
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Bookings API did not return valid JSON');
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch bookings: ${response.statusText}`);
        }

        const data = await response.json();
        setBookingsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isLoggedIn]);

  // Non-logged-in UI
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Please Sign Up or Log In
          </h1>
          <p className="text-gray-600 mb-6">
            Access your bookings, itinerary, and expenses by creating an account or logging in.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading your bookings...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  // No bookings
  if (!bookingsData || !bookingsData.bookings?.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Bookings Yet</h2>
          <p className="text-gray-600 mb-6">
            Start planning your next trip by browsing our featured hotels!
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore Hotels
          </Link>
        </div>
      </div>
    );
  }

  // Logged-in UI
  const { expenses, itinerary, bookings } = bookingsData;

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          My Bookings
        </h1>

        {/* Planned Expenses */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <DollarSign className="w-6 h-6 mr-2 text-blue-600" />
            Planned Expenses
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-lg font-semibold text-gray-800">${expenses.total}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">${expenses.hotels}</p>
                <p className="text-sm text-gray-600">Hotels</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">${expenses.activities}</p>
                <p className="text-sm text-gray-600">Activities</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">${expenses.transport}</p>
                <p className="text-sm text-gray-600">Transport</p>
              </div>
            </div>
          </div>
        </section>

        {/* Itinerary */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-blue-600" />
            Itinerary
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            {itinerary.length > 0 ? (
              <div className="space-y-4">
                {itinerary.map((item, index) => (
                  <div key={index} className="flex items-start border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="w-24 text-sm font-medium text-gray-600">{item.date}</div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.activity}</p>
                      <p className="text-sm text-gray-600">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No itinerary items planned yet.</p>
            )}
          </div>
        </section>

        {/* Booked Hotels/Rooms */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Hotel className="w-6 h-6 mr-2 text-blue-600" />
            Booked Hotels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div
                key={booking.hotelId}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={booking.image}
                    alt={booking.hotelName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{booking.hotelName}</h3>
                  <p className="text-sm text-gray-600 mb-2">📍 {booking.city}</p>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-800">
                      Room: {booking.room.type}
                    </p>
                    <p className="text-sm text-gray-600">
                      ${booking.room.price}/night
                    </p>
                    <p className="text-sm text-gray-600">
                      Check-in: {booking.room.checkIn}
                    </p>
                    <p className="text-sm text-gray-600">
                      Check-out: {booking.room.checkOut}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}