// import React from 'react';

// const AlertChart = ({ alerts }) => {
//   // Mock data for chart
//   const chartData = {
//     labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//     active: [12, 19, 8, 15],
//     booked: [7, 11, 6, 9],
//     expired: [3, 5, 2, 4],
//   };

//   const maxValue = Math.max(...chartData.active, ...chartData.booked, ...chartData.expired);
//   const chartHeight = 150;

//   return (
//     <div className="space-y-4">
//       {/* Legend */}
//       <div className="flex items-center space-x-4 text-xs">
//         <div className="flex items-center space-x-1.5">
//           <div className="h-2.5 w-2.5 rounded-full bg-primary-500"></div>
//           <span className="text-gray-600">Active</span>
//         </div>
//         <div className="flex items-center space-x-1.5">
//           <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
//           <span className="text-gray-600">Booked</span>
//         </div>
//         <div className="flex items-center space-x-1.5">
//           <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
//           <span className="text-gray-600">Expired</span>
//         </div>
//       </div>

//       {/* Chart Bars */}
//       <div className="relative h-40">
//         <div className="flex items-end justify-between h-full px-4 pb-8">
//           {chartData.labels.map((label, index) => (
//             <div key={label} className="flex flex-col items-center space-y-2 flex-1">
//               <div className="flex items-end justify-center space-x-1 w-full">
//                 {/* Active */}
//                 <div
//                   className="w-1/4 bg-gradient-to-t from-primary-500 to-primary-400 rounded-t"
//                   style={{ height: `${(chartData.active[index] / maxValue) * chartHeight}px` }}
//                   title={`Active: ${chartData.active[index]}`}
//                 ></div>
//                 {/* Booked */}
//                 <div
//                   className="w-1/4 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
//                   style={{ height: `${(chartData.booked[index] / maxValue) * chartHeight}px` }}
//                   title={`Booked: ${chartData.booked[index]}`}
//                 ></div>
//                 {/* Expired */}
//                 <div
//                   className="w-1/4 bg-gradient-to-t from-red-500 to-red-400 rounded-t"
//                   style={{ height: `${(chartData.expired[index] / maxValue) * chartHeight}px` }}
//                   title={`Expired: ${chartData.expired[index]}`}
//                 ></div>
//               </div>
//               <span className="text-xs text-gray-500">{label}</span>
//             </div>
//           ))}
//         </div>
        
//         {/* Y-axis labels */}
//         <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col justify-between text-xs text-gray-400">
//           <span>{maxValue}</span>
//           <span>{Math.round(maxValue * 0.75)}</span>
//           <span>{Math.round(maxValue * 0.5)}</span>
//           <span>{Math.round(maxValue * 0.25)}</span>
//           <span>0</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AlertChart;

import React from 'react';

const AlertChart = ({ alerts }) => {
  // Process alerts data for the last 30 days grouped by weeks
  const processAlertData = () => {
    const now = new Date();
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(now.getDate() - 28); // 4 weeks * 7 days = 28 days
    
    const weekLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const weeklyActive = [0, 0, 0, 0];
    const weeklyBooked = [0, 0, 0, 0];
    const weeklyExpired = [0, 0, 0, 0];
    
    // Initialize weekly date ranges
    const weekRanges = [];
    for (let i = 0; i < 4; i++) {
      const start = new Date(fourWeeksAgo);
      start.setDate(start.getDate() + (i * 7));
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      weekRanges.push({ start, end });
    }
    
    // Count alerts per week
    alerts.forEach(alert => {
      const alertDate = new Date(alert.createdAt);
      
      for (let i = 0; i < 4; i++) {
        if (alertDate >= weekRanges[i].start && alertDate <= weekRanges[i].end) {
          if (alert.status === 'Active') {
            weeklyActive[i]++;
          } else if (alert.status === 'Booked') {
            weeklyBooked[i]++;
          } else if (alert.status === 'Expired') {
            weeklyExpired[i]++;
          }
          break;
        }
      }
    });
    
    return {
      labels: weekLabels,
      active: weeklyActive,
      booked: weeklyBooked,
      expired: weeklyExpired,
    };
  };

  const chartData = processAlertData();
  const maxValue = Math.max(...chartData.active, ...chartData.booked, ...chartData.expired);
  const chartHeight = 150;

  // If no alerts, show placeholder
  if (alerts.length === 0) {
    return (
      <div className="space-y-4 h-full flex flex-col items-center justify-center">
        <div className="text-gray-400 text-sm">No alert data available</div>
        <div className="text-xs text-gray-500">Create alerts to see trends</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex items-center space-x-4 text-xs">
        <div className="flex items-center space-x-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-primary-500"></div>
          <span className="text-gray-600">Active</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
          <span className="text-gray-600">Booked</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
          <span className="text-gray-600">Expired</span>
        </div>
      </div>

      {/* Chart Bars */}
      <div className="relative h-40">
        <div className="flex items-end justify-between h-full px-4 pb-8">
          {chartData.labels.map((label, index) => (
            <div key={label} className="flex flex-col items-center space-y-2 flex-1">
              <div className="flex items-end justify-center space-x-1 w-full">
                {/* Active */}
                <div
                  className="w-1/4 bg-gradient-to-t from-primary-500 to-primary-400 rounded-t"
                  style={{ 
                    height: `${chartData.active[index] > 0 ? (chartData.active[index] / maxValue) * chartHeight : 2}px`,
                    minHeight: '2px'
                  }}
                  title={`Active: ${chartData.active[index]}`}
                >
                  <div className="text-[10px] text-white text-center opacity-0 hover:opacity-100 transition-opacity">
                    {chartData.active[index]}
                  </div>
                </div>
                {/* Booked */}
                <div
                  className="w-1/4 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                  style={{ 
                    height: `${chartData.booked[index] > 0 ? (chartData.booked[index] / maxValue) * chartHeight : 2}px`,
                    minHeight: '2px'
                  }}
                  title={`Booked: ${chartData.booked[index]}`}
                >
                  <div className="text-[10px] text-white text-center opacity-0 hover:opacity-100 transition-opacity">
                    {chartData.booked[index]}
                  </div>
                </div>
                {/* Expired */}
                <div
                  className="w-1/4 bg-gradient-to-t from-red-500 to-red-400 rounded-t"
                  style={{ 
                    height: `${chartData.expired[index] > 0 ? (chartData.expired[index] / maxValue) * chartHeight : 2}px`,
                    minHeight: '2px'
                  }}
                  title={`Expired: ${chartData.expired[index]}`}
                >
                  <div className="text-[10px] text-white text-center opacity-0 hover:opacity-100 transition-opacity">
                    {chartData.expired[index]}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col justify-between text-xs text-gray-400">
          <span>{maxValue}</span>
          <span>{Math.round(maxValue * 0.75)}</span>
          <span>{Math.round(maxValue * 0.5)}</span>
          <span>{Math.round(maxValue * 0.25)}</span>
          <span>0</span>
        </div>

        {/* Grid lines */}
        <div className="absolute left-6 right-0 top-0 bottom-8 -z-10">
          {[0, 0.25, 0.5, 0.75, 1].map((percent, index) => (
            <div
              key={index}
              className="absolute left-0 right-0 border-t border-gray-100"
              style={{ bottom: `${percent * chartHeight}px` }}
            />
          ))}
        </div>
      </div>

      {/* Week dates info */}
      <div className="text-xs text-gray-500 text-center">
        Last 30 days overview
      </div>
    </div>
  );
};

export default AlertChart;