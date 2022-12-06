import axios from 'axios';
import { Environment } from '../../../environment';

const Api = axios.create({
  baseURL: Environment.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export { Api };
