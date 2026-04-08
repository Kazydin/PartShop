import request from './client';

export const fetchCategories = () => request('/api/categories');
