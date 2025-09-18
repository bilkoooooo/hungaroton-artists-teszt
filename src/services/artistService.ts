import {ArtistFilters, ArtistResponse} from "@/src/types/artist";

const API_BASE_URL = 'https://exam.api.fotex.net/api';

export class ArtistService {
    static async getArtists(filters: ArtistFilters): Promise<ArtistResponse> {
        const queryParams = new URLSearchParams();

        // Alapértelmezett paraméterek
        queryParams.append('include_image', 'true');
        queryParams.append('page', filters.page.toString());
        queryParams.append('per_page', filters.per_page.toString());

        console.log(filters);
        // Opcionális szűrők
        if (filters.search) {
            queryParams.append('search', filters.search);
        }

        if (filters.type) {
            queryParams.append('type', filters.type);
        }

        if (filters.letter) {
            queryParams.append('letter', filters.letter);
        }

        const response = await fetch(`${API_BASE_URL}/artists?${queryParams}`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;
    }
}