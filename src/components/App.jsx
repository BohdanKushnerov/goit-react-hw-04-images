import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './App.styled';
import { MyGlobalStyles } from 'globalStyles/GlobalStyles.styled';
import { ToastContainer } from 'react-toastify';

export class App extends Component {
  state = {
    imgTheme: '',
  };

  handleFormSubmit = imgTheme => {
    this.setState({ imgTheme });
  };

  render() {
    return (
      <div>
        <Container>
          <MyGlobalStyles />
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery imgTheme={this.state.imgTheme} />
          <ToastContainer />
        </Container>
      </div>
    );
  }
}
