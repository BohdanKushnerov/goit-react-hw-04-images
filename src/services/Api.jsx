import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImg = async (imgTheme, page) => {
  // const response = await axios({
  //   params: {
  //     key: '33648762-c4caeb57f8348b72b000e69b2',
  //     q: `${imgTheme}`,
  //     image_type: 'photo',
  //     orientation: 'horizontal',
  //     per_page: '12',
  //     page: `${page}`,
  //   },
  // });
  const response = await axios.get(
    `https://pixabay.com/api/?q=${imgTheme}&page=${page}&key=33648762-c4caeb57f8348b72b000e69b2&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
};
