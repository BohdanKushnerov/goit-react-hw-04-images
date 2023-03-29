import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

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
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery imgTheme={this.state.imgTheme} />
      </div>
    );
  }
}
