import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useSideMenuContext } from '../shared/contexts';
import { Dashboard } from '../pages';

export const AppRoutes = () => {
  const { setSideMenuOptions } = useSideMenuContext();

  useEffect(() => {
    setSideMenuOptions([
      {
        icon: 'home',
        path: '/dashboard',
        label: 'Dashboard',
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
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/consultas" />
      <Route path="/pacientes" />
      <Route path="/tutores" />
      <Route path="/funcionarios" />
      
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};