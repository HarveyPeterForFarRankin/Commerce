import axios from 'axios';
import { host } from '../Auth';

export const getAllProducts = (category) => {
  return axios.get(`${host}product/products?category=${category}`);
};

export const getProduct = (id) => {
  return axios.get(`${host}product/products/${id}`);
};
