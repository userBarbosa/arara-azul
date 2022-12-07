import { useEffect, useState } from 'react';
import { Box, Paper, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';
import { IListPatient, PatientsService } from '../../shared/services/api/patients/PatientsService';
import { IListTutor, TutorsService } from '../../shared/services/api/tutors/TutorsService';
import { IListEmployee, EmployeesService } from '../../shared/services/api/employees/EmployeesService';
import { IDetailAppointment, AppointmentsService } from '../../shared/services/api/appointments/AppointmentsService';
import { appointmentStateNumberToString, appointmentStateStringToString, formatDateTimeToString, formatNumberToString, paymentMethodNumberToString, paymentMethodStringToString, reasonNumberToString, reasonStringToString } from '../../shared/helpers';

export const AppointmentDetails: React.FC = () => {
  const mddown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const theme = useTheme();
  const navigate = useNavigate();

  const { id } = useParams<'id'>();

  const [data, setData] = useState<IDetailAppointment>({
    id: id!,
    patientId: '',
    ownerId: '',
    employeeId: '',
    appointmentState: 0,
    observation: '',
    paymentMethod: 0,
    reason: 0,
    value: 0,
    date: undefined,
  });

  const [tutors, setTutors] = useState<IListTutor[]>([]);
  const [patients, setPatients] = useState<IListPatient[]>([]);
  const [employees, setEmployees] = useState<IListEmployee[]>([]);

  const getTokenCurrentUser = () => {
    const _user = localStorage.getItem('APP_USER');
  
    if (_user) {
      const obj = JSON.parse(_user);
      return obj.token;
    }
  };

  useEffect(() => {

    AppointmentsService.getById(id!, getTokenCurrentUser())
    .then((result) => {

      if (result === 'Network Error') {
        navigate('/400');
      } else if (result.status === 400) {
        navigate('/400');
      } else if (result.status === 401) {
        localStorage.removeItem('APP_USER');
        navigate('/401');
      } else if (result.status === 403) {
        navigate('/403');
      } else if (result.status === 404) {
        navigate('/500');
      } else if (result.status === 500) {
        navigate('/500');
      } else if (result.status === 200) {
        setData(result.data);
      }
    });
      
    TutorsService.getAll(getTokenCurrentUser())
    .then((result) => {

      if (result === 'Network Error') {
        navigate('/400');
      } else if (result.status === 400) {
        navigate('/400');
      } else if (result.status === 401) {
        localStorage.removeItem('APP_USER');
        navigate('/401');
      } else if (result.status === 403) {
        navigate('/403');
      } else if (result.status === 404) {
        navigate('/500');
      } else if (result.status === 500) {
        navigate('/500');
      } else if (result.status === 200) {
        setTutors(result.data);
      }
    });

    PatientsService.getAll(getTokenCurrentUser())
    .then((result) => {

      if (result === 'Network Error') {
        navigate('/400');
      } else if (result.status === 400) {
        navigate('/400');
      } else if (result.status === 401) {
        localStorage.removeItem('APP_USER');
        navigate('/401');
      } else if (result.status === 403) {
        navigate('/403');
      } else if (result.status === 404) {
        navigate('/500');
      } else if (result.status === 500) {
        navigate('/500');
      } else if (result.status === 200) {
        setPatients(result.data);
      }
    });

    EmployeesService.getAll(getTokenCurrentUser())
    .then((result) => {

      if (result === 'Network Error') {
        navigate('/400');
      } else if (result.status === 400) {
        navigate('/400');
      } else if (result.status === 401) {
        localStorage.removeItem('APP_USER');
        navigate('/401');
      } else if (result.status === 403) {
        navigate('/403');
      } else if (result.status === 404) {
        navigate('/500');
      } else if (result.status === 500) {
        navigate('/500');
      } else if (result.status === 200) {
        setEmployees(result.data);
      }
    });
  }, []);

  return (
    <BaseLayoutPage
      title={'Detalhes Consulta'}
      toolbar={
        <DetailTools 
          showButtonReturn 
          onClickButtonReturn={() => navigate('/consultas')}
        />}
    >
      <Box
        margin={2}
        padding={1}
        height={theme.spacing(mddown ? 110 : mdUp ? 90 : 110)} 
        component={Paper}
        display='flex'
        alignItems='stretch'
        justifyContent='space-between'
        sx={{flexDirection: 'column'}}
      >
        <Box margin={2}>
          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Data e Hora:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.date === undefined || data.date === null ? '' : formatDateTimeToString(data.date)}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Tutor:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
            {data.ownerId === undefined || data.ownerId === null ? '' : tutors.find(tutor => tutor?.id === data?.ownerId)?.name}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Paciente:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.patientId === undefined || data.patientId === null ? '' : patients.find(patient => patient?.id === data?.patientId)?.name}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Motivo:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.reason === undefined || data.reason === null ? '' : reasonStringToString(reasonNumberToString(data.reason))}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Médico:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.employeeId === undefined || data.employeeId === null ? '' : employees.find(employee => employee?.id === data?.employeeId)?.name}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Valor:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.value === undefined || data.value === null ? '' : `R$ ${formatNumberToString(data.value)}`}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Pagamento:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.paymentMethod === undefined || data.paymentMethod === null ? '' : paymentMethodStringToString(paymentMethodNumberToString(data.paymentMethod))}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Status:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.appointmentState === undefined || data.appointmentState === null ? '' : appointmentStateStringToString(appointmentStateNumberToString(data.appointmentState))}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Observação:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.observation === undefined || data.observation === null ? '' : data.observation}
            </Typography>
          </Box>
          
        </Box>

      </Box>
    </BaseLayoutPage>
  );
};