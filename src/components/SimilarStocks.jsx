export default function SimilarStocks({ darkMode, stocks, activeStock, setActiveStock }) {
    return (
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <h2 className="text-lg font-semibold mb-4">Other Tech Stocks</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-left`}>
                <th className="pb-2">Symbol</th>
                <th className="pb-2">Price</th>
                <th className="pb-2">Change</th>
                <th className="pb-2">Volume</th>
              </tr>
            </thead>
            <tbody>
              {stocks
                .filter(stock => stock.symbol !== activeStock.symbol)
                .slice(0, 5)
                .map(stock => (
                  <tr
                    key={stock.symbol}
                    className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} cursor-pointer hover:bg-opacity-10 ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                    onClick={() => setActiveStock(stock)}
                  >
                    <td className="py-3 font-medium">{stock.symbol}</td>
                    <td className="py-3">${stock.price.toFixed(2)}</td>
                    <td className={`py-3 ${parseFloat(stock.change) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {parseFloat(stock.change) >= 0 ? '+' : ''}{parseFloat(stock.change).toFixed(2)} ({stock.percentChange}%)
                    </td>
                    <td className="py-3">{stock.volume}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }