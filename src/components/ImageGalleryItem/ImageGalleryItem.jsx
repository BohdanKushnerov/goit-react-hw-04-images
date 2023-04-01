import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { ImgGalleryItem, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props.image;
    // console.log(this.props.image);

    return (
      <ImgGalleryItem className="gallery-item">
        <Image src={webformatURL} alt={tags} onClick={this.toggleModal} />
        {this.state.showModal && (
          <Modal img={largeImageURL} alt={tags} onClose={this.toggleModal} />
        )}
      </ImgGalleryItem>
    );
  }
}
