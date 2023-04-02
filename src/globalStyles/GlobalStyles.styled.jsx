import { Global, css } from '@emotion/react';

const GlobalStyles = css`
  @import-normalize; /* bring in normalize.css styles */

  html {
    box-sizing: border-box;
    width: 100vw;
    overflow-x: hidden;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    color: #212121;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;

export const MyGlobalStyles = () => {
  return <Global styles={GlobalStyles} />;
};
