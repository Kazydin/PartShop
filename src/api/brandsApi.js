import request from './client';

export const fetchBrands = () => request('/api/brands');
