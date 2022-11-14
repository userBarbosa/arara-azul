import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuthContext, useSideMenuContext } from '../shared/contexts';
import {
  Home,

  AppointmentsList,
  AppointmentInsert,
  AppointmentUpdate,
  AppointmentDetails,

  PatientsList,
  PatientInsert,
  PatientUpdate,
  PatientDetails,

  TutorsList,
  TutorInsert,
  TutorUpdate,
  TutorDetails,

  EmployeesList,
  EmployeeInsert,
  EmployeeUpdate,
  EmployeeDetails,

  Error400,
  Error401,
  Error403,
  Error404,
  Error500,

  Login,
  ForgotPassword,
  ResetPassword
} from '../pages';


export const AppRoutes = () => {
  const { setSideMenuOptions } = useSideMenuContext();

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

  interface IPrivateProps {
    children: JSX.Element;
  }

  const Private: React.FC<IPrivateProps> = ({ children }) => {
    // const { isAuthenticated } = useAuthContext();


    // if (!isAuthenticated) {
    //   return <Navigate to="/login" />;
    // }

    return children;
  };

  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      
      <Route path="/esqueceu-sua-senha" element={<ForgotPassword />} />
      <Route path="/redefinir-senha" element={<ResetPassword />} />

      <Route path="/home" element={<Private><Home /></Private>} />

      <Route path="/consultas" element={<Private><AppointmentsList /></Private>} />
      <Route path="/consultas/inserir" element={<Private><AppointmentInsert /></Private>} />
      <Route path="/consultas/atualizar/:id" element={<Private><AppointmentUpdate /></Private>} />
      <Route path="/consultas/detalhe/:id" element={<Private><AppointmentDetails /></Private>} />

      <Route path="/pacientes" element={<Private><PatientsList/></Private>} />
      <Route path="/pacientes/inserir" element={<Private><PatientInsert/></Private>} />
      <Route path="/pacientes/atualizar/:id" element={<Private><PatientUpdate/></Private>} />
      <Route path="/pacientes/detalhe/:id" element={<Private><PatientDetails/></Private>} />

      <Route path="/tutores" element={<Private><TutorsList/></Private>} />
      <Route path="/tutores/inserir" element={<Private><TutorInsert/></Private>} />
      <Route path="/tutores/atualizar/:id" element={<Private><TutorUpdate/></Private>} />
      <Route path="/tutores/detalhe/:id" element={<Private><TutorDetails/></Private>} />

      <Route path="/funcionarios" element={<Private><EmployeesList/></Private>} />
      <Route path="/funcionarios/inserir" element={<Private><EmployeeInsert/></Private>} />
      <Route path="/funcionarios/atualizar/:id" element={<Private><EmployeeUpdate/></Private>} />
      <Route path="/funcionarios/detalhe/:id" element={<Private><EmployeeDetails/></Private>} />

      <Route path="/400" element={<Error400 />} />
      <Route path="/401" element={<Error401 />} />
      <Route path="/403" element={<Error403 />} />
      <Route path="/404" element={<Error404 />} />
      <Route path="/500" element={<Error500 />} />

      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};
