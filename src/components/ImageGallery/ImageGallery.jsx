import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import axios from 'axios';

export class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    page: null,
  };

  loadImg = async () => {
    this.setState({ status: 'pending' });

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${this.props.imgTheme}&page=${this.state.page}&key=33648762-c4caeb57f8348b72b000e69b2&image_type=photo&orientation=horizontal&per_page=12`
      );

      this.setState(prevState => {
        return {
          page: prevState.page + 1,
          images: prevState.images
            ? [...prevState.images, ...response.data.hits]
            : [...response.data.hits],
          status: 'resolved',
        };
      });
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    // console.log('prevProps', prevProps);
    if (this.props.imgTheme && prevProps.imgTheme !== this.props.imgTheme) {
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

  render() {
    const { status, images } = this.state;

    return (
      <>
        {images.length > 0 && (
          <ul className="gallery">
            {this.state.images.map(image => {
              return <ImageGalleryItem key={image.id} image={image} />;
            })}
          </ul>
        )}
        {status === 'resolved' && (
          <button type="button" onClick={() => this.loadImg()}>
            Load More
          </button>
        )}
        {status === 'pending' && <Loader />}
      </>
    );
  }
}
