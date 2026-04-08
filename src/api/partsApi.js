import request from './client';

export const fetchFeaturedParts = () =>
  request('/api/parts/featured');

export const fetchParts = ({ category, brand, maxPrice, sort } = {}) => {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (brand)    params.set('brand', brand);
  if (maxPrice) params.set('maxPrice', maxPrice);
  if (sort)     params.set('sort', sort);
  const qs = params.toString();
  return request(`/api/parts${qs ? `?${qs}` : ''}`);
};

export const fetchPartById = (id) =>
  request(`/api/parts/${id}`);

export const fetchRelatedParts = (id) =>
  request(`/api/parts/${id}/related`);

export const searchParts = (q) =>
  request(`/api/parts/search?q=${encodeURIComponent(q)}`);
