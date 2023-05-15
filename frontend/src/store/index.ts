import { create } from 'zustand'

interface BearState {
  bears: number
  increase: (by: number) => void
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))

export enum ApiMethod {
  GET = 'GET',
  POST = 'POST'
}

const DOMAIN = 'http://localhost:3000';

export const getData = async <T>(
  method: ApiMethod,
  apiPoint: string,
  body?: { [key: string]: string }): Promise<T> => {
  const response = await fetch(`${DOMAIN}/${apiPoint}`, {
    method,
    body: JSON.stringify(body)
  });

  return response.json();
}
