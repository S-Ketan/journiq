'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const HotelCard = ({ hotelId, image, name, city, startingPrice }) => {
  const [showRooms, setShowRooms] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchHotelDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`/api/hotels/${hotelId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch hotel details');
      }
      
      const data = await response.json();
      setRooms(data.rooms);
      setShowRooms(true);
    } catch (err) {
      setError(err.message);
      setShowRooms(false);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = () => {
    if (!showRooms) {
      fetchHotelDetails();
    } else {
      setShowRooms(false);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Hotel Image */}
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

      {/* Hotel Info */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{name}</h2>
        <p className="text-sm text-gray-600 mb-2">
          <span className="mr-2">📍</span>
          {city}
        </p>
        <p className="text-lg font-semibold text-green-600">
          From ${startingPrice}/night
        </p>

        {/* View Details Button */}
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

        {/* Error Message */}
        {error && (
          <p className="mt-2 text-red-500 text-sm text-center">{error}</p>
        )}

        {/* Rooms List */}
        {showRooms && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h3 className="text-lg font-semibold mb-3">Available Rooms</h3>
            <div className="space-y-3">
              {rooms.map((room) => (
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
                  
                  {/* Book Button */}
                  <button className="mt-2 w-full bg-emerald-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-emerald-600 transition-colors">
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelCard;