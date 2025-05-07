'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/hotels/${id}`, {
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
            throw new Error(`Failed to fetch hotel: ${errorData.message || response.statusText}`);
          } catch {
            throw new Error(`Failed to fetch hotel: ${response.statusText}`);
          }
        }
        const data = JSON.parse(text);
        console.log('Parsed hotel:', data);

        // Map schema fields
        setHotel({
          _id: data._id,
          name: data.name,
          city: data.location,
          startingPrice: data.rooms.length > 0 ? Math.min(...data.rooms.map(room => room.price)) : 0,
          image: data.image || 'https://images.unsplash.com/photo-1544742959-8a65ad6d0d75',
          location: data.location,
          rating: data.rating,
          rooms: data.rooms
        });
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Failed to fetch data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchHotel();
  }, [id]);

  const handleBookRoom = async () => {
    if (!selectedRoomType) {
      setBookingStatus('Please select a room type.');
      return;
    }
    if (quantity < 1) {
      setBookingStatus('Quantity must be at least 1.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/hotels/${id}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ roomType: selectedRoomType, quantity })
      });
      const text = await response.text();
      console.log('Booking response:', text);

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Booking API did not return valid JSON: ${text.slice(0, 100)}`);
      }
      if (!response.ok) {
        const errorData = JSON.parse(text);
        throw new Error(`Booking failed: ${errorData.message || response.statusText}`);
      }
      const data = JSON.parse(text);
      setBookingStatus('Booking successful!');
      setHotel({
        ...hotel,
        rooms: data.hotel.rooms // Update rooms with new availability
      });
    } catch (err) {
      console.error('Booking error:', err);
      setBookingStatus(`Failed to book room: ${err.message}`);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
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
  if (!hotel) return <div className="text-center p-8">Hotel not found</div>;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>
        <div className="relative h-96 mb-6">
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <p className="text-gray-600 mb-2">Location: {hotel.location}</p>
        <p className="text-gray-600 mb-2">Rating: {'★'.repeat(Math.round(hotel.rating))}</p>
        <p className="text-gray-600 mb-4">Starting Price: ${hotel.startingPrice}</p>
        <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
        <div className="grid grid-cols-1 gap-4 mb-6">
          {hotel.rooms.map((room) => (
            <div key={room._id} className="p-4 bg-white rounded-lg shadow">
              <p className="font-semibold">{room.type}</p>
              <p>Price: ${room.price}</p>
              <p>Available: {room.available}</p>
              <p>Booked: {room.booked}</p>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-semibold mb-4">Book a Room</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Room Type</label>
            <select
              value={selectedRoomType}
              onChange={(e) => setSelectedRoomType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a room type</option>
              {hotel.rooms.map((room) => (
                <option key={room._id} value={room.type}>
                  {room.type} (${room.price})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              min="1"
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={handleBookRoom}
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Book Room
          </button>
          {bookingStatus && (
            <p className={`mt-4 ${bookingStatus.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
              {bookingStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}