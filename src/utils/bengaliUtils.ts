export const toBengaliNumber = (num: number | string | undefined | null): string => {
  if (num === undefined || num === null) return '';
  const numStr = String(num);
  const bengaliDigits: Record<string, string> = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
    '.': '.'
  };
  return numStr.replace(/[0-9]/g, (digit) => bengaliDigits[digit] || digit);
};

export const formatBengaliDate = (dateStr?: string): string => {
  if (!dateStr) return '';
  // Check if date is like DD/MM/YYYY or YYYY-MM-DD
  return toBengaliNumber(dateStr);
};

export const getTodayBengaliDate = (): string => {
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  
  const now = new Date();
  const dayName = days[now.getDay()];
  const date = toBengaliNumber(now.getDate());
  const monthName = months[now.getMonth()];
  const year = toBengaliNumber(now.getFullYear());

  return `${dayName}, ${date} ${monthName} ${year}`;
};
