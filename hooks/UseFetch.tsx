import { useEffect, useState } from 'react';

interface UseFetchProps {
  url: string;
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useFetch = <T,>({ url }: UseFetchProps): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;