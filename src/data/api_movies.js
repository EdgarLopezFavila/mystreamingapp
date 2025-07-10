const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDEzY2RlZGE0ZjY0ZDM5N2I1NDM5ZTRlOTQ3OWE2YyIsIm5iZiI6MTc1MjEwODQ0Mi41Nywic3ViIjoiNjg2ZjBkOWE0NDVmNWFhZDFjNzAzZWQ5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.nvPUgL07ILmljD-sj96dhwrRQSUHPr0Q8cXZ0Qshffs';

const get_options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      `Bearer ${API_KEY}`,
  },
};

const fetchApiGet = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...get_options,
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching API:', error);
    throw error; // Re-lanzamos el error para que lo maneje el componente
  }
};

export const movieApi = {
  getMovieList: async (type, language = 'en-US', page = 1) => {
    return fetchApiGet(`/movie/${type}?language=${language}&page=${page}`);
  },

  getVideoById: async (id, language = 'en-US') => {
    return fetchApiGet(`/movie/${id}/videos?language=${language}`)
  },
  /**getPopular: async (language = 'es-US', page = 1) => {
    return fetchApiGet(`/movie/popular?language=${language}&page=${page}`);
  
  /**getMovieDetails: async (movieId, language = 'es-US') => {
    return fetchApi(`/movie/${movieId}?language=${language}`);
  },
  
  searchMovies: async (query, language = 'es-US', page = 1) => {
    return fetchApi(`/search/movie?query=${query}&language=${language}&page=${page}`);
  }
  
  // Puedes añadir más endpoints aquí según necesites **/
};
