// import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts';

// export default function StockChart({ darkMode, chartData, activeStock }) {
//   return (
//     <div className="h-64 mb-6">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
//           <XAxis
//             dataKey="time"
//             tickFormatter={(value) => value}
//             stroke={darkMode ? '#9ca3af' : '#6b7280'}
//           />
//           <YAxis
//             domain={['dataMin - 1', 'dataMax + 1']}
//             stroke={darkMode ? '#9ca3af' : '#6b7280'}
//           />
//           <Tooltip
//             contentStyle={{
//               backgroundColor: darkMode ? '#1f2937' : '#ffffff',
//               border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
//               color: darkMode ? '#ffffff' : '#000000'
//             }}
//           />
//           <Line
//             type="monotone"
//             dataKey="price"
//             stroke={parseFloat(activeStock.change) >= 0 ? '#10b981' : '#ef4444'}
//             dot={false}
//             strokeWidth={2}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }


// StockChart.jsx
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from 'recharts';

export default function StockChart({ darkMode, chartData, activeStock }) {
  return (
    <div className="h-64 mb-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? '#374151' : '#e5e7eb'}
          />
          <XAxis
            dataKey="time"
            stroke={darkMode ? '#9ca3af' : '#6b7280'}
          />
          <YAxis
            domain={['dataMin - 1', 'dataMax + 1']}
            stroke={darkMode ? '#9ca3af' : '#6b7280'}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              color: darkMode ? '#ffffff' : '#000000',
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={
              parseFloat(activeStock?.change || 0) >= 0
                ? '#10b981'
                : '#ef4444'
            }
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
