import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { ImgGalleryItem, Image } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ image }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    // }));
    setShowModal(prevState => !prevState);
  };

  const { webformatURL, largeImageURL, tags } = image;

  return (
    <ImgGalleryItem className="gallery-item">
      <Image src={webformatURL} alt={tags} onClick={toggleModal} />
      {showModal && (
        <Modal img={largeImageURL} alt={tags} onClose={toggleModal} />
      )}
    </ImgGalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
