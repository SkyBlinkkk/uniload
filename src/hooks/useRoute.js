import { useEffect, useState } from 'react';

export function navigate(route) {
  window.location.hash = route;
}

export default function useRoute() {
  const readRoute = () => window.location.hash.slice(1) || 'home';
  const [route, setRoute] = useState(readRoute);
  useEffect(() => {
    const update = () => setRoute(readRoute());
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  return route;
}
