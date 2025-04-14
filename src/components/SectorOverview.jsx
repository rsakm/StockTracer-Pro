export default function SectorOverview({ darkMode, sectorData }) {
    return (
      <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <h2 className="text-lg font-semibold mb-4">Market Sectors</h2>
        <div className="space-y-3">
          {sectorData.map((sector) => (
            <div key={sector.name} className="flex justify-between items-center">
              <span>{sector.name}</span>
              <span className={sector.change > 0 ? 'text-green-500' : 'text-red-500'}>
                {sector.change > 0 ? '+' : ''}
                {sector.change}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  