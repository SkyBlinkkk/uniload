import { useEffect, useState } from 'react';
import { localDate } from '../domain/urgency.js';

export default function useToday() {
  const [today, setToday] = useState(localDate);

  useEffect(() => {
    const refresh = () => setToday(localDate());
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timer = setTimeout(refresh, midnight.getTime() - now.getTime() + 100);
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, [today]);

  return today;
}
