import { useState, useEffect } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { fetchImg } from 'services/Api';
import PropTypes from 'prop-types';
import { ImageGalleryList, ButtonLoadMore } from './ImageGallery.styled';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from 'components/Searchbar/Searchbar';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function ImageGallery() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);

  const [search, setSearch] = useState('');

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

        if (page === 1) {
          setImages([...normalizedImages]); //
        } else {
          setImages(prevState => [...prevState, ...normalizedImages]); //
        }

        setError(null);
        setStatus(Status.RESOLVED);
        setTotalHits(totalHits);

        // this.scrollToBottom();
      } catch (error) {
        setError('error');
        setStatus(Status.REJECTED);
      }
    }
    loadImg();

    // return () => {
    //   controller.abort();
    // };
  }, [search, page]);

  // scrollToBottom = () => {
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: 'smooth',
  //   });
  // };

  const handleFormSubmit = searchValue => {
    if (searchValue === search && searchValue !== '') {
      return;
    }
    setSearch(searchValue);
    setImages([]);
    setPage(1);
  };

  console.log('images.length', images.length);
  console.log('totalHits', totalHits);

  // if (images.length === totalHits) {
  //   toast.warn('Sorry, there are no images matching your search query.');
  // }

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
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
      {status === Status.REJECTED && (
        <h2>
          An error occurred, we could not upload the photo, please try reloading
          the page and try again :)
        </h2>
      )}
      {/* add totalHits */}
      {images.length === 0 && status === Status.RESOLVED && totalHits === 0 && (
        <h2>We didn't find anything according to your request</h2>
      )}
    </>
  );
}

// We didn't find anything according to your request

ImageGallery.propTypes = {
  // imgTheme: PropTypes.string.isRequired,
  // resetImg
  // resetPage
};

// export class ImageGallery extends Component {
//   static propTypes = {
//     imgTheme: PropTypes.string.isRequired,
//   };

//   state = {
//     images: [],
//     error: null,
//     status: Status.IDLE,
//     page: null,
//     totalHits: null,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     if (
//       this.state.status === Status.RESOLVED &&
//       this.state.images.length === this.state.totalHits &&
//       prevState.images.length !== this.state.totalHits
//     ) {
//       toast.warn('Sorry, there are no images matching your search query.');
//     }
//     const { imgTheme } = this.props;

//     if (imgTheme && prevProps.imgTheme !== imgTheme) {
//       await this.setState({
//         images: [],
//         page: 1,
//       });

//       await this.loadImg();
//     }
//   }

//   loadImg = async () => {
//     this.setState({ status: Status.PENDING });

//     try {
//       const { hits, totalHits } = await fetchImg(
//         this.props.imgTheme,
//         this.state.page
//       );

//       await this.setState(prevState => {
//         return {
//           images: [...prevState.images, ...normalizedImages],
//           error: null,
//           status: Status.RESOLVED,
//           page: prevState.page + 1,
//           totalHits: totalHits,
//         };
//       });

//       const normalizedImages = hits.map(
//         ({ id, webformatURL, largeImageURL, tags }) => {
//           return {
//             id,
//             webformatURL,
//             largeImageURL,
//             tags,
//           };
//         }
//       );

//       this.scrollToBottom();
//     } catch (error) {
//       this.setState({ error: 'error', status: Status.REJECTED });
//     }
//   };

//   scrollToBottom = () => {
//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: 'smooth',
//     });
//   };

//   render() {
//     const { status, images, totalHits } = this.state;

//     return (
//       <>
//         {images.length > 0 && (
//           <ImageGalleryList className="gallery">
//             {images.map(image => {
//               return <ImageGalleryItem key={image.id} image={image} />;
//             })}
//           </ImageGalleryList>
//         )}
//         {!(images.length >= totalHits) && status === Status.RESOLVED && (
//           <ButtonLoadMore type="button" onClick={() => this.loadImg()}>
//             Load More
//           </ButtonLoadMore>
//         )}
//         {status === Status.PENDING && <Loader />}
//         {status === Status.REJECTED && (
//           <h2>
//             An error occurred, we could not upload the photo, please try
//             reloading the page and try again :)
//           </h2>
//         )}
//         {images.length === 0 && status === Status.RESOLVED && (
//           <h2>We didn't find anything according to your request</h2>
//         )}
//       </>
//     );
//   }
// }
