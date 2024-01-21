import { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Highlight = () => {

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: true,
    autoplay: true,
    // autoplaySpeed: 1000,
  };

  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/highlights');
        const data = await response.json();
        console.log('highlights from this API:', data);
        setHighlights(data);
      } catch (error) {
        console.error('Error fetching highlights:', error);
      }
    };

    fetchHighlights();
  }, []);
  

  return (
    <div>
      {/* <h2 className="text-2xl font-semibold mb-4">Highlighted Posts</h2> */}
      <Slider {...settings}>
        {highlights.map((highlight) => (
          <div key={highlight.id} className="max-w-sm border rounded-lg overflow-hidden shadow-md">
            <img src={highlight.image} alt={highlight.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
              {/* <p className="text-gray-700">{highlight.summary}</p> */}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Highlight;