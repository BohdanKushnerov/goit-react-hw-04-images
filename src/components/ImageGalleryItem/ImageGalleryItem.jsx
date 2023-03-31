import { ImgGalleryItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = props => {
  // { id, webformatURL, largeImageURL }
  return (
    <ImgGalleryItem className="gallery-item">
      <Image src={props.image.webformatURL} alt="" />
    </ImgGalleryItem>
  );
};
