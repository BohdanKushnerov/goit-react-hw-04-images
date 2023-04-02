import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './App.styled';
import { MyGlobalStyles } from 'globalStyles/GlobalStyles.styled';

export class App extends Component {
  state = {
    imgTheme: '',
  };

  handleFormSubmit = imgTheme => {
    this.setState({ imgTheme });
  };

  render() {
    return (
      <Container>
        <MyGlobalStyles />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery imgTheme={this.state.imgTheme} />
      </Container>
    );
  }
}
