'use client';

import React from 'react';
import {
    Grid,
    Typography,
    Box,
    CircularProgress,
    Alert
} from '@mui/material';
import {Artist} from '../types/artist';
import ArtistCard from './ArtistCard';

interface ArtistListProps {
    artists: Artist[];
    loading: boolean;
    error: string | null;
}

const ArtistList: React.FC<ArtistListProps> = ({artists, loading, error}) => {
    if (loading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', py: 8}}>
                <CircularProgress size={40}/>
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{mb: 3}}>
                {error}
            </Alert>
        );
    }

    if (!artists.length) {
        return (
            <Box sx={{textAlign: 'center', py: 8}}>
                <Typography variant="h6" color="text.secondary">
                    Nincs találat a megadott szűrőkkel
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={3}>
            {artists.map((artist, index) => (
                <Grid key={index} size={{xs: 12, sm: 6, lg: 3}}>
                    <ArtistCard artist={artist}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default ArtistList;