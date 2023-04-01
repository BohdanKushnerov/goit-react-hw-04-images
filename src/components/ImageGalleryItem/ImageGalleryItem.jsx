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
