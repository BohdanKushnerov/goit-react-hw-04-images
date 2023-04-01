import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { fetchImg } from 'services/Api';
import PropTypes from 'prop-types';
import { ImageGalleryList, ButtonLoadMore } from './ImageGallery.styled';

export class ImageGallery extends Component {
  static propTypes = {
    imgTheme: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    error: null,
    status: 'idle',
    page: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imgTheme } = this.props;

    if (imgTheme && prevProps.imgTheme !== imgTheme) {
      try {
        this.setState({
          images: [],
          page: 1,
        });

        this.loadImg();
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  loadImg = async () => {
    this.setState({ status: 'pending' });

    try {
      const images = await fetchImg(this.props.imgTheme, this.state.page);

      this.setState(prevState => {
        return {
          // images: prevState.images
          //   ? [...prevState.images, ...images]
          //   : [...images],
          images: [...prevState.images, ...images],
          error: null,
          status: 'resolved',
          page: prevState.page + 1,
        };
      });
    } catch (error) {
      console.log(error);
      this.setState({ error: 'error', status: 'rejected' });
    }
  };

  render() {
    const { status, images } = this.state;

    return (
      <>
        {images.length > 0 && (
          <ImageGalleryList className="gallery">
            {images.map(image => {
              return <ImageGalleryItem key={image.id} image={image} />;
            })}
          </ImageGalleryList>
        )}
        {images.length > 0 && status === 'resolved' && (
          <ButtonLoadMore type="button" onClick={() => this.loadImg()}>
            Load More
          </ButtonLoadMore>
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <div>Упс капец</div>}
        {images.length === 0 && status === 'resolved' && <div>Ничего</div>}
      </>
    );
  }
}
