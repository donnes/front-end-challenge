import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { Accept: 'application/json' }
});

export const fetcher = (path: string): Promise<any> => instance.get(path).then(res => res.data?.results || []);
