'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

const HotelCard = ({ hotelId, image, name, city, startingPrice }) => {
  const { data: session, status } = useSession();
  const [showRooms, setShowRooms] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [quantity, setQuantity] = useState(1);

  const fetchHotelDetails = async () => {
    try {
      setLoading(true);
      setError('');
      setBookingStatus('');
      const response = await fetch(`http://localhost:5000/api/hotels/${hotelId}`, {
        headers: { 'Accept': 'application/json' }
      });
      const text = await response.text();
      console.log('Hotel details raw response:', text);
      console.log('Hotel details headers:', Object.fromEntries(response.headers.entries()));
      console.log('Hotel details status:', response.status);

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Hotel details API did not return valid JSON: ${text.slice(0, 100)}`);
      }
      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(text);
          throw new Error(`Failed to fetch hotel details: ${errorData.message || response.statusText}`);
        } catch {
          throw new Error(`Failed to fetch hotel details: ${response.statusText}`);
        }
      }
      const data = JSON.parse(text);
      setRooms(data.rooms || []);
      setShowRooms(true);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setShowRooms(false);
    } finally {
      setLoading(false);
    }
  };

  const handleBookRoom = async (roomType) => {
    if (status !== 'authenticated') {
      setBookingStatus('Please sign in to book a room.');
      return;
    }
    if (!roomType) {
      setBookingStatus('Please select a room type.');
      return;
    }
    if (quantity < 1) {
      setBookingStatus('Quantity must be at least 1.');
      return;
    }
    if (!session?.user?.id) {
      setBookingStatus('User ID not found. Please sign in again.');
      return;
    }

    try {
      setBookingStatus('');
      console.log('Booking request:', { hotelId, roomType, quantity, userId: session.user.id });
      const response = await fetch(`http://localhost:5000/api/hotels/${hotelId}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-User-ID': session.user.id
        },
        body: JSON.stringify({ roomType, quantity })
      });
      const text = await response.text();
      console.log('Booking response:', text);
      console.log('Booking headers:', Object.fromEntries(response.headers.entries()));
      console.log('Booking status:', response.status);

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Booking API did not return valid JSON: ${text.slice(0, 100)}`);
      }
      if (!response.ok) {
        const errorData = JSON.parse(text);
        throw new Error(`Booking failed: ${errorData.message || response.statusText}`);
      }
      const data = JSON.parse(text);
      setRooms(data.hotel.rooms || []);
      setBookingStatus('Booking successful!');
    } catch (err) {
      console.error('Booking error:', err);
      setBookingStatus(`Failed to book room: ${err.message}`);
    }
  };

  const handleViewDetails = () => {
    if (!showRooms) {
      fetchHotelDetails();
    } else {
      setShowRooms(false);
      setBookingStatus('');
    }
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{name}</h2>
        <p className="text-sm text-gray-600 mb-2">
          <span className="mr-2">📍</span>
          {city}
        </p>
        <p className="text-lg font-semibold text-green-600">
          From ${startingPrice}/night
        </p>
        <button
          onClick={handleViewDetails}
          disabled={loading}
          className={`w-full mt-4 px-4 py-2 rounded-lg font-medium transition-colors ${
            loading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? 'Loading...' : showRooms ? 'Hide Rooms' : 'View Rooms'}
        </button>
        {error && (
          <p className="mt-2 text-red-500 text-sm text-center">{error}</p>
        )}
        {showRooms && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h3 className="text-lg font-semibold mb-3">Available Rooms</h3>
            <div className="space-y-3">
              {rooms.length > 0 ? (
                rooms.map((room) => (
                  <div
                    key={room._id}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">{room.type}</h4>
                        <p className="text-sm text-gray-600">${room.price}/night</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">
                          {room.available} left
                        </p>
                        <p className="text-xs text-gray-500">
                          {room.booked} booked
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                          min="1"
                          className="w-20 p-1 border rounded text-sm"
                          placeholder="Quantity"
                        />
                        <button
                          onClick={() => handleBookRoom(room.type)}
                          className="flex-1 bg-emerald-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-emerald-600 transition-colors"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-sm">No rooms available.</p>
              )}
            </div>
            {bookingStatus && (
              <p className={`mt-3 text-sm ${bookingStatus.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                {bookingStatus}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelCard;