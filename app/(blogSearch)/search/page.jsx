"use client"

import { useState, useEffect } from 'react';
import prisma from '@/utils/connect';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?q=${searchTerm}`);
      const data = await response.json();

      if (response.ok) {
        console.log('Search results:', data);
        
        setSearchResults(data);
        console.log('Search results 2:', searchResults);
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
        {searchResults ? (
          <ul>
            {searchResults?.titles.map((title, index) => (
              <li key={index}>{title}</li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
