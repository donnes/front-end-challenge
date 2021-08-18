import axios from 'axios';
import Constants from 'expo-constants';

const instance = axios.create({
  baseURL: Constants?.manifest?.extra?.API_URL,
  headers: { Accept: 'application/json' }
});

export const fetcher = (path: string): Promise<[]> => instance.get(path).then(res => res.data?.results || []);
