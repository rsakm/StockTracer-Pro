import { RefreshCw } from 'lucide-react';

export default function Watchlist({ darkMode, watchlist, activeStock, setActiveStock, refreshData, loading }) {
  return (
    <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Watchlist</h2>
        <button onClick={refreshData} className={`p-2 rounded-full ${loading ? 'animate-spin' : ''}`}>
          <RefreshCw size={18} className="text-blue-500" />
        </button>
      </div>

      <div className="space-y-3">
        {watchlist.map((stock) => (
          <div
            key={stock.symbol}
            onClick={() => setActiveStock(stock)}
            className={`p-3 rounded-md cursor-pointer flex justify-between items-center ${
              activeStock.symbol === stock.symbol
                ? darkMode
                  ? 'bg-blue-900 bg-opacity-30'
                  : 'bg-blue-50'
                : darkMode
                ? 'hover:bg-gray-700'
                : 'hover:bg-gray-100'
            }`}
          >
            <div>
              <h3 className="font-bold">{stock.symbol}</h3>
              <p className="text-sm text-gray-400">Volume: {stock.volume}</p>
            </div>

            <div className="text-right">
              <p className="font-bold">${stock.price.toFixed(2)}</p>
              <p
                className={`text-sm ${parseFloat(stock.change) > 0 ? 'text-green-500' : 'text-red-500'}`}
              >
                {parseFloat(stock.change) > 0 ? '+' : ''}
                {parseFloat(stock.change).toFixed(2)} ({stock.percentChange}%)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}