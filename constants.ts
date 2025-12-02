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

export const DASHBOARD_DATA = {
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