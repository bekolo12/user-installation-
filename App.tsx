import React, { useEffect, useState, useMemo } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Legend, CartesianGrid
} from 'recharts';
import { getDashboardDataForPeriod, STATUS_COLORS, COLORS, PERIOD_OPTIONS } from './constants';

const formatNumber = (num: number) => num.toLocaleString();

const Gauge = ({ value }: { value: number }) => {
  const [rotation, setRotation] = useState(-90);

  useEffect(() => {
    // Reset rotation first to animate from start when value changes
    setRotation(-90);
    const timeout = setTimeout(() => {
      setRotation(-90 + (value / 100 * 180));
    }, 100);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="flex justify-center">
      <div className="relative w-[200px] h-[100px] overflow-hidden">
        <div className="absolute w-[200px] h-[100px] rounded-t-[100px] bg-gray-200"></div>
        <div 
          className="absolute w-[200px] h-[100px] rounded-t-[100px]"
          style={{
             background: 'linear-gradient(90deg, #ef4444, #f59e0b, #22c55e)',
             transformOrigin: 'center bottom',
             clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)' 
          }}
        ></div>
        <div className="absolute w-[160px] h-[80px] bg-white rounded-t-[80px] top-[20px] left-[20px] flex items-end justify-center pb-2">
           <span className="text-3xl font-bold text-gray-800">{value.toFixed(1)}%</span>
        </div>
        <div 
          className="absolute w-[4px] h-[70px] bg-gray-800 left-[98px] bottom-0 rounded-[2px]"
          style={{
            transformOrigin: 'bottom center',
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 1.5s ease-out'
          }}
        ></div>
      </div>
    </div>
  );
};

const App = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const currentData = useMemo(() => {
    return getDashboardDataForPeriod(selectedPeriod);
  }, [selectedPeriod]);

  // Data Transformations must be re-calculated when currentData changes
  const ticketDistData = useMemo(() => Object.entries(currentData.total_ticket_analysis).map(([name, val]: [string, any]) => ({
    name,
    value: val.total_tickets
  })), [currentData]);

  const slaByStatusData = useMemo(() => Object.entries(currentData.total_ticket_analysis).map(([name, val]: [string, any]) => ({
    name,
    value: parseFloat(val.sla_compliance.toFixed(1))
  })), [currentData]);

  const durationData = useMemo(() => Object.entries(currentData.total_ticket_analysis).map(([name, val]: [string, any]) => ({
    name,
    value: Math.round(val.total_duration)
  })), [currentData]);

  const avgDurationData = useMemo(() => Object.entries(currentData.total_ticket_analysis).map(([name, val]: [string, any]) => ({
    name,
    value: parseFloat(val.avg_duration.toFixed(1))
  })), [currentData]);

  const allTeamLeaders = useMemo(() => [...currentData.team_leader_top, ...currentData.team_leader_bottom], [currentData]);

  // Prepare detailed team leader data for stacked/grouped charts
  const { detailedSlaData, ticketCountData, leaderDurationData } = useMemo(() => {
    const detailedLeaders = Object.keys(currentData.detailed_team_leader);
    const statuses = ['Done', 'Cancelled', 'Closed', 'Postpone', 'New', 'Re-Open'];

    const detailedSlaData = detailedLeaders.map(leader => {
        const item: any = { name: leader };
        // @ts-ignore
        const leaderData = currentData.detailed_team_leader[leader];
        statuses.forEach(status => {
            item[status] = parseFloat((leaderData[status]?.sla_compliance || 0).toFixed(1));
        });
        return item;
    });

    const ticketCountData = detailedLeaders.map(leader => {
        const item: any = { name: leader };
        // @ts-ignore
        const leaderData = currentData.detailed_team_leader[leader];
        statuses.forEach(status => {
            item[status] = leaderData[status]?.ticket_count || 0;
        });
        return item;
    });

    const leaderDurationData = detailedLeaders.map(leader => {
        // @ts-ignore
        const leaderData = currentData.detailed_team_leader[leader];
        const total = (Object.values(leaderData) as any[]).reduce((sum: number, curr: any) => sum + curr.total_duration, 0);
        return { name: leader, value: Math.round(total) };
    });

    return { detailedSlaData, ticketCountData, leaderDurationData };
  }, [currentData]);

  const totalTickets = useMemo(() => 
    Object.values(currentData.total_ticket_analysis).reduce((sum: number, item: any) => sum + item.total_tickets, 0), 
  [currentData]);

  const completedTickets = currentData.total_ticket_analysis['Done']?.total_tickets || 0;
  const cancelledTickets = currentData.total_ticket_analysis['Cancelled']?.total_tickets || 0;
  const statuses = ['Done', 'Cancelled', 'Closed', 'Postpone', 'New', 'Re-Open'];

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)' }}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header with Dropdown */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 animate-[fadeIn_0.6s_ease-out_forwards]">
            <div className="text-center md:text-left mb-4 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">📊 SLA Performance Dashboard</h1>
                <h2 className="text-xl md:text-2xl font-semibold text-blue-100 mb-2">User Installation Report</h2>
                <p className="text-blue-300 text-sm mt-1">Comprehensive Service Level Agreement Compliance Analysis</p>
            </div>
            
            <div className="w-full md:w-auto">
                <select 
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full md:w-64 p-3 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium cursor-pointer hover:bg-white/20 transition-colors"
                >
                    {PERIOD_OPTIONS.map(option => (
                        <option key={option.value} value={option.value} className="text-gray-800 bg-white">
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="text-right text-blue-200 text-xs mt-2 px-1">
                    Select a reporting period
                </div>
            </div>
        </div>

        {/* Overall SLA & Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-[fadeIn_0.6s_ease-out_forwards]">
                <h3 className="text-gray-600 text-sm font-medium mb-4 text-center">Overall Compliance Rate</h3>
                <Gauge value={currentData.overall_sla_compliance} />
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-[fadeIn_0.6s_ease-out_forwards] flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">Total Tickets</p>
                    <p className="text-3xl font-bold text-gray-800">{totalTickets.toLocaleString()}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-xl">
                    <span className="text-3xl">🎫</span>
                </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-[fadeIn_0.6s_ease-out_forwards] flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">Completed Tickets</p>
                    <p className="text-3xl font-bold text-green-600">{completedTickets.toLocaleString()}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-xl">
                    <span className="text-3xl">✅</span>
                </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-[fadeIn_0.6s_ease-out_forwards] flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">Cancelled Tickets</p>
                    <p className="text-3xl font-bold text-red-600">{cancelledTickets.toLocaleString()}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-xl">
                    <span className="text-3xl">❌</span>
                </div>
            </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-[fadeIn_0.6s_ease-out_forwards]">
                <h3 className="text-lg font-bold text-gray-800 mb-4">📈 Ticket Status Distribution</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ticketDistData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {ticketDistData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val) => val.toLocaleString()} />
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-[fadeIn_0.6s_ease-out_forwards]">
                <h3 className="text-lg font-bold text-gray-800 mb-4">📊 SLA Compliance by Status</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={slaByStatusData} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                      <Tooltip formatter={(val: number) => `${val}%`} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                        {slaByStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.value >= 70 ? COLORS.green : entry.value >= 50 ? COLORS.yellow : COLORS.red} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-[fadeIn_0.6s_ease-out_forwards]">
                <h3 className="text-lg font-bold text-gray-800 mb-4">🏆 Top Performers (MR Responsible)</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={currentData.mr_top} margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis dataKey="name" type="category" width={120} tick={{ fontFamily: 'Tajawal' }} />
                      <Tooltip formatter={(val: number) => `${val.toFixed(1)}%`} />
                      <Bar dataKey="sla_compliance" fill={COLORS.green} radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-[fadeIn_0.6s_ease-out_forwards]">
                <h3 className="text-lg font-bold text-gray-800 mb-4">⚠️ Bottom Performers (MR Responsible)</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={currentData.mr_bottom} margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis dataKey="name" type="category" width={120} tick={{ fontFamily: 'Tajawal' }} />
                      <Tooltip formatter={(val: number) => `${val.toFixed(1)}%`} />
                      <Bar dataKey="sla_compliance" fill={COLORS.red} radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Team Leader Performance */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-[fadeIn_0.6s_ease-out_forwards]">
            <h3 className="text-lg font-bold text-gray-800 mb-4">👥 Team Leader Performance</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={allTeamLeaders} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" height={80} tick={{ fontFamily: 'Tajawal', fontSize: 11 }} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(val: number) => `${val.toFixed(1)}%`} />
                  <Bar dataKey="sla_compliance" radius={[4, 4, 0, 0]}>
                    {allTeamLeaders.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.sla_compliance >= 70 ? COLORS.green : entry.sla_compliance >= 50 ? COLORS.yellow : COLORS.red} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
        </div>

        {/* Detailed Team Leader Performance */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-[fadeIn_0.6s_ease-out_forwards]">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Detailed Team Leader Performance by Status</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={detailedSlaData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" height={80} tick={{ fontFamily: 'Tajawal', fontSize: 11 }} />
                  <YAxis domain={[0, 100]} label={{ value: 'Compliance %', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(val: number) => `${val}%`} />
                  <Legend verticalAlign="top" height={36}/>
                  {statuses.map(status => (
                    <Bar key={status} dataKey={status} fill={STATUS_COLORS[status]} radius={[4, 4, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
        </div>

        {/* Ticket Count by Team Leader */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-[fadeIn_0.6s_ease-out_forwards]">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🎟️ Ticket Count by Team Leader & Status</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ticketCountData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" height={80} tick={{ fontFamily: 'Tajawal', fontSize: 11 }} />
                  <YAxis label={{ value: 'Ticket Count', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(val: number) => val.toLocaleString()} />
                  <Legend verticalAlign="top" height={36}/>
                  {statuses.map(status => (
                    <Bar key={status} dataKey={status} stackId="a" fill={STATUS_COLORS[status]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
        </div>

        {/* Duration Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-[fadeIn_0.6s_ease-out_forwards]">
                <h3 className="text-lg font-bold text-gray-800 mb-4">⏱️ Total Duration by Status (Hours)</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={durationData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} />
                      <YAxis />
                      <Tooltip formatter={(val: number) => `${val.toLocaleString()} h`} />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {durationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-[fadeIn_0.6s_ease-out_forwards]">
                <h3 className="text-lg font-bold text-gray-800 mb-4">⏳ Average Duration by Status (Hours)</h3>
                <div className="h-72">
                   <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={avgDurationData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} />
                      <YAxis />
                      <Tooltip formatter={(val: number) => `${val} h`} />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {avgDurationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Duration by Team Leader */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-[fadeIn_0.6s_ease-out_forwards]">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🕐 Total Duration by Team Leader (Hours)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leaderDurationData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" height={80} tick={{ fontFamily: 'Tajawal', fontSize: 11 }} />
                  <YAxis />
                  <Tooltip formatter={(val: number) => `${val.toLocaleString()} h`} />
                  <Bar dataKey="value" fill={COLORS.blue} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
        </div>

        {/* Insights and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-[fadeIn_0.6s_ease-out_forwards]">
                <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Key Insights</h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                        <span className="text-blue-500">📌</span>
                        <span className="text-gray-700">Total tickets across all stages: {totalTickets.toLocaleString()}</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                        <span className="text-green-500">📌</span>
                        <span className="text-gray-700"><span className="arabic-text">محمد عدنان نوري</span> handles the most work (14,026h in Done tickets)</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 bg-red-50 rounded-xl">
                        <span className="text-red-500">📌</span>
                        <span className="text-gray-700">Cancelled tickets consume the most time ({currentData.total_ticket_analysis['Cancelled']?.total_duration.toLocaleString()}h) with {currentData.total_ticket_analysis['Cancelled']?.sla_compliance.toFixed(1)}% SLA compliance</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
                        <span className="text-purple-500">📌</span>
                        <span className="text-gray-700">Done is the largest stage with {currentData.total_ticket_analysis['Done']?.total_tickets.toLocaleString()} tickets</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl">
                        <span className="text-yellow-500">📌</span>
                        <span className="text-gray-700">Re-Open tickets have the worst SLA compliance ({currentData.total_ticket_analysis['Re-Open']?.sla_compliance.toFixed(1)}%)</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 bg-teal-50 rounded-xl">
                        <span className="text-teal-500">📌</span>
                        <span className="text-gray-700">New tickets have high SLA compliance ({currentData.total_ticket_analysis['New']?.sla_compliance.toFixed(1)}%) but few tickets</span>
                    </li>
                </ul>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-[fadeIn_0.6s_ease-out_forwards]">
                <h3 className="text-lg font-bold text-gray-800 mb-4">📝 Recommendations</h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                        <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                        <span className="text-gray-700">Investigate Cancelled tickets ({currentData.total_ticket_analysis['Cancelled']?.total_duration.toLocaleString()}h total)</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                        <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                        <span className="text-gray-700">Review Re-Open tickets to prevent rework</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                        <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                        <span className="text-gray-700">Study Done stage ({currentData.total_ticket_analysis['Done']?.sla_compliance.toFixed(1)}% SLA) for best practices</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                        <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                        <span className="text-gray-700">Balance workload between <span className="arabic-text">محمد عدنان نوري</span> and <span className="arabic-text">ابراهيم علي حسون</span></span>
                    </li>
                    <li className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                        <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</span>
                        <span className="text-gray-700">Address inefficiencies in Cancelled ticket handling across team leaders</span>
                    </li>
                </ul>
            </div>
        </div>

        {/* Summary Table */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-[fadeIn_0.6s_ease-out_forwards]">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📑 Ticket Analysis Summary</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-3 text-left font-semibold text-gray-700 rounded-tl-lg">Status</th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-700">Total Tickets</th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-700">Total Duration (h)</th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-700">Avg Duration (h)</th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-700 rounded-tr-lg">SLA Compliance</th>
                        </tr>
                    </thead>
                    <tbody>
                      {Object.entries(currentData.total_ticket_analysis).map(([status, values]: [string, any], index) => {
                         const slaColor = values.sla_compliance >= 70 ? 'text-green-600 bg-green-100' : 
                                          values.sla_compliance >= 50 ? 'text-yellow-600 bg-yellow-100' : 'text-red-600 bg-red-100';
                         const rowClass = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
                         
                         return (
                          <tr key={status} className={rowClass}>
                              <td className="px-4 py-3 font-medium text-gray-800">{status}</td>
                              <td className="px-4 py-3 text-center text-gray-600">{values.total_tickets.toLocaleString()}</td>
                              <td className="px-4 py-3 text-center text-gray-600">{Math.round(values.total_duration).toLocaleString()}</td>
                              <td className="px-4 py-3 text-center text-gray-600">{values.avg_duration.toFixed(1)}</td>
                              <td className="px-4 py-3 text-center">
                                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${slaColor}`}>{values.sla_compliance.toFixed(1)}%</span>
                              </td>
                          </tr>
                         );
                      })}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Footer */}
        <div className="text-center text-blue-200 text-sm py-4">
            <p>SLA Performance Dashboard | Auto-updated</p>
        </div>
      </div>
      
      {/* Custom Keyframes for fade in */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default App;