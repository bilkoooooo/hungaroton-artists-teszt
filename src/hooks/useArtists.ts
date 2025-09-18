'use client';

import {useState, useEffect, useCallback} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {ArtistService} from '../services/artistService';
import {Artist, ArtistFilters} from '../types/artist';

export const useArtists = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    // URL paraméterek olvasása
    const getFiltersFromUrl = useCallback((): ArtistFilters => ({
        search: searchParams.get('search') || undefined,
        type: (searchParams.get('type') as ArtistFilters['type']) || undefined,
        letter: searchParams.get('letter') || undefined,
        page: parseInt(searchParams.get('page') || '1'),
        per_page: 50
    }), [searchParams]);

    // URL paraméterek frissítése
    const updateUrl = (filters: Partial<ArtistFilters>) => {
        const params = new URLSearchParams(searchParams);

        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                params.set(key, value.toString());
            } else {
                params.delete(key);
            }
        });

        router.push(`?${params.toString()}`);
    };

    // Adatok betöltése
    const loadArtists = async (filters: ArtistFilters) => {
        try {
            setLoading(true);
            setError(null);

            const response = await ArtistService.getArtists(filters);

            setArtists(response.data);
            setTotalPages(response.last_page);
            setTotalCount(response.total);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    // Szűrők változtatása
    const updateFilters = (newFilters: Partial<ArtistFilters>) => {
        const currentFilters = getFiltersFromUrl();
        const updatedFilters = {...currentFilters, ...newFilters};

        // Ha új szűrőt állítunk be, visszamegyünk az első oldalra
        if (newFilters.search !== undefined || newFilters.type !== undefined || newFilters.letter !== undefined) {
            updatedFilters.page = 1;
        }

        updateUrl(updatedFilters);
    };

    // Oldal váltás
    const changePage = (page: number) => {
        updateFilters({page});
    };

    // Effect: URL változáskor újratöltés
    useEffect(() => {
        const filters = getFiltersFromUrl();
        loadArtists(filters).then(() => {
        });
    }, [getFiltersFromUrl, searchParams]);

    return {
        artists,
        loading,
        error,
        totalPages,
        totalCount,
        currentPage: getFiltersFromUrl().page,
        filters: getFiltersFromUrl(),
        updateFilters,
        changePage,
        reload: () => loadArtists(getFiltersFromUrl())
    };
};