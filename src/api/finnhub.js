
import { throttledGet } from './throttledAxios';

const API_KEY = 'cvueocpr01qjg139bmt0cvueocpr01qjg139bmtg';
const BASE_URL = 'https://finnhub.io/api/v1';

export const getQuote = async (symbol) => {
  const { data } = await throttledGet(`${BASE_URL}/quote`, {
    symbol,
    token: API_KEY,
  });
  return data;
};

export const getSearchResults = async (query) => {
  const { data } = await throttledGet(`${BASE_URL}/search`, {
    q: query,
    token: API_KEY,
  });
  return data.result;
};

export const getCandleData = async (symbol, resolution = '1') => {
  try {
    const currentTime = Math.floor(Date.now() / 1000);
    const oneDayAgo = currentTime - 24 * 60 * 60;

    const { data } = await throttledGet(`${BASE_URL}/stock/candle`, {
      symbol,
      resolution,
      from: oneDayAgo,
      to: currentTime,
      token: API_KEY,
    });

    if (data.s === 'ok') {
      return data.t.map((timestamp, i) => ({
        time: new Date(timestamp * 1000).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        price: data.c[i],
      }));
    } else {
      console.warn('Candle data fetch failed:', data);
      return [];
    }
  } catch (err) {
    console.error('Error fetching candle data:', err);
    return [];
  }
};

export const getIndicesData = async () => {
  const symbols = ['^GSPC', '^IXIC', '^DJI'];
  try {
    const responses = [];

    for (const symbol of symbols) {
      const data = await getQuote(symbol);
      responses.push(data);
    }

    return responses.map((response, index) => {
      const indexName = index === 0 ? 'S&P 500' : index === 1 ? 'NASDAQ' : 'DOW';
      const value = response?.c ?? null;
      const change = response?.dp ?? null;

      if (value === null || change === null) {
        return { name: indexName, value: 'N/A', change: 'N/A' };
      }

      return {
        name: indexName,
        value: value.toFixed(2),
        change: `${change.toFixed(2)}%`,
      };
    });
  } catch (error) {
    console.error('Error fetching indices data:', error);
    return [
      { name: 'S&P 500', value: 'Error', change: 'Error' },
      { name: 'NASDAQ', value: 'Error', change: 'Error' },
      { name: 'DOW', value: 'Error', change: 'Error' },
    ];
  }
};
