import { useState, useEffect } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { fetchImg } from 'services/Api';
import PropTypes from 'prop-types';
import { ImageGalleryList, ButtonLoadMore } from './ImageGallery.styled';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function ImageGallery({ imgTheme }) {
  // const [images, setImages] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [search, setSearch] = useState('');
  // const [search, setSearch] = useState(null);

  //==========================================
  // const prevTheme = useRef();

  // const updateValue = theme => {
  //   setSearch(theme);
  //   setImages([]);
  //   setPage(1);
  // };

  // if (prevTheme.current !== imgTheme && imgTheme && prevTheme.current) {
  //   prevTheme.current = imgTheme;

  //   updateValue(imgTheme);
  // }

  // console.log(prevTheme);

  // console.log(search);
  // console.log(page);
  // console.log(images);

  useEffect(() => {
    if (!imgTheme) {
      return;
    }

    setSearch(imgTheme);
    setImages([]);
    setPage(1);

    // if (prevTheme.current !== imgTheme && imgTheme && prevTheme.current) {
    //   prevTheme.current = imgTheme;

    //   updateValue(imgTheme);
    // }
  }, [imgTheme]);

  //========================================

  useEffect(() => {
    if (!search) {
      return;
    }

    async function loadImg() {
      setStatus(Status.PENDING);

      try {
        const { hits, totalHits } = await fetchImg(search, page);

        const normalizedImages = hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => {
            return {
              id,
              webformatURL,
              largeImageURL,
              tags,
            };
          }
        );

        setImages(prevState => [...prevState, ...normalizedImages]);

        setError(null);
        setStatus(Status.RESOLVED);
        setTotalHits(totalHits);
      } catch (error) {
        setError('error');
        setStatus(Status.REJECTED);
      }
    }
    loadImg();
  }, [search, page]);

  return (
    <>
      {images.length > 0 && (
        <ImageGalleryList className="gallery">
          {images.map(image => {
            return <ImageGalleryItem key={image.id} image={image} />;
          })}
        </ImageGalleryList>
      )}
      {!(images.length >= totalHits) && status === Status.RESOLVED && (
        <ButtonLoadMore
          type="button"
          onClick={() => setPage(prevState => prevState + 1)}
        >
          Load More
        </ButtonLoadMore>
      )}
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && error && (
        <h2>
          An error occurred, we could not upload the photo, please try reloading
          the page and try again :)
        </h2>
      )}
      {images.length === 0 && status === Status.RESOLVED && totalHits === 0 && (
        <h2>We didn't find anything according to your request</h2>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  imgTheme: PropTypes.string.isRequired,
};
