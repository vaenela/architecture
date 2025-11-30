import axios from 'axios';

const API_BASE = 'http://localhost:3333/api';

export const authAPI = {
  register: (userData) => 
    axios.post(`${API_BASE}/auth/register`, userData),
  
  login: (credentials) => 
    axios.post(`${API_BASE}/auth/login`, credentials),
  
  getMe: () => {
    const token = localStorage.getItem('accessToken');
    return axios.get(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

export const productsAPI = {
  getAll: () => {
    const token = localStorage.getItem('accessToken');
    return axios.get(`${API_BASE}/products`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  
  getById: (id) => {
    const token = localStorage.getItem('accessToken');
    return axios.get(`${API_BASE}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  
  create: (productData) => {
    const token = localStorage.getItem('accessToken');
    return axios.post(`${API_BASE}/products`, productData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

export const ordersAPI = {
  create: (orderData) => {
    const token = localStorage.getItem('accessToken');
    return axios.post(`${API_BASE}/orders`, orderData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  
  getMyOrders: () => {
    const token = localStorage.getItem('accessToken');
    return axios.get(`${API_BASE}/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

export const categoriesAPI = {
  getAll: () => {
    const token = localStorage.getItem('accessToken');
    return axios.get(`${API_BASE}/categories/all`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  
  getById: (id) => {
    const token = localStorage.getItem('accessToken');
    return axios.get(`${API_BASE}/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};