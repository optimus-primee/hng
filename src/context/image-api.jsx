import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const ImageContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState(null);
  const [searchImages, setSearchImages] = useState([]);
  const [error, setError] = useState(null);
  const { VITE_DB_KEY } = import.meta.env; // Destructure VITE_DB_KEY

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${VITE_DB_KEY}`
      )
      .then(async (res) => {
        const images = await Promise.all(
          res.data.results.map(async (movie) => {
            try {
              const imdbResponse = await axios.get(
                `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${VITE_DB_KEY}`
              );
              movie.poster_path = imdbResponse.data.poster_path || null;
              return movie;
            } catch (error) {
              console.error('Error fetching poster image:', error);
              return movie; // Keep the movie object even if there's an error
            }
          })
        );

        setImages(images);
        setSearchImages(images);
      })
      .catch((error) => {
        console.error('Error fetching top-rated images:', error);
        setError(error);
      });
  }, [VITE_DB_KEY]);

  if (images === null && searchImages === null) {
    return <div>Loading...</div>; // Consider using a loading spinner here
  }

  return (
    <ImageContext.Provider
      value={{ error, images, searchImages, setSearchImages }}
    >
      {children}
    </ImageContext.Provider>
  );
};
