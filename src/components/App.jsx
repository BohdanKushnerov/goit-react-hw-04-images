import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './App.styled';

// Сделать что нет картинок про массиве 0
// + еррор при ссылке
// Добавить глобальные стили
// status рефактор

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
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery imgTheme={this.state.imgTheme} />
      </Container>
    );
  }
}
