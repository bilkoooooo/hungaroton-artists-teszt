'use client';

import React, {Suspense} from 'react';
import {
    Container,
    Typography,
    Box,
    Paper
} from '@mui/material';
import {useArtists} from "@/src/hooks/useArtists";
import ArtistFiltersComponent from "@/src/components/ArtistFilters";
import ArtistList from "@/src/components/ArtistList";


function ArtistPagination(props: {
    currentPage: number,
    totalPages: number,
    totalCount: number,
    onPageChange: (page: number) => void,
    loading: boolean
}) {
    return null;
}

const ArtistsPage: React.FC = () => {
    const {
        artists,
        loading,
        error,
        totalPages,
        totalCount,
        currentPage,
        filters,
        updateFilters,
        changePage
    } = useArtists();

    return (
        <Container maxWidth="xl" sx={{py: 4}}>
            <Suspense fallback={<div>Loading search parameters...</div>}>

                <Box sx={{mb: 4}}>
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textAlign: 'center'
                        }}
                    >
                        Hungaroton Művészek
                    </Typography>
                    <Typography
                        variant="h6"
                        color="white"
                        align="center"
                        sx={{mb: 2}}
                    >
                        Fedezze fel a magyar klasszikus zene művészeit
                    </Typography>
                </Box>


                {/* Szűrők */}
                <ArtistFiltersComponent
                    filters={filters}
                    onFiltersChange={updateFilters}
                    totalCount={totalCount}
                />

                {/* Művészek listája */}
                <Paper elevation={1} sx={{p: 3, minHeight: 400}}>
                    <ArtistList
                        artists={artists}
                        loading={loading}
                        error={error}
                    />

                    {/* Lapozás */}
                    <ArtistPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalCount={totalCount}
                        onPageChange={changePage}
                        loading={loading}
                    />
                </Paper>
            </Suspense>
        </Container>
    );
};

export default ArtistsPage;