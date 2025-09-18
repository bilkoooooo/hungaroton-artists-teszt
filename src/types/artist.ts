// types/artist.ts
export interface Artist {
  id: number;
  name: string;
  albumCount?: number;
  portrait?: string;
  type?: 'is_composer' | 'is_performer' | 'is_primary';
}

export interface ArtistResponse {
  data: Artist[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ArtistFilters {
  search?: string;
  type?: 'is_composer' | 'is_performer' | 'is_primary';
  letter?: string;
  page: number;
  per_page: number;
}
