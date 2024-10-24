import axios from 'axios';
import { API_URL } from '../utils/constants';

export default async () => {
  return axios.get(`${API_URL}/session/`);
};
