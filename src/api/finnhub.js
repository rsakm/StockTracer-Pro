import { throttledGet } from './throttledAxios';

const API_KEY = 'cvt3nq9r01qhup0u34q0cvt3nq9r01qhup0u34qg';
const BASE_URL = 'https://finnhub.io/api/v1';

export const getQuote = async (symbol) => {
  try {
    const { data } = await throttledGet(`${BASE_URL}/quote`, {
      params: {
        symbol,
        token: API_KEY,
      }
    });
    return data;
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error;
  }
};

export const getSearchResults = async (query) => {
  try {
    const { data } = await throttledGet(`${BASE_URL}/search`, {
      params: {
        q: query,
        token: API_KEY,
      }
    });
    return data.result || [];
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};

export const getCandleData = async (symbol, resolution = '5', from, to) => {
  try {
    const { data } = await throttledGet(`${BASE_URL}/stock/candle`, {
      params: {
        symbol,
        resolution,
        from,
        to,
        token: API_KEY,
      }
    });

    if (data.s !== 'ok') {
      console.warn('Candle data not ok:', data);
      return { s: 'no_data' };
    }

    return data;
  } catch (error) {
    console.error('Error fetching candle data:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    return { s: 'error' };
  }
};

export const getIndicesData = async () => {
  const symbols = ['^GSPC', '^IXIC', '^DJI'];
  try {
    const responses = await Promise.all(
      symbols.map(symbol => getQuote(symbol))
    );

    return responses.map((response, index) => {
      const indexName = ['S&P 500', 'NASDAQ', 'DOW'][index];
      
      if (!response?.c || !response?.dp) {
        return { name: indexName, value: 'N/A', change: 'N/A' };
      }

      return {
        name: indexName,
        value: response.c.toFixed(2),
        change: `${response.dp.toFixed(2)}%`,
        isUp: response.dp >= 0
      };
    });
  } catch (error) {
    console.error('Error fetching indices:', error);
    return [
      { name: 'S&P 500', value: 'Error', change: 'Error' },
      { name: 'NASDAQ', value: 'Error', change: 'Error' },
      { name: 'DOW', value: 'Error', change: 'Error' }
    ];
  }
};