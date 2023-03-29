export const ImageGalleryItem = props => {
  // { id, webformatURL, largeImageURL }
  return (
    <li className="gallery-item">
      <img src={props.image.webformatURL} alt="" />
    </li>
  );
};
