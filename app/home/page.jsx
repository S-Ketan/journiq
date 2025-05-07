'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import HotelCard from '@components/HotelCard';
import SearchForm from '@components/SearchForm';

export default function HomePage() {
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch featured hotels
//         // const hotelsRes = await fetch('/api/hotels/featured');
//         // const hotelsContentType = hotelsRes.headers.get('content-type');
//         // if (!hotelsContentType || !hotelsContentType.includes('application/json')) {
//         //   throw new Error('Featured hotels API did not return valid JSON');
//         // }
//         // if (!hotelsRes.ok) {
//         //   throw new Error(`Failed to fetch featured hotels: ${hotelsRes.statusText}`);
//         // }
//         // const hotelsData = await hotelsRes.json();
//         // setFeaturedHotels(hotelsData || []);

//         // Fetch popular destinations
//         const destinationsRes = await fetch('/api/destinations');
//         const destinationsContentType = destinationsRes.headers.get('content-type');
//         if (!destinationsContentType || !destinationsContentType.includes('application/json')) {
//           throw new Error('Destinations API did not return valid JSON');
//         }
//         if (!destinationsRes.ok) {
//           throw new Error(`Failed to fetch destinations: ${destinationsRes.statusText}`);
//         }
//         const destinationsData = await destinationsRes.json();
//         setPopularDestinations(destinationsData || []);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Failed to load data. Please try again later.');
//       }
//     };

//     fetchData();
//   }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/skull.jpg"
            alt="Travel hero image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Journey Begins Here
            </h1>
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="py-4 px-4 text-center text-red-500">
          <p>{error}</p>
        </div>
      )}

      {/* Featured Hotels */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Hotels</h2>
          {featuredHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredHotels.map(hotel => (
                <HotelCard
                  key={hotel._id}
                  hotelId={hotel._id}
                  image={hotel.image}
                  name={hotel.name}
                  city={hotel.city}
                  startingPrice={hotel.startingPrice}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No featured hotels available.</p>
          )}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Destinations</h2>
          {popularDestinations.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {popularDestinations.map((destination) => (
                <div
                  key={destination._id}
                  className="relative group overflow-hidden rounded-lg cursor-pointer h-48"
                >
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                    <h3 className="text-white text-xl font-semibold">
                      {destination.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No popular destinations available.</p>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the perfect blend of convenience and luxury in travel planning
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                ✈️
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">Find the best deals or we'll match the price</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                🛡️
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
              <p className="text-gray-600">Your information is safe with us</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                🌍
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
              <p className="text-gray-600">Explore destinations worldwide</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}