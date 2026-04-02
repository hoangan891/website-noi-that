import React from 'react';
import { Avatar, TableCell } from '@mui/material';

const CategoryImageCell = ({ category }) => {
  return (
    <TableCell sx={{ p: 0.5 }}>
      <Avatar
        variant="rounded"
        src={category.image?.startsWith('/') ? `${process.env.REACT_APP_API_URL}${category.image}` : category.image || '/images/placeholder.png'}
        alt={category.name}
        sx={{ width: 56, height: 56 }}
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = '/images/placeholder.png'; // Fallback to placeholder image
        }}
      />
    </TableCell>
  );
};

export default CategoryImageCell;