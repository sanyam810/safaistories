"use client"
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

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
    // <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-8 z-50">
    //   <div className='flex flex-col w-[500px]'>
    //     <h1 className="mb-8 text-4xl font-bold">Search</h1>
    //     <div className="flex items-center ">
    //       <input
    //         type="text"
    //         value={searchTerm}
    //         onChange={(e) => setSearchTerm(e.target.value)}
    //         placeholder="Search Stories"
    //         className="w-full p-4 rounded-full bg-slate-800"
    //       />
    //       <button
    //         onClick={handleSearch}
    //         className="px-6 py-2 text-lg font-semibold text-black bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
    //       >
    //         <AiOutlineSearch />
    //       </button>
    //   </div>

    //   </div>
      
    
      
    //   {/* Display Search Results */}
    //   <div className="mt-8 w-full max-w-xl">
    //     <h2 className="mb-4 text-2xl font-bold">Search Results</h2>
    //     {searchResults.length > 0 ? (
    //       searchResults.map((item, index) => (
    //         <div key={index} className="bg-white shadow-lg rounded-md p-6 mb-8">
    //           <div className="flex items-center justify-between mb-4">
    //             <h2 className="text-xl font-semibold">{item.title}</h2>
    //           </div>
    //           <p className="text-gray-600 mb-4">{item.desc.substring(0, 150)}...</p>
    //           <div className="flex items-center text-gray-500">
    //             <img src={item.img} alt="Search Result Image" className="w-20 h-20 object-cover rounded-lg" />
    //             <span className="ml-3">{item?.createdAt?.substring(0, 10)}</span>
    //           </div>
    //           {/* Add any additional buttons or actions here */}
    //         </div>
    //       ))
    //     ) : (
    //       <p className="text-xl font-semibold text-gray-600">No results found</p>
    //     )}
    //   </div>
    // </div>
    <form className='w-[500px] relative'>
      <div className='relative'>
        <input type='search' placeholder='Search Stories' className='w-full p-4 rounded-full bg-slate-800'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className='absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-slate-900 rounded-full' onClick={handleSearch}>
          <AiOutlineSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchPage;
