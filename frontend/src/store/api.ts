import axios from 'axios';

const DOMAIN = 'http://localhost:3000';

export const fetchData = async <T>(
  url: string,
  body?: { [key: string]: string },
): Promise<{ ok: boolean; data: T | null; error?: string }> => {
  try {
    const response = await axios.post<T>(`${DOMAIN}/url`, body);
    const data = await response.data;

    return {
      ok: true,
      data,
    };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      data: null,
      error: e as string,
    };
  }
};
