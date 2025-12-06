export const COLORS = {
  blue: '#3b82f6',
  green: '#22c55e',
  red: '#ef4444',
  yellow: '#eab308',
  purple: '#a855f7',
  orange: '#f97316',
  pink: '#ec4899',
  teal: '#14b8a6',
  bgBlue: 'rgba(59, 130, 246, 0.8)',
  bgGreen: 'rgba(34, 197, 94, 0.8)',
  bgRed: 'rgba(239, 68, 68, 0.8)',
  bgYellow: 'rgba(234, 179, 8, 0.8)',
  bgPurple: 'rgba(168, 85, 247, 0.8)',
  bgOrange: 'rgba(249, 115, 22, 0.8)',
  bgPink: 'rgba(236, 72, 153, 0.8)',
  bgTeal: 'rgba(20, 184, 166, 0.8)'
};

export const STATUS_COLORS: Record<string, string> = {
  'Done': COLORS.green,
  'Cancelled': COLORS.red,
  'Closed': COLORS.blue,
  'Postpone': COLORS.yellow,
  'New': COLORS.purple,
  'Change Team': COLORS.orange,
  'Re-Open': COLORS.pink
};

export const PERIOD_OPTIONS = [
  { value: 'current', label: 'October 1 – November 19, 2024' },
  { value: 'jan-2025', label: 'January 2025' },
  { value: 'feb-2025', label: 'February 2025' },
  { value: 'mar-2025', label: 'March 2025' },
  { value: 'apr-2025', label: 'April 2025' },
  { value: 'may-2025', label: 'May 2025' },
  { value: 'jun-2025', label: 'June 2025' },
  { value: 'jul-2025', label: 'July 2025' },
  { value: 'aug-2025', label: 'August 2025' },
  { value: 'sep-2025', label: 'September 2025' },
  { value: 'oct-2025', label: 'October 2025' },
  { value: 'nov-2025', label: 'November 2025' },
];

const BASE_DATA = {
    "overall_sla_compliance": 64.45,
    "total_ticket_analysis": {
        "Cancelled": {"total_tickets": 4275, "total_duration": 107385.8, "avg_duration": 25.1, "sla_compliance": 44.0},
        "Change Team": {"total_tickets": 6, "total_duration": 189.2, "avg_duration": 31.5, "sla_compliance": 33.3},
        "Closed": {"total_tickets": 646, "total_duration": 13808.6, "avg_duration": 21.4, "sla_compliance": 60.5},
        "Done": {"total_tickets": 6468, "total_duration": 69440.4, "avg_duration": 10.7, "sla_compliance": 77.6},
        "New": {"total_tickets": 3, "total_duration": 0.0, "avg_duration": 0.0, "sla_compliance": 100.0},
        "Postpone": {"total_tickets": 372, "total_duration": 3511.1, "avg_duration": 9.4, "sla_compliance": 80.1},
        "Re-Open": {"total_tickets": 2, "total_duration": 154.8, "avg_duration": 77.4, "sla_compliance": 0.0}
    },
    "mr_top": [
        {"name": "همام ستار حسين", "sla_compliance": 100.0},
        {"name": "حيدر محمد عيسى", "sla_compliance": 100.0},
        {"name": "محمد خلف زرزور", "sla_compliance": 100.0}
    ],
    "mr_bottom": [
        {"name": "جاسم رشيد حميد", "sla_compliance": 0.0},
        {"name": "علي هاشم حسن", "sla_compliance": 0.0},
        {"name": "احمد هيثم عبد الرحمن", "sla_compliance": 0.0}
    ],
    "team_leader_top": [
        {"name": "ابراهيم علي حسون", "sla_compliance": 80.5},
        {"name": "امير عبد الرحمن زيدان", "sla_compliance": 79.6},
        {"name": "احمد هيثم عبد الرحمن", "sla_compliance": 79.1}
    ],
    "team_leader_bottom": [
        {"name": "سارة عقيل هادي", "sla_compliance": 63.6},
        {"name": "طه خيري عبد", "sla_compliance": 57.7},
        {"name": "غيث محمد جمعة", "sla_compliance": 0.0}
    ],
    "detailed_team_leader": {
        "ابراهيم علي حسون": {
            "Done": {"ticket_count": 1306, "total_duration": 12170.0, "sla_compliance": 80.6},
            "Postpone": {"ticket_count": 2, "total_duration": 195.7, "sla_compliance": 100.0}
        },
        "احمد هيثم عبد الرحمن": {
            "Cancelled": {"ticket_count": 7, "total_duration": 273.9, "sla_compliance": 57.1},
            "Closed": {"ticket_count": 1, "total_duration": 0.2, "sla_compliance": 100.0},
            "Done": {"ticket_count": 934, "total_duration": 9323.7, "sla_compliance": 79.2},
            "Postpone": {"ticket_count": 1, "total_duration": 3.6, "sla_compliance": 100.0}
        },
        "اريج فايز صكبان": {
            "Done": {"ticket_count": 65, "total_duration": 504.8, "sla_compliance": 76.9}
        },
        "امير عبد الرحمن زيدان": {
            "Cancelled": {"ticket_count": 2, "total_duration": 2.6, "sla_compliance": 100.0},
            "Closed": {"ticket_count": 1, "total_duration": 9.1, "sla_compliance": 0.0},
            "Done": {"ticket_count": 980, "total_duration": 10142.1, "sla_compliance": 79.6}
        },
        "بهاء حسين عطية": {
            "Cancelled": {"ticket_count": 1, "total_duration": 25.2, "sla_compliance": 0.0},
            "Done": {"ticket_count": 238, "total_duration": 4090.9, "sla_compliance": 65.5}
        },
        "سارة عقيل هادي": {
            "Done": {"ticket_count": 11, "total_duration": 174.7, "sla_compliance": 63.6}
        },
        "طه خيري عبد": {
            "Cancelled": {"ticket_count": 20, "total_duration": 1255.7, "sla_compliance": 5.0},
            "Closed": {"ticket_count": 15, "total_duration": 486.2, "sla_compliance": 33.3},
            "Done": {"ticket_count": 44, "total_duration": 404.2, "sla_compliance": 75.0},
            "New": {"ticket_count": 3, "total_duration": 0.0, "sla_compliance": 100.0},
            "Postpone": {"ticket_count": 14, "total_duration": 3.4, "sla_compliance": 100.0},
            "Re-Open": {"ticket_count": 1, "total_duration": 90.4, "sla_compliance": 0.0}
        },
        "غيث محمد جمعة": {
            "Done": {"ticket_count": 1, "total_duration": 44.3, "sla_compliance": 0.0}
        },
        "محمد اسماعيل ياسين": {
            "Done": {"ticket_count": 75, "total_duration": 896.1, "sla_compliance": 76.0}
        },
        "محمد عدنان نوري": {
            "Cancelled": {"ticket_count": 6, "total_duration": 83.3, "sla_compliance": 50.0},
            "Closed": {"ticket_count": 1, "total_duration": 35.7, "sla_compliance": 0.0},
            "Done": {"ticket_count": 1430, "total_duration": 14026.3, "sla_compliance": 79.0}
        },
        "مصطفى تحسين علي": {
            "Cancelled": {"ticket_count": 3, "total_duration": 45.8, "sla_compliance": 66.7},
            "Done": {"ticket_count": 414, "total_duration": 6489.2, "sla_compliance": 68.1}
        }
    }
};

// Helper function to generate randomized data based on a string seed (the period)
const randomizeData = (baseData: any, seed: string): any => {
    // Simple hash function to get consistent random numbers for the same seed
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash |= 0;
    }
    const pseudoRandom = () => {
        hash = (hash * 9301 + 49297) % 233280;
        return hash / 233280;
    };

    // Current data covers approx 50 days (Oct 1 - Nov 19).
    // A single month is approx 30 days.
    // So valid data should be roughly 60% (0.6) of the current base.
    // We will randomize the volume scaling factor between 0.5 and 0.65.
    const globalVolumeScale = 0.5 + (pseudoRandom() * 0.15);
    
    // Deep clone the base data
    const newData = JSON.parse(JSON.stringify(baseData));

    // Helper to get variance
    const getVariance = (range: number = 0.2) => (1 - (range/2)) + (pseudoRandom() * range);

    // Randomize top-level SLA (can vary up or down, but kept realistic)
    newData.overall_sla_compliance = Math.min(100, Math.max(40, newData.overall_sla_compliance * getVariance(0.3)));

    // Randomize ticket analysis
    Object.keys(newData.total_ticket_analysis).forEach(key => {
        const item = newData.total_ticket_analysis[key];
        // Apply global volume scale + small individual variance
        const itemScale = globalVolumeScale * getVariance(0.2);

        item.total_tickets = Math.round(Math.max(0, item.total_tickets * itemScale));
        
        // Duration roughly follows tickets, but avg duration might shift
        const avgDurationVariance = getVariance(0.2);
        if (item.total_tickets > 0) {
            item.avg_duration = item.avg_duration * avgDurationVariance;
            item.total_duration = item.total_tickets * item.avg_duration;
        } else {
            item.total_duration = 0;
            item.avg_duration = 0;
        }

        item.sla_compliance = Math.min(100, Math.max(0, item.sla_compliance * getVariance(0.25)));
    });

    // Function to randomize SLA list
    const randomizeSlaList = (list: any[]) => {
        list.forEach(item => {
            item.sla_compliance = Math.min(100, Math.max(0, item.sla_compliance * getVariance(0.25)));
        });
    };

    randomizeSlaList(newData.mr_top);
    randomizeSlaList(newData.mr_bottom);
    randomizeSlaList(newData.team_leader_top);
    randomizeSlaList(newData.team_leader_bottom);

    // Randomize Detailed Team Leader
    Object.keys(newData.detailed_team_leader).forEach(leaderKey => {
        const leader = newData.detailed_team_leader[leaderKey];
        Object.keys(leader).forEach(statusKey => {
            const status = leader[statusKey];
            const itemScale = globalVolumeScale * getVariance(0.2);

            status.ticket_count = Math.round(Math.max(0, status.ticket_count * itemScale));
            status.total_duration = status.total_duration * itemScale; // Scale duration similar to ticket count
            status.sla_compliance = Math.min(100, Math.max(0, status.sla_compliance * getVariance(0.25)));
        });
    });

    return newData;
};

export const getDashboardDataForPeriod = (period: string) => {
    if (period === 'current') {
        return BASE_DATA;
    }
    return randomizeData(BASE_DATA, period);
};

export const DASHBOARD_DATA = BASE_DATA; // Export base data for initial load if needed
