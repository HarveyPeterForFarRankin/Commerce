import axios from 'axios';
import { host } from '../Auth';
import Auth from '../../Helpers/auth';
const AuthHelper = new Auth();
const headers = {
  headers: {
    'content-type': 'application/json',
    authorization: `Token ${AuthHelper.getItem('token')}`,
  },
};

export const getAllProducts = (category) => {
  return axios.get(`${host}product/products?category=${category}`);
};

export const getProduct = (id) => {
  return axios.get(`${host}product/products/${id}`);
};

export const getReviewsForProduct = (id, pageSize) => {
  return axios.get(`${host}product/reviews/${id}?page_size=${pageSize}`);
};

export const createCart = (body) => {
  return axios.post(`${host}product/orders/create`, body, headers);
};

export const getCartItems = (cartId) => {
  return axios.get(`${host}product/orders/items/${cartId}`, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const addToOrder = (body) => {
  return axios.post(`${host}product/orders/items/create`, body, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const updateOrder = (body, orderId) => {
  return axios.put(`${host}product/orders/${orderId}`, body, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const deleteOrderItem = (cartId) => {
  return axios.delete(`${host}product/orders/items/update/${cartId}`, {}, headers);
};

export const getCart = (userId) => {
  return axios.get(`${host}product/orders/get/${userId}`, {
    headers: {
      'content-type': 'application/json',
    },
  });
};
