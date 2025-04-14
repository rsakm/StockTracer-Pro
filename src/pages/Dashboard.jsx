import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Watchlist from '../components/Watchlist';
import SectorOverview from '../components/SectorOverview';
import Indices from '../components/Indices';
import StockDetails from '../components/StockDetails';
import StockChart from '../components/StockChart';
import SimilarStocks from '../components/SimilarStocks';
import { getQuote, getSearchResults, getCandleData, getIndicesData } from '../api/finnhub';
import { RefreshCw } from 'lucide-react';

// Mock data fallback
const mockStockData = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 182.63, change: 2.54, percentChange: '1.41', volume: '45.2M', prevClose: 180.09, open: 181.22, high: 183.50, low: 180.97 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 417.88, change: 1.25, percentChange: '0.30', volume: '22.5M', prevClose: 416.63, open: 415.88, high: 418.35, low: 414.25 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 172.51, change: -0.67, percentChange: '-0.39', volume: '19.8M', prevClose: 173.18, open: 172.90, high: 173.42, low: 171.50 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 185.36, change: 1.18, percentChange: '0.64', volume: '33.1M', prevClose: 184.18, open: 184.50, high: 186.25, low: 183.77 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 172.82, change: -3.45, percentChange: '-1.96', volume: '98.7M', prevClose: 176.27, open: 175.80, high: 177.20, low: 171.90 },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: 511.78, change: 5.21, percentChange: '1.03', volume: '18.5M', prevClose: 506.57, open: 507.33, high: 512.44, low: 505.21 },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 636.42, change: 8.79, percentChange: '1.40', volume: '5.3M', prevClose: 627.63, open: 629.50, high: 638.20, low: 626.80 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 881.86, change: 15.23, percentChange: '1.76', volume: '41.9M', prevClose: 866.63, open: 869.75, high: 885.45, low: 865.33 }
];

const mockIndicesData = [
  { name: 'S&P 500', value: '5,234.18', change: '+0.54%' },
  { name: 'NASDAQ', value: '16,735.02', change: '+0.83%' },
  { name: 'DOW', value: '38,675.68', change: '+0.12%' }
];

const mockSectorData = [
  { name: 'Technology', change: 1.8 },
  { name: 'Healthcare', change: -0.3 },
  { name: 'Energy', change: 2.1 },
  { name: 'Finance', change: 0.7 },
  { name: 'Consumer', change: -0.5 }
];

export default function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [activeStock, setActiveStock] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [chartData, setChartData] = useState([]);
  const [sectorData, setSectorData] = useState(mockSectorData);
  const [indicesData, setIndicesData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const formatVolume = (volume) => {
    if (!volume && volume !== 0) return "N/A";
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`;
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`;
    return volume.toString();
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NFLX', 'NVDA'];

      try {
        const stockPromises = symbols.map(async (symbol) => {
          const data = await getQuote(symbol);
          return {
            symbol,
            name: symbol,
            price: data.c,
            change: data.c - data.pc,
            percentChange: ((data.c - data.pc) / data.pc * 100).toFixed(2),
            volume: formatVolume(data.v),
            prevClose: data.pc,
            open: data.o,
            high: data.h,
            low: data.l
          };
        });

        const stocksData = await Promise.all(stockPromises);
        const indices = await getIndicesData();

        setStocks(stocksData);
        setIndicesData(indices);
        setActiveStock(stocksData[0]);
        setWatchlist([stocksData[0], stocksData[2], stocksData[5]]);
      } catch (error) {
        console.error('Fetch failed, using mock data.', error);
        setStocks(mockStockData);
        setIndicesData(mockIndicesData);
        setActiveStock(mockStockData[0]);
        setWatchlist([mockStockData[0], mockStockData[2], mockStockData[5]]);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchChart = async () => {
      if (!activeStock) return;
      const now = Math.floor(Date.now() / 1000);
      const from = now - (6.5 * 60 * 60);

      try {
        const data = await getCandleData(activeStock.symbol, '5', from, now);
        if (data.s !== 'ok') throw new Error('Chart data fetch failed');
        const formatted = data.t.map((timestamp, i) => ({
          time: new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          price: data.c[i]
        }));
        setChartData(formatted);
      } catch (error) {
        console.error('Chart fetch failed, using empty data.', error);
        setChartData([]);
      }
    };

    fetchChart();
  }, [activeStock]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery) {
        try {
          const results = await getSearchResults(searchQuery);
          setSearchResults(results.filter(r => r.type === 'Common Stock'));
        } catch (error) {
          console.error('Search fetch failed.', error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchResultClick = (result) => {
    setSearchQuery('');
    setSearchResults([]);
    const selected = stocks.find(s => s.symbol === result.symbol) || mockStockData.find(s => s.symbol === result.symbol);
    if (selected) {
      setActiveStock(selected);
      if (!stocks.some(s => s.symbol === selected.symbol)) {
        setStocks([...stocks, selected]);
      }
    }
  };

  const addToWatchlist = (stock) => {
    if (!watchlist.some(item => item.symbol === stock.symbol)) {
      setWatchlist([...watchlist, stock]);
    }
  };

  const refreshData = () => {
    window.location.reload();
  };

  if (loading && (!stocks.length || !activeStock)) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="flex flex-col items-center">
          <RefreshCw size={40} className="animate-spin text-blue-500 mb-4" />
          <p className="text-lg">Loading stock data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        handleSearchResultClick={handleSearchResultClick}
        loading={loading}
        refreshData={refreshData}
      />

      <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          <Watchlist
            darkMode={darkMode}
            watchlist={watchlist}
            activeStock={activeStock}
            setActiveStock={setActiveStock}
            refreshData={refreshData}
            loading={loading}
          />
          <SectorOverview darkMode={darkMode} sectorData={sectorData} />
          <Indices darkMode={darkMode} indicesData={indicesData} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <StockDetails
            darkMode={darkMode}
            activeStock={activeStock}
            addToWatchlist={addToWatchlist}
            watchlist={watchlist}
          />
          <StockChart
            darkMode={darkMode}
            chartData={chartData}
            activeStock={activeStock}
          />
          <SimilarStocks
            darkMode={darkMode}
            stocks={stocks}
            activeStock={activeStock}
            setActiveStock={setActiveStock}
          />
        </div>
      </main>

      <footer className={`mt-8 p-4 ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'} text-center text-sm`}>
        <p>Market data provided by Finnhub.io - Updates every minute</p>
        <p className="mt-1">StockTracker Pro © 2025 - All rights reserved</p>
      </footer>
    </div>
  );
}
