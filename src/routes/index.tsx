import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { useSideMenuContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { toggleSideMenuOpen, setSideMenuOptions } = useSideMenuContext();

  useEffect(() => {
    setSideMenuOptions([
      {
        icon: 'home',
        path: '/home',
        label: 'Home',
      },
      {
        icon: 'event_available',
        path: '/consultas',
        label: 'Consultas',
      },
      {
        icon: 'pets',
        path: '/pacientes',
        label: 'Pacientes',
      },
      {
        icon: 'folder_shared',
        path: '/tutores',
        label: 'Tutores',
      },
      {
        icon: 'admin_panel_settings',
        path: '/funcionarios',
        label: 'Funcionários',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Button variant="contained" onClick={toggleSideMenuOpen} color="primary">home</Button>} />
      <Route path="/consultas" element={<Button variant="contained" onClick={toggleSideMenuOpen} color="primary">consultas</Button>} />
      <Route path="/pacientes" element={<Button variant="contained" onClick={toggleSideMenuOpen} color="primary">pacientes</Button>} />
      <Route path="/tutores" element={<Button variant="contained" onClick={toggleSideMenuOpen} color="primary">tutores</Button>} />
      <Route path="/funcionarios" element={<Button variant="contained" onClick={toggleSideMenuOpen} color="primary">funcionarios</Button>} />
      
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};