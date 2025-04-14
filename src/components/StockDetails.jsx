import { BookmarkPlus, Bell } from 'lucide-react';

export default function StockDetails({ darkMode, activeStock, addToWatchlist, watchlist }) {
  const isInWatchlist = watchlist.some(item => item.symbol === activeStock.symbol);

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm mb-6`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">{activeStock.symbol} - {activeStock.name}</h2>
          <p className={`text-lg ${parseFloat(activeStock.change) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ${activeStock.price.toFixed(2)} {parseFloat(activeStock.change) >= 0 ? '▲' : '▼'}
            {parseFloat(activeStock.change) >= 0 ? '+' : ''}{parseFloat(activeStock.change).toFixed(2)} ({activeStock.percentChange}%)
          </p>
        </div>
        <div className="flex">
          <button
            onClick={() => addToWatchlist(activeStock)}
            className={`p-2 rounded-md mr-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            disabled={isInWatchlist}
          >
            <BookmarkPlus size={20} className={isInWatchlist ? 'text-blue-500' : 'text-gray-400'} />
          </button>
          <button className={`p-2 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
            <Bell size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-gray-400 text-sm">Open</p>
          <p className="font-medium">${activeStock.open.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">High</p>
          <p className="font-medium">${activeStock.high.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Low</p>
          <p className="font-medium">${activeStock.low.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Prev Close</p>
          <p className="font-medium">${activeStock.prevClose.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
