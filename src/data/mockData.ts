/**
 * אתגר 49 - נתונים לדוגמה
 * קובץ זה מכיל נתונים מדומים עבור פיתוח ובדיקות
 * במציאות, נתונים אלה יגיעו מהשרת
 */

// אתגר יומי
export interface Challenge {
  id: string;
  title: string;
  description: string;
  weekNumber: number; // 1-7
  dayNumber: number; // 1-7
  date: string;
  completed?: boolean;
}

// יום השלם
export interface CompletedDay {
  id: string;
  weekNumber: number;
  dayNumber: number;
  completed: boolean;
}

// עדות משתמש
export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  text: string;
  weekCompleted: number;
}

// נתוני מוק לפיתוח
export function getDummyData() {
  // חישוב השבוע והיום הנוכחי (בדוגמה זו - שבוע 3, יום 5)
  const currentWeek = 3;
  const currentDay = 5;
  
  // אתגר היום
  const todayChallenge: Challenge = {
    id: `${currentWeek}-${currentDay}`,
    title: 'שיתוף פעולה מאוזן',
    description: 'התמקדו היום באיזון שבין עזרה לאחרים לבין הצבת גבולות. שתפו פעולה עם אחרים אך תוך שמירה על צרכיכם האישיים.',
    weekNumber: currentWeek,
    dayNumber: currentDay,
    date: '2025-03-12',
    completed: false
  };
  
  // ימים שהושלמו בעבר
  const completedDays: CompletedDay[] = [
    { id: '1-1', weekNumber: 1, dayNumber: 1, completed: true },
    { id: '1-2', weekNumber: 1, dayNumber: 2, completed: true },
    { id: '1-3', weekNumber: 1, dayNumber: 3, completed: true },
    { id: '1-4', weekNumber: 1, dayNumber: 4, completed: true },
    { id: '1-5', weekNumber: 1, dayNumber: 5, completed: true },
    { id: '1-6', weekNumber: 1, dayNumber: 6, completed: true },
    { id: '1-7', weekNumber: 1, dayNumber: 7, completed: true },
    { id: '2-1', weekNumber: 2, dayNumber: 1, completed: true },
    { id: '2-2', weekNumber: 2, dayNumber: 2, completed: true },
    { id: '2-3', weekNumber: 2, dayNumber: 3, completed: true },
    { id: '2-4', weekNumber: 2, dayNumber: 4, completed: true },
    { id: '2-5', weekNumber: 2, dayNumber: 5, completed: true },
    { id: '2-6', weekNumber: 2, dayNumber: 6, completed: true },
    { id: '2-7', weekNumber: 2, dayNumber: 7, completed: true },
    { id: '3-1', weekNumber: 3, dayNumber: 1, completed: true },
    { id: '3-2', weekNumber: 3, dayNumber: 2, completed: true },
    { id: '3-3', weekNumber: 3, dayNumber: 3, completed: true },
    { id: '3-4', weekNumber: 3, dayNumber: 4, completed: true },
  ];
  
  // עדויות משתמשים
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'מיכל לוי',
      role: 'מורה בבית ספר יסודי',
      text: 'אתגר 49 שינה לחלוטין את הגישה שלי לעבודה עם תלמידים. למדתי לאזן בין גבולות ברורים לבין חמלה וחסד, והתוצאות מדהימות. אני מרגישה שהכיתה שלי הפכה למקום יותר רגוע ופורה.',
      weekCompleted: 7
    },
    {
      id: '2',
      name: 'יוסי כהן',
      role: 'מנהל חברת סטארט-אפ',
      text: 'התחלתי את המסע הזה מתוך סקרנות, אבל מהר מאוד הבנתי כמה הכלים שמציע אתגר 49 רלוונטיים לניהול והובלת צוות. ההבנה של שבעת המידות עזרה לי לפתח סגנון ניהול מאוזן יותר.',
      weekCompleted: 5
    },
    {
      id: '3',
      name: 'רונית אברהם',
      text: 'בתור אמא לשלושה, תמיד הרגשתי שאני רצה ממשימה למשימה בלי רגע של נשימה. האתגרים היומיים עזרו לי להטמיע רגעים של מודעות ונוכחות בתוך השגרה העמוסה שלי. אני מרגישה הרבה יותר נוכחת עם הילדים שלי.',
      weekCompleted: 4
    },
    {
      id: '4',
      name: 'אבי נחמיאס',
      role: 'מרצה לפילוסופיה',
      text: 'הייתי סקפטי בהתחלה לגבי הרעיון של לקחת רעיונות קבליים ולהפוך אותם למשהו יומיומי ופרקטי. אבל התהליך הפתיע אותי לטובה. הפשטות של האתגרים היומיים מאפשרת לחוות רעיונות עמוקים בצורה מוחשית.',
      weekCompleted: 7
    }
  ];
  
  return {
    currentWeek,
    currentDay,
    todayChallenge,
    completedDays,
    participantsCount: 8574,
    completedChallengesCount: 124863,
    testimonials
  };
}

// מילות מפתח לשבעת השבועות
export const weekKeywords = {
  1: ['חסד', 'נתינה', 'אהבה', 'חמלה', 'רחמים', 'נדיבות', 'טוב לב'],
  2: ['גבורה', 'דין', 'גבולות', 'משמעת', 'ריסון', 'עוצמה', 'כח רצון'],
  3: ['תפארת', 'אמת', 'הרמוניה', 'איזון', 'יופי', 'רחמים', 'אמת'],
  4: ['נצח', 'ניצחון', 'עקביות', 'התמדה', 'סבלנות', 'נחישות', 'אמביציה'],
  5: ['הוד', 'הדר', 'ענווה', 'צניעות', 'אותנטיות', 'כנות', 'הכרת תודה'],
  6: ['יסוד', 'חיבור', 'תקשורת', 'מיניות', 'אינטימיות', 'ברית', 'יצירתיות'],
  7: ['מלכות', 'מנהיגות', 'ריבונות', 'אחריות', 'פעולה', 'הגשמה', 'משמעות']
};

// תיאורי שבועות
export const weekDescriptions = {
  1: 'שבוע חסד - מתמקד בנתינה, אהבה וחמלה ללא תנאי. בשבוע זה נלמד כיצד להעניק לעצמנו ולאחרים ללא ציפייה לתמורה.',
  2: 'שבוע גבורה - מתמקד בהצבת גבולות בריאים, משמעת עצמית וריסון. נלמד לאזן בין נתינה לבין שמירה על עצמנו.',
  3: 'שבוע תפארת - מתמקד באיזון, הרמוניה ואמת. בשבוע זה נחפש את דרך האמצע ואת היופי שבאיזון בין הקצוות.',
  4: 'שבוע נצח - מתמקד בנחישות, התמדה וניצחון על אתגרים. נלמד את כוחה של עקביות והתמדה לאורך זמן.',
  5: 'שבוע הוד - מתמקד בענווה, הכרת תודה והדר פנימי. נגלה את העוצמה שבצניעות ובהכרת הערך האמיתי שלנו.',
  6: 'שבוע יסוד - מתמקד בחיבור, ביסוס יחסים ובניית אמון. נלמד ליצור קשרים עמוקים ומשמעותיים.',
  7: 'שבוע מלכות - מתמקד במנהיגות, אחריות והגשמה. בשבוע זה נאסוף את כל הלימוד מהשבועות הקודמים ליצירת חיים של משמעות ותכלית.'
};
