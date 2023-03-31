import axios from 'axios';

export const fetchImg = async (imgTheme, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${imgTheme}&page=${page}&key=33648762-c4caeb57f8348b72b000e69b2&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data.hits;
};
