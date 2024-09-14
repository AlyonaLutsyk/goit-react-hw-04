
import axios from 'axios';

const API_KEY = `alE0PwRUW_YgIw5Z5ycbV2jSx5gku_-oOd5pD-wivZs`;
const BASE_URL = 'https://api.unsplash.com/search/photos';

export const fetchImages = async (query, page = 1, perPage = 12) => {
  const response = await axios.get(BASE_URL, {
    params: {
      query,
      page,
      per_page: perPage,
      client_id: API_KEY,
    },
  });
  return response.data;
};
