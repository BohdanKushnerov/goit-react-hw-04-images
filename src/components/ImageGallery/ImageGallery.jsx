import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import axios from 'axios';

export class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
    page: null,
  };

  loadImg = async () => {
    const response = await axios.get(
      `https://pixabay.com/api/?q=${this.props.imgTheme}&page=${this.state.page}&key=33648762-c4caeb57f8348b72b000e69b2&image_type=photo&orientation=horizontal&per_page=12`
    );

    this.setState(prevState => {
      return {
        page: prevState.page + 1,
        images: [...prevState.images, ...response.data.hits],
        status: 'resolved',
      };
    });

    // this.setState(prevState => {
    //   return {
    //     page: prevState.page + 1,
    //     images: prevState.images
    //       ? [...prevState.images, ...response.data.hits]
    //       : [...response.data.hits],
    //     status: 'resolved',
    //   };
    // });
  };

  async componentDidUpdate(prevProps, prevState) {
    // console.log('prevProps', prevProps);
    if (this.props.imgTheme && prevProps.imgTheme !== this.props.imgTheme) {
      this.setState({ status: 'pending' });

      try {
        this.setState({
          page: 1,
        });

        const response = await axios.get(
          `https://pixabay.com/api/?q=${this.props.imgTheme}&page=${this.state.page}&key=33648762-c4caeb57f8348b72b000e69b2&image_type=photo&orientation=horizontal&per_page=12`
        );

        this.setState(prevState => {
          return {
            page: prevState.page + 1,
          };
        });

        this.setState({
          images: response.data.hits,
          status: 'resolved',
        });

        // console.log(this.state.images.length);
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  render() {
    const { status } = this.state;
    if (status === 'resolved') {
      return (
        <>
          <ul className="gallery">
            {this.state.images.map(image => {
              return <ImageGalleryItem key={image.id} image={image} />;
            })}
          </ul>

          <button type="button" onClick={() => this.loadImg()}>
            Load More
          </button>
        </>
      );
    }
  }
}
