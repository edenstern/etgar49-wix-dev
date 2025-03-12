/**
 * אתגר 49 - קובץ תמה
 * מגדיר את מערכת הצבעים, הטיפוגרפיה והעיצוב הכולל של האתר
 */

export const colors = {
  // צבעי השבועות - מבוססים על הטבע הישראלי בין פסח לשבועות
  weeks: {
    // שבוע 1 - חסד: ירוק אביבי עמוק, כמו הכרמל אחרי הגשמים
    week1: {
      primary: '#4DAA57',
      secondary: '#85FFB0',
      background: '#F2F9F4',
      glow: 'rgba(77, 170, 87, 0.2)',
    },
    // שבוע 2 - גבורה: ירוק-טורקיז, כמו מי המעיינות באביב
    week2: {
      primary: '#6EC1A0',
      secondary: '#A0EDFF',
      background: '#F3FBFA',
      glow: 'rgba(110, 193, 160, 0.2)',
    },
    // שבוע 3 - תפארת: כחול בהיר, כשמי האביב הישראליים
    week3: {
      primary: '#5AA9DB',
      secondary: '#B6E0FF',
      background: '#F2F8FC',
      glow: 'rgba(90, 169, 219, 0.2)',
    },
    // שבוע 4 - נצח: סגול עדין, כפריחת הרקפות והכלניות
    week4: {
      primary: '#A97FB1',
      secondary: '#E5C2FF',
      background: '#F9F5FA',
      glow: 'rgba(169, 127, 177, 0.2)',
    },
    // שבוע 5 - הוד: אדום-ורוד, כפריחת הכלניות והנוריות בשפלה
    week5: {
      primary: '#E17A7A',
      secondary: '#FFB3B3',
      background: '#FDF6F6',
      glow: 'rgba(225, 122, 122, 0.2)',
    },
    // שבוע 6 - יסוד: כתום-חום, כשדות החיטה המתחילים להבשיל
    week6: {
      primary: '#E9A55D',
      secondary: '#FFD7A8',
      background: '#FDF9F3',
      glow: 'rgba(233, 165, 93, 0.2)',
    },
    // שבוע 7 - מלכות: זהב-צהוב, כשדות החיטה המוכנים לקציר בשבועות
    week7: {
      primary: '#F2CB45',
      secondary: '#FFF0B2',
      background: '#FEFCF5',
      glow: 'rgba(242, 203, 69, 0.2)',
    },
  },
  
  // צבעי בסיס
  base: {
    white: '#FFFFFF',
    black: '#212121',
    cream: '#F8F3E9',
    darkBlue: '#2B31AD',
    lightBlue: '#BAC9FF',
    purple: '#8B76D1',
    gray: {
      100: '#F8F8F8',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    }
  },
  
  // צבעי ממשק
  ui: {
    primary: '#2B31AD', // הכחול העמוק של אתגר 49
    accent: '#F2CB45', // צהוב-זהב כאקסנט
    border: 'rgba(0, 0, 0, 0.1)',
    error: '#D32F2F',
    success: '#4CAF50',
    info: '#2196F3',
    warning: '#FFC107',
  }
};

export const typography = {
  fontFamily: {
    primary: 'Frank Ruhl Libre, serif', // גופן פרנק רהל לכותרות
    secondary: 'Assistant, sans-serif', // גופן אסיסטנט לטקסט רץ
  },
  fontSize: {
    xs: '14px',
    sm: '16px',
    md: '18px',
    lg: '20px',
    xl: '24px',
    '2xl': '28px',
    '3xl': '32px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '64px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    none: 1,
    tight: 1.2,
    normal: 1.5,
    loose: 1.8,
  },
};

export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
};

export const borderRadius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
};

export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.04)',
  glow: (color: string) => `0 0 15px ${color}`,
};

export const animations = {
  transition: {
    fast: 'all 0.2s ease',
    default: 'all 0.3s ease',
    slow: 'all 0.5s ease',
  },
  keyframes: {
    pulse: `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
    `,
    fadeIn: `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `,
    scaleIn: `
      @keyframes scaleIn {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
    `,
    float: `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
    `,
  },
};

const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
};

export default theme;
