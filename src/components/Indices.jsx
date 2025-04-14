export default function Indices({ darkMode, indicesData }) {
    return (
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <h2 className="text-lg font-semibold mb-4">Market Overview</h2>
        <div className="space-y-3">
          {indicesData.map((index) => (
            <div key={index.name} className="flex justify-between items-center">
              <span>{index.name}</span>
              <div className="text-right">
                <p className="font-medium">{index.value}</p>
                <p className={index.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                  {index.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }