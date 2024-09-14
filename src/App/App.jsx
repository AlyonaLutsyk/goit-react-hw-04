import css from './App.module.css';
import { useState, useEffect } from 'react';
import SearchBar from "../components/SearchBar/SearchBar";
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../components/ImageModal/ImageModal';
import { fetchImages } from '../unsplashApi';
import { Toaster } from 'react-hot-toast';



export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
  setSelectedImage(image);
};

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      setLoading(true);
      try {
        const data = await fetchImages(query, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setError(null);
      } catch {
        setError('Failed to fetch images');
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };



  const handleLoadMore = () => setPage((prevPage) => prevPage + 1);



  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />

      {loading && <Loader />}
      
      {images.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        image={selectedImage}
      />
      <Toaster />
    </div>
  );
}
