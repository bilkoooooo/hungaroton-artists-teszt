'use client';

import React from 'react';
import {
  Box,
  Pagination,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';

interface ArtistPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

const ArtistPagination: React.FC<ArtistPaginationProps> = ({
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  loading = false
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme?.breakpoints.down('sm'));

  if (totalPages <= 1) {
    return null;
  }

  const startItem = (currentPage - 1) * 50 + 1;
  const endItem = Math.min(currentPage * 50, totalCount);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        py: 3,
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 4
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {startItem}-{endItem} / {totalCount} művész
      </Typography>
      
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        disabled={loading}
        color="primary"
        size={isMobile ? 'small' : 'medium'}
        siblingCount={isMobile ? 1 : 2}
        boundaryCount={1}
        showFirstButton
        showLastButton
      />
    </Box>
  );
};