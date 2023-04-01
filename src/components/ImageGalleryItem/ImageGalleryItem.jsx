import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import { ImgGalleryItem, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  // { id, webformatURL, largeImageURL }
  render() {
    return (
      <ImgGalleryItem className="gallery-item">
        <Image
          src={this.props.image.webformatURL}
          // data-source={this.props.image.largeImageURL}
          alt=""
          onClick={this.toggleModal}
        />
        {this.state.showModal && (
          <Modal
            img={this.props.image.largeImageURL}
            onClose={this.toggleModal}
          />
        )}
      </ImgGalleryItem>
    );
  }
}
