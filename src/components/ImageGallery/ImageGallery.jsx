import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { fetchImg } from 'services/Api';
import PropTypes from 'prop-types';
import { ImageGalleryList, ButtonLoadMore } from './ImageGallery.styled';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class ImageGallery extends Component {
  static propTypes = {
    imgTheme: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    error: null,
    status: Status.IDLE,
    page: null,
    totalHits: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
    if (
      this.state.status === Status.RESOLVED &&
      this.state.images.length === this.state.totalHits &&
      prevState.images.length !== this.state.totalHits
    ) {
      toast.warn('Sorry, there are no images matching your search query.');
    }
    const { imgTheme } = this.props;

    if (imgTheme && prevProps.imgTheme !== imgTheme) {
      await this.setState({
        images: [],
        page: 1,
      });

      await this.loadImg();
    }
  }

  loadImg = async () => {
    this.setState({ status: Status.PENDING });

    try {
      const { hits, totalHits } = await fetchImg(
        this.props.imgTheme,
        this.state.page
      );

      await this.setState(prevState => {
        return {
          images: [...prevState.images, ...normalizedImages],
          error: null,
          status: Status.RESOLVED,
          page: prevState.page + 1,
          totalHits: totalHits,
        };
      });

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
    } catch (error) {
      this.setState({ error: 'error', status: Status.REJECTED });
    }
  };

  render() {
    const { status, images, totalHits } = this.state;

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
          <ButtonLoadMore type="button" onClick={() => this.loadImg()}>
            Load More
          </ButtonLoadMore>
        )}
        {status === Status.PENDING && <Loader />}
        {status === Status.REJECTED && (
          <h2>
            An error occurred, we could not upload the photo, please try
            reloading the page and try again :)
          </h2>
        )}
        {images.length === 0 && status === Status.RESOLVED && (
          <h2>We didn't find anything according to your request</h2>
        )}
      </>
    );
  }
}
