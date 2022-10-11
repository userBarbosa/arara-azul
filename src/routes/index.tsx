import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useMenuLateralContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { toggleMenuOpen } = useMenuLateralContext();

  return (
    <Routes>
      <Route path="/" element={<Button variant="contained" onClick={toggleMenuOpen} color="primary">Teste</Button>} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};