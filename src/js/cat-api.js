import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {
    'x-api-key': 'Ehs6geXOXxePCVITobYA7L1EARh74MMsGFOU4mz1cFI83KrgG93ZOTOtigSmAjVf',
  },
});

export class CatsAPI {
  getBreed() {
    return axiosInstance.get('/breeds').then(response => response.data);
  }
};

const axiosChange = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/images/search?breed_ids=',
  headers: {
    'x-api-key': 'Ehs6geXOXxePCVITobYA7L1EARh74MMsGFOU4mz1cFI83KrgG93ZOTOtigSmAjVf',
  },
});

export class CatOneAPI {
  fetchCatByBreed() {
    return axiosChange.get().then(response => response.data);
  }
}



