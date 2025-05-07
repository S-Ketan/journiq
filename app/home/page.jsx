'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import HotelCard from '@components/HotelCard';
import SearchForm from '@components/SearchForm';

export default function HomePage() {
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured hotels
        const hotelsRes = await fetch('http://localhost:5000/api/hotels/featured', {
          headers: { 'Accept': 'application/json' }
        });
        const hotelsText = await hotelsRes.text();
        console.log('Featured hotels raw response:', hotelsText);
        console.log('Featured hotels headers:', Object.fromEntries(hotelsRes.headers.entries()));
        console.log('Featured hotels status:', hotelsRes.status);

        const hotelsContentType = hotelsRes.headers.get('content-type');
        if (!hotelsContentType || !hotelsContentType.includes('application/json')) {
          throw new Error(`Featured hotels API did not return valid JSON: ${hotelsText.slice(0, 100)}`);
        }
        if (!hotelsRes.ok) {
          let errorData;
          try {
            errorData = JSON.parse(hotelsText);
            throw new Error(`Failed to fetch featured hotels: ${errorData.message || hotelsRes.statusText}`);
          } catch {
            throw new Error(`Failed to fetch featured hotels: ${hotelsRes.statusText}`);
          }
        }
        const hotelsData = JSON.parse(hotelsText);
        console.log('Parsed hotels:', hotelsData);

        // Map schema fields to HotelCard props
        const mappedHotels = hotelsData.map(hotel => ({
          _id: hotel._id,
          name: hotel.name,
          city: hotel.location, // Use location as city (adjust if needed)
          startingPrice: hotel.rooms.length > 0 ? Math.min(...hotel.rooms.map(room => room.price)) : 0,
          image: hotel.image || 'https://images.unsplash.com/photo-1544742959-8a65ad6d0d75' // Placeholder
        }));
        setFeaturedHotels(mappedHotels || []);

        // Fetch popular destinations (commented out until endpoint is defined)
        /*
        const destinationsRes = await fetch('http://localhost:5000/api/destinations', {
          headers: { 'Accept': 'application/json' }
        });
        const destinationsText = await destinationsRes.text();
        console.log('Destinations raw response:', destinationsText);
        console.log('Destinations headers:', Object.fromEntries(destinationsRes.headers.entries()));
        console.log('Destinations status:', destinationsRes.status);

        const destinationsContentType = destinationsRes.headers.get('content-type');
        if (!destinationsContentType || !destinationsContentType.includes('application/json')) {
          throw new Error(`Destinations API did not return valid JSON: ${destinationsText.slice(0, 100)}`);
        }
        if (!destinationsRes.ok) {
          let errorData;
          try {
            errorData = JSON.parse(destinationsText);
            throw new Error(`Failed to fetch destinations: ${errorData.message || destinationsRes.statusText}`);
          } catch {
            throw new Error(`Failed to fetch destinations: ${destinationsRes.statusText}`);
          }
        }
        const destinationsData = JSON.parse(destinationsText);
        setPopularDestinations(destinationsData || []);
        */
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Failed to load data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

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
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Retry
          </button>
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