import { Component } from 'react';
// import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './App.styled';
import { MyGlobalStyles } from 'globalStyles/GlobalStyles.styled';
import { ToastContainer } from 'react-toastify';

export class App extends Component {
  // state = {
  //   imgTheme: '',
  //   images: [],
  //   page: 1,
  // };

  // handleFormSubmit = imgTheme => {
  //   this.setState({ imgTheme });
  //   this.setState({ images: [] });
  //   this.setState({ page: 1 });
  // };

  // попробуй функц яка передасть значения по дефолту: тему, [], 1

  render() {
    return (
      <div>
        <Container>
          <MyGlobalStyles />
          {/* <Searchbar onSubmit={this.handleFormSubmit} /> */}
          <ImageGallery
          // imgTheme={this.state.imgTheme}
          // resetImg={this.state.images}
          // resetPage={this.state.page}
          // resetState={this.state}
          />
          <ToastContainer />
        </Container>
      </div>
    );
  }
}
