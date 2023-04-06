import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './App.styled';
import { MyGlobalStyles } from 'globalStyles/GlobalStyles.styled';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';

export function App() {
  const [imgTheme, setImgTheme] = useState('');

  const handleFormSubmit = searchValue => {
    if (searchValue === imgTheme && searchValue !== '') {
      return;
    }
    setImgTheme(searchValue);
  };

  return (
    <div>
      <Container>
        <MyGlobalStyles />
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery imgTheme={imgTheme} />
        <ToastContainer />
      </Container>
    </div>
  );
}
