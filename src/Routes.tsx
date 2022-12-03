import { useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
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
} from './pages';
import ProtectedRoutes from './shared/components/routes/ProtectedRoutes';
import PublicRoutes from './shared/components/routes/PublicRoutes';
import { useAuthContext, useSideMenuContext } from './shared/contexts';

export const MainRoutes = () => {
  const { setSideMenuOptions } = useSideMenuContext();
  const { getCurrentUser } = useAuthContext();

  if (getCurrentUser()) {
    useEffect(() => {
      'admin' === getCurrentUser().type ? 
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
        ])
        : 'assistant' === getCurrentUser().type ? 
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
          ])
          : 'doctor' === getCurrentUser().type ? 
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
            ])
            :
            setSideMenuOptions([
              {
                icon: 'home',
                path: '/home',
                label: 'Home',
              },
            ]);
    }, []);
  } else {
    <Navigate to="/login" />;
  }
  
  return (
    <Routes>
      {/** Protected Routes */}
      {/** Wrap all Route under ProtectedRoutes element */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<ProtectedRoutes roleRequired={['admin', 'doctor', 'assistant']} />}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route element={<ProtectedRoutes roleRequired={['admin', 'doctor', 'assistant']} />}>
          <Route path="/consultas" element={<AppointmentsList />} />
          <Route path="/consultas/inserir" element={<AppointmentInsert /> }/>
          <Route path="/consultas/atualizar/:id" element={<AppointmentUpdate /> }/>
          <Route path="/consultas/detalhe/:id" element={<AppointmentDetails />} />
        </Route>

        <Route element={<ProtectedRoutes roleRequired={['admin', 'doctor', 'assistant']} />}>
          <Route path="/pacientes" element={<PatientsList/>} />
          <Route path="/pacientes/inserir" element={<PatientInsert/>} />
          <Route path="/pacientes/atualizar/:id" element={<PatientUpdate/>} />
          <Route path="/pacientes/detalhe/:id" element={<PatientDetails/>} />
        </Route>

        <Route element={<ProtectedRoutes roleRequired={['admin', 'assistant']} />}>
          <Route path="/tutores" element={<TutorsList/>} />
          <Route path="/tutores/inserir" element={<TutorInsert/>} />
          <Route path="/tutores/atualizar/:id" element={<TutorUpdate/>} />
          <Route path="/tutores/detalhe/:id" element={<TutorDetails/>} />
        </Route>

        <Route element={<ProtectedRoutes roleRequired={['admin']} />}>
          <Route path="/funcionarios" element={<EmployeesList/>} />
          <Route path="/funcionarios/inserir" element={<EmployeeInsert/>} />
          <Route path="/funcionarios/atualizar/:id" element={<EmployeeUpdate/>}/>
          <Route path="/funcionarios/detalhe/:id" element={<EmployeeDetails/>}/>
        </Route>
      </Route>

      {/** Public Routes */}
      {/** Wrap all Route under PublicRoutes element */}
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/esqueceu-sua-senha" element={<ForgotPassword />} />
        <Route path="/redefinir-senha" element={<ResetPassword />} />
        <Route path="/400" element={<Error400 />} />
        <Route path="/401" element={<Error401 />} />
        <Route path="/403" element={<Error403 />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="/500" element={<Error500 />} />
      </Route>

      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

