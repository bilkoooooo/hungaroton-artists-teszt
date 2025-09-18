'use client';

import React, {useState, useEffect} from 'react';
import {
    Paper,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Typography,
    Chip,
    Box,
    SelectChangeEvent
} from '@mui/material';
import {ArtistFilters} from '../types/artist';

interface ArtistFiltersProps {
    filters: ArtistFilters;
    onFiltersChange: (filters: Partial<ArtistFilters>) => void;
    totalCount: number;
}

const ALPHABET = 'AÁBCDEÉFGHIÍJKLMNOÓÖŐPQRSTUÚÜŰVWXYZ'.split('');

const ArtistFiltersComponent: React.FC<ArtistFiltersProps> = ({
                                                                  filters, onFiltersChange, totalCount
                                                              }) => {
    const [searchValue, setSearchValue] = useState(filters.search || '');

    // Debounced search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchValue !== (filters.search || '')) {
                onFiltersChange({search: searchValue || undefined});
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchValue, filters.search, onFiltersChange]);

    const handleTypeChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        onFiltersChange({
            type: value ? value as ArtistFilters['type'] : undefined
        });
    };

    const handleLetterSelect = (letter: string) => {
        onFiltersChange({
            letter: filters.letter === letter ? undefined : letter
        });
    };

    const clearFilters = () => {
        setSearchValue('');
        onFiltersChange({search: undefined, type: undefined, letter: undefined});
    };

    const hasActiveFilters = filters.search || filters.type || filters.letter;

    return (
        <Paper elevation={2} sx={{p: 3, mb: 3}}>
            <Typography variant="h6" gutterBottom>
                Szűrők ({totalCount} művész)
            </Typography>

            <Grid container spacing={3}>
                {/* Keresés */}
                <Grid size={{xs: 12, md: 8}}>
                    <TextField
                        fullWidth
                        label="Keresés névben"
                        variant="outlined"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="pl. Szabó"
                    />
                </Grid>

                {/* Típus */}
                <Grid size={{xs: 12, md: 8}}>
                    <FormControl fullWidth>
                        <InputLabel>Művész típusa</InputLabel>
                        <Select
                            value={filters.type || ''}
                            label="Művész típusa"
                            onChange={handleTypeChange}
                        >
                            <MenuItem value="">
                                <em>Összes</em>
                            </MenuItem>
                            <MenuItem value="is_composer">Zeneszerző</MenuItem>
                            <MenuItem value="is_performer">Előadó</MenuItem>
                            <MenuItem value="is_primary">Elsődleges</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* ABC szűrő */}
                <Grid size={{xs: 12, md: 8}}>
                    <Typography variant="subtitle2" gutterBottom>
                        Betű szerint:
                    </Typography>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                        {ALPHABET.map((letter) => (
                            <Chip
                                key={letter}
                                label={letter}
                                onClick={() => handleLetterSelect(letter)}
                                variant={filters.letter === letter ? 'filled' : 'outlined'}
                                color={filters.letter === letter ? 'primary' : 'default'}
                                size="small"
                                sx={{cursor: 'pointer'}}
                            />
                        ))}
                    </Box>
                </Grid>

                {/* Aktív szűrők megjelenítése */}
                {hasActiveFilters && (
                    <Grid size={{xs: 12, md: 8}}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap'}}>
                            <Typography variant="body2">Aktív szűrők:</Typography>
                            {filters.search && (
                                <Chip
                                    label={`Keresés: "${filters.search}"`}
                                    onDelete={() => onFiltersChange({search: undefined})}
                                    size="small"
                                />
                            )}
                            {filters.type && (
                                <Chip
                                    label={`Típus: ${filters.type}`}
                                    onDelete={() => onFiltersChange({type: undefined})}
                                    size="small"
                                />
                            )}
                            {filters.letter && (
                                <Chip
                                    label={`Betű: ${filters.letter}`}
                                    onDelete={() => onFiltersChange({letter: undefined})}
                                    size="small"
                                />
                            )}
                            <Chip
                                label="Összes törlése"
                                onClick={clearFilters}
                                variant="outlined"
                                size="small"
                                color="error"
                            />
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Paper>
    );
};

export default ArtistFiltersComponent;