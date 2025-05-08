'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function MyBookings() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch('http://localhost:5000/api/bookings', {
          headers: {
            'Accept': 'application/json',
            'X-User-ID': session.user.id
          }
        });
        const text = await response.text();
        console.log('Bookings raw response:', text);
        console.log('Bookings headers:', Object.fromEntries(response.headers.entries()));
        console.log('Bookings status:', response.status);

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error(`Bookings API did not return valid JSON: ${text.slice(0, 100)}`);
        }
        if (!response.ok) {
          let errorData;
          try {
            errorData = JSON.parse(text);
            throw new Error(`Failed to fetch bookings: ${errorData.message || response.statusText}`);
          } catch {
            throw new Error(`Failed to fetch bookings: ${response.statusText}`);
          }
        }
        const data = JSON.parse(text);
        setBookings(data || []);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') fetchBookings();
  }, [session, status]);

  if (status === 'loading') return <div className="text-center p-8">Loading...</div>;
  if (status === 'unauthenticated') return <div className="text-center p-8">Please sign in to view your bookings.</div>;
  if (loading) return <div className="text-center p-8">Loading bookings...</div>;
  if (error) return (
    <div className="text-center p-8 text-red-500">
      <p>{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{booking.hotel.name}</h2>
              <p className="text-gray-600">Location: {booking.hotel.location}</p>
              <p className="text-gray-600">Room Type: {booking.roomType}</p>
              <p className="text-gray-600">Quantity: {booking.quantity}</p>
              <p className="text-gray-600">
                Booked on: {new Date(booking.bookingDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}