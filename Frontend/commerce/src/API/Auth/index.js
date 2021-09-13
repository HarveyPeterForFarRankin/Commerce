import axios from 'axios';
import Auth from '../../Helpers/auth';
const AuthHelper = new Auth();

export const loginAPI = (username, password) => {
  return axios.post('http://localhost:8000/auth/login', { username, password });
};

export const checkToken = () => {
  return axios.get(`http://localhost:8000/auth/user/get`, {
    headers: {
      authorization: `Token ${AuthHelper.getItem('token')}`,
    },
  });
};
