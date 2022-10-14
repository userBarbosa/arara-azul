import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useSideMenuContext } from '../shared/contexts';
import { Dashboard } from '../pages';
import { Error404 } from '../pages/error-404/Error404';
import { Error403 } from '../pages/error-403/Error403';
import { Error401 } from '../pages/error-401/Error401';
import { Error500 } from '../pages/error-500/Error500';

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
      <Route path="/" />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/consultas" />
      <Route path="/pacientes" />
      <Route path="/tutores" />
      <Route path="/funcionarios" />

      <Route path="/401" element={<Error401 />} />
      <Route path="/403" element={<Error403 />} />
      <Route path="/404" element={<Error404 />} />
      <Route path="/500" element={<Error500 />} />

      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};
