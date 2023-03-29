import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import axios from 'axios';

export class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    console.log('prevProps', prevProps);
    if (prevProps.imgTheme !== this.props.imgTheme) {
      this.setState({ status: 'pending' });

      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${this.props.imgTheme}&page=1&key=33648762-c4caeb57f8348b72b000e69b2&image_type=photo&orientation=horizontal&per_page=12`
        );

        this.setState({ images: response.data.hits, status: 'resolved' });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  render() {
    const { status } = this.state;
    if (status === 'resolved') {
      return (
        <ul className="gallery">
          {this.state.images.map(image => {
            return <ImageGalleryItem key={image.id} image={image} />;
          })}
        </ul>
      );
    }
  }
}
