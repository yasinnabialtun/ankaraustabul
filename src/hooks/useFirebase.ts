import { useState, useEffect, useCallback } from 'react';
import {
  getUstalarFromFirestore,
  getUstaById,
  addUstaToFirestore,
  updateUstaInFirestore,
  deleteUstaFromFirestore,
  getUstalarByCategory,
  getUstalarByDistrict,
  searchUstalar,
  getPremiumUstalar,
  getStatistics
} from '@/services/firebase';
import type { Usta, PaginatedQuery } from '@/types';
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

interface FirebaseHookState {
  loading: boolean;
  error: string | null;
}

interface UstalarState extends FirebaseHookState {
  ustalar: Usta[];
  hasMore: boolean;
  lastDoc: any;
}

export const useUstalar = (initialLimit: number = 10) => {
  const [state, setState] = useState<UstalarState>({
    ustalar: [],
    hasMore: false,
    lastDoc: null,
    loading: true,
    error: null
  });

  const loadUstalar = useCallback(async (limit = initialLimit, lastDoc?: QueryDocumentSnapshot<DocumentData>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result: PaginatedQuery = await getUstalarFromFirestore(limit, lastDoc);
      setState(prev => ({
        ustalar: lastDoc ? [...prev.ustalar, ...result.data] : result.data,
        hasMore: result.hasMore,
        lastDoc: result.lastDoc,
        loading: false,
        error: null
      }));
    } catch (error) {
      console.error('Error loading ustalar:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load ustalar'
      }));
    }
  }, [initialLimit]);

  const loadMore = useCallback(() => {
    if (state.hasMore && state.lastDoc) {
      loadUstalar(initialLimit, state.lastDoc);
    }
  }, [state.hasMore, state.lastDoc, loadUstalar, initialLimit]);

  useEffect(() => {
    loadUstalar();
  }, [loadUstalar]);

  return {
    ...state,
    loadUstalar,
    loadMore,
    refresh: () => loadUstalar()
  };
};

export const useUsta = (ustaId: string | null) => {
  const [usta, setUsta] = useState<Usta | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ustaId) return;

    const fetchUsta = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await getUstaById(ustaId);
        setUsta(result);
      } catch (err) {
        console.error('Error fetching usta:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch usta');
      } finally {
        setLoading(false);
      }
    };

    fetchUsta();
  }, [ustaId]);

  return { usta, loading, error };
};

export const useUstalarByCategory = (categoryId: string | null, limit: number = 20) => {
  const [ustalar, setUstalar] = useState<Usta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) return;

    const fetchUstalar = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await getUstalarByCategory(categoryId, limit);
        setUstalar(result);
      } catch (err) {
        console.error('Error fetching ustalar by category:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch ustalar');
      } finally {
        setLoading(false);
      }
    };

    fetchUstalar();
  }, [categoryId, limit]);

  return { ustalar, loading, error };
};

export const useUstalarByDistrict = (districtId: string | null, limit: number = 20) => {
  const [ustalar, setUstalar] = useState<Usta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!districtId) return;

    const fetchUstalar = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await getUstalarByDistrict(districtId, limit);
        setUstalar(result);
      } catch (err) {
        console.error('Error fetching ustalar by district:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch ustalar');
      } finally {
        setLoading(false);
      }
    };

    fetchUstalar();
  }, [districtId, limit]);

  return { ustalar, loading, error };
};

export const usePremiumUstalar = (limit: number = 10) => {
  const [ustalar, setUstalar] = useState<Usta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPremiumUstalar = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await getPremiumUstalar(limit);
        setUstalar(result);
      } catch (err) {
        console.error('Error fetching premium ustalar:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch premium ustalar');
      } finally {
        setLoading(false);
      }
    };

    fetchPremiumUstalar();
  }, [limit]);

  return { ustalar, loading, error };
};

export const useSearchUstalar = () => {
  const [ustalar, setUstalar] = useState<Usta[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (searchTerm: string, categoryId?: string, districtId?: string, limit: number = 20) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await searchUstalar(searchTerm, limit);
      setUstalar(result);
    } catch (err) {
      console.error('Error searching ustalar:', err);
      setError(err instanceof Error ? err.message : 'Failed to search ustalar');
    } finally {
      setLoading(false);
    }
  };

  return { ustalar, loading, error, search };
};

export const useAddUsta = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addUsta = async (ustaData: Omit<Usta, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await addUstaToFirestore(ustaData);
      return result;
    } catch (err) {
      console.error('Error adding usta:', err);
      setError(err instanceof Error ? err.message : 'Failed to add usta');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addUsta, loading, error };
};

export const useUpdateUsta = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateUsta = async (ustaId: string, updateData: Partial<Usta>) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await updateUstaInFirestore(ustaId, updateData);
      return result;
    } catch (err) {
      console.error('Error updating usta:', err);
      setError(err instanceof Error ? err.message : 'Failed to update usta');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateUsta, loading, error };
};

export const useDeleteUsta = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUsta = async (ustaId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await deleteUstaFromFirestore(ustaId);
      return result;
    } catch (err) {
      console.error('Error deleting usta:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete usta');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteUsta, loading, error };
};

export const useStatistics = () => {
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await getStatistics();
        setStatistics(result);
      } catch (err) {
        console.error('Error fetching statistics:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return { statistics, loading, error };
};