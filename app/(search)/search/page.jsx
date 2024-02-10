"use client"


import { useState, useEffect } from 'react';
import prisma from '@/utils/connect';

import Image from 'next/image';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?q=${searchTerm}`);
      const data = await response.json();

      if (response.ok) {
        console.log('Search results:', data.titles);
        setSearchResults(data.titles);
      } else {
        console.error('Error fetching search results:', data.message);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <h1>Search</h1>
    
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter your search term"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Display Search Results */}
      <div>
        <h2>Search Results</h2>
        {searchResults.length > 0 ? (
          searchResults.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-md p-6 mb-8" style={{ marginBottom: '12px' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{item.title}</h2>
              </div>
              <p className="text-gray-600 mb-4">{item.desc.substring(0, 150)}...</p>
              <div className="flex items-center text-gray-500">

                <div layout="fill" objectFit="cover" className="rounded-lg">
                  <img src={item.img}></img> 
                </div>
                 
              
                <span style={{ marginLeft: '5px' }}>{item?.createdAt?.substring(0, 10)}</span>
              </div>
              {/* Add any additional buttons or actions here */}
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
