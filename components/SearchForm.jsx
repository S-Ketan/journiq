'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchForm() {
  const router = useRouter();
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(searchData).toString();
    router.push(`/search?${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-lg p-4 shadow-xl flex flex-wrap gap-4">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
        <input
          type="text"
          value={searchData.destination}
          onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
          className="w-full p-2 border rounded-md"
          placeholder="Where to?"
        />
      </div>
      
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
        <input
          type="date"
          value={searchData.checkIn}
          onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
        <input
          type="date"
          value={searchData.checkOut}
          onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
        <select
          value={searchData.guests}
          onChange={(e) => setSearchData({ ...searchData, guests: e.target.value })}
          className="w-full p-2 border rounded-md"
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Search
      </button>
    </form>
  );
}