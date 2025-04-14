import { Search, RefreshCw, Settings } from 'lucide-react';

export default function Header({ darkMode, setDarkMode, searchQuery, setSearchQuery, searchResults, handleSearchResultClick, loading, refreshData }) {
  return (
    <header className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold mr-6">StockTracker Pro</h1>

          <div className={`relative flex items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg px-3 py-2`}>
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search stocks..."
              className={`ml-2 outline-none ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {searchResults.length > 0 && (
              <div className={`absolute top-full left-0 right-0 mt-1 rounded-md shadow-lg overflow-hidden z-10 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                {searchResults.map((result) => (
                  <div
                    key={result.symbol}
                    className={`p-3 cursor-pointer ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                    onClick={() => handleSearchResultClick(result)}
                  >
                    <div className="font-medium">{result.symbol}</div>
                    <div className="text-sm text-gray-400">{result.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <div className="mr-4 px-3 py-1 rounded-md bg-yellow-600 text-white text-sm">
            {loading ? 'Loading...' : 'Live Data'}
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`mr-4 px-3 py-1 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>

          <button className="p-2 mr-2" onClick={refreshData}>
            <RefreshCw size={20} className={`text-gray-400 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button className="p-2">
            <Settings size={20} className="text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
