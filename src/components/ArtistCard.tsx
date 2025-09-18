'use client';

import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Chip
} from '@mui/material';
import {Artist} from '../types/artist';
import PersonIcon from '@mui/icons-material/Person';
import AlbumIcon from '@mui/icons-material/Album';
import Image from 'next/image';

interface ArtistCardProps {
    artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({artist}) => {
    const getTypeLabel = (type?: Artist['type']) => {
        switch (type) {
            case 'is_composer':
                return 'Zeneszerző';
            case 'is_performer':
                return 'Előadó';
            case 'is_primary':
                return 'Elsődleges';
            default:
                return null;
        }
    };

    const typeLabel = getTypeLabel(artist.type);

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                }
            }}
        >
            <CardMedia
                sx={{
                    height: 200,
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}
            >
                {artist.portrait ? (
                    <Image
                        src={artist.portrait}
                        width={200}
                        height={200}
                        alt={artist.name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #999;">
                  <PersonIcon style="font-size: 48px" />
                </div>
              `;
                        }}
                    />
                ) : (
                    <PersonIcon sx={{fontSize: 48, color: '#999'}}/>
                )}

                {typeLabel && (
                    <Chip
                        label={typeLabel}
                        size="small"
                        color="primary"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'rgba(25, 118, 210, 0.9)',
                            color: 'white'
                        }}
                    />
                )}
            </CardMedia>

            <CardContent sx={{flexGrow: 1, pb: 2}}>
                <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        lineHeight: 1.3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                    }}
                >
                    {artist.name}
                </Typography>

                {artist.albumCount !== undefined && (
                    <Box sx={{display: 'flex', alignItems: 'center', mt: 1}}>
                        <AlbumIcon sx={{fontSize: 16, mr: 0.5, color: '#666'}}/>
                        <Typography variant="body2" color="text.secondary">
                            {artist.albumCount} album
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default ArtistCard;