import { useEffect, useState } from 'react';
import styles from './Images.module.scss';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ResponsiveGridLayout = WidthProvider(Responsive);

const initialLayouts = {
  lg: [
    { i: '0', x: 0, y: 0, w: 1, h: 1 },
    { i: '1', x: 1, y: 0, w: 1, h: 2 },
    { i: '2', x: 2, y: 1, w: 1, h: 2 },
    { i: '3', x: 0, y: 2, w: 1, h: 1 },
    { i: '4', x: 3, y: 2, w: 1, h: 3 },
    { i: '5', x: 4, y: 2, w: 1, h: 3 },
    { i: '6', x: 0, y: 2, w: 2, h: 3 },
    { i: '7', x: 2, y: 2, w: 1, h: 3 },
    { i: '8', x: 4, y: 4, w: 1, h: 3 },
    { i: '9', x: 0, y: 5, w: 2, h: 2 },
    { i: '10', x: 3, y: 3, w: 1, h: 3 },
    { i: '11', x: 0, y: 5, w: 1, h: 3 },
  ],
  md: [
    { i: '0', x: 0, y: 0, w: 1, h: 1 },
    { i: '1', x: 1, y: 0, w: 2, h: 4 },
    { i: '2', x: 3, y: 1, w: 1, h: 2 },
    { i: '3', x: 0, y: 2, w: 1, h: 1 },
    { i: '4', x: 3, y: 2, w: 1, h: 3 },
    { i: '5', x: 4, y: 2, w: 1, h: 1 },
    { i: '6', x: 0, y: 2, w: 3, h: 4 },
    { i: '7', x: 4, y: 3, w: 1, h: 3 },
    { i: '8', x: 4, y: 4, w: 1, h: 2 },
    { i: '9', x: 4, y: 5, w: 2, h: 2 },
    { i: '10', x: 3, y: 3, w: 1, h: 1 },
    { i: '11', x: 0, y: 5, w: 1, h: 3 },
  ],
  xs: [
    { i: '0', x: 0, y: 0, w: 2, h: 3 },
    { i: '1', x: 1, y: 0, w: 2, h: 4 },
    { i: '2', x: 3, y: 1, w: 1, h: 2 },
    { i: '3', x: 0, y: 2, w: 5, h: 1 },
    { i: '4', x: 5, y: 2, w: 1, h: 3 },
    { i: '5', x: 4, y: 2, w: 1, h: 1 },
    { i: '6', x: 0, y: 2, w: 3, h: 4 },
    { i: '7', x: 4, y: 3, w: 1, h: 3 },
    { i: '8', x: 4, y: 4, w: 1, h: 2 },
    { i: '9', x: 4, y: 5, w: 2, h: 2 },
    { i: '10', x: 3, y: 3, w: 1, h: 1 },
    { i: '11', x: 0, y: 5, w: 1, h: 3 },
  ],
};

const Images = () => {
  const [layout, setLayout] = useState(initialLayouts);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [images, setImages] = useState([]);
  const [searchImages, setSearchImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { VITE_DB_KEY } = import.meta.env;

  useEffect(() => {
    const apiKey = VITE_DB_KEY;
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setImages(response.data.results);
        setSearchImages(response.data.results); // Initialize searchImages with all images
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching popular movies:', error);
        setLoading(false);
      });

    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [VITE_DB_KEY]);
  console.log(loading, screenWidth);

  console.log(searchImages);

  const onLayoutChange = (layout, layouts) => {
    // Save the new layouts to state
    setLayout(layouts);
  };

  const onSearchHandler = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    if (!searchTerm) {
      setSearchImages(images); // If the search term is empty, display all images
    } else {
      const filteredDisplay = images.filter((gallery) =>
        gallery.original_title.toLowerCase().includes(searchTerm)
      );
      setSearchImages(filteredDisplay);
    }
  };

  const imagePath = 'https://image.tmdb.org/t/p/original';

  return (
    <section>
      <div className={styles.heading}>
        <Link to='/'>
          <h2>Movie Poster</h2>
        </Link>
        <form action=''>
          <label htmlFor='search'>
            Search images...
            <input
              type='text'
              id='search'
              placeholder='Search...'
              onChange={onSearchHandler}
            />
          </label>
          <button type='submit'>Search</button> {/* Add a submit button */}
        </form>
      </div>
      {searchImages.length > 0 ? (
        <ResponsiveGridLayout
          className={styles.layout}
          layouts={layout}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 5, md: 5, sm: 5, xs: 4, xxs: 1 }}
          rowHeight={150}
          onLayoutChange={onLayoutChange}
        >
          {searchImages.slice(0, 11).map((img, index) => (
            <div
              key={index}
              data-grid={{
                ...(layout.lg[index] || {}),
                i: index.toString(),
              }}
              className={styles.grid_item}
            >
              <img
                src={imagePath + img.poster_path}
                alt={`Slide ${index}`}
                className={styles.grid_image}
              />
              <p>{img.original_title}</p>
            </div>
          ))}
        </ResponsiveGridLayout>
      ) : (
        ''
      )}
    </section>
  );
};

export default Images;
