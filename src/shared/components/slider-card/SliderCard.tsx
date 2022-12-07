import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Slider from './slider/index';
import './styles.css';
import { Environment } from '../../environment';
import { IListAppointment, AppointmentsService } from '../../services/api/appointments/AppointmentsService';
import { appointmentStateNumberToString, appointmentStateStringToString, formatDateToString, formatDateTimeToString, formatNumberToString } from '../../helpers';
import { IListTutor, TutorsService } from '../../services/api/tutors/TutorsService';
import { IListEmployee, EmployeesService } from '../../services/api/employees/EmployeesService';
import { IListPatient, PatientsService } from '../../services/api/patients/PatientsService';

const SliderProps = {
  zoomFactor: 30,
  slideMargin: 10, 
  maxVisibleSlides: 5,
  pageTransition: 500
};

export const SliderCard: React.FC = () => {
  const [data, setData] = useState<IListAppointment[]>([]);

  const [tutors, setTutors] = useState<IListTutor[]>([]);
  const [patients, setPatients] = useState<IListPatient[]>([]);
  const [employees, setEmployees] = useState<IListEmployee[]>([]);

  const navigate = useNavigate();

  const getTokenCurrentUser = () => {
    const _user = localStorage.getItem('APP_USER');
  
    if (_user) {
      const obj = JSON.parse(_user);
      return obj.token;
    }
  };

  useEffect(() => {
    AppointmentsService.getAll(getTokenCurrentUser())
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

  if (data.length < 1) {
    return (
      <Box display='flex' alignItems='center' margin={2}>
        <Typography variant='h6' sx={{ color: '#006BBF' }}>
          {Environment.EMPTY_LIST}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Slider {...SliderProps}>
        {data.filter((appointment)  => formatDateToString(appointment.date!) === formatDateToString(new Date())).map(appointment => (
          <Box key={appointment.id} onClick={() => navigate(`/consultas/detalhe/${appointment.id}`)} borderRadius={5} bgcolor={'background.paper'}>
            <Box bgcolor={'#E8F9FC'} margin={2} padding={1} borderRadius={5} maxHeight={200}>
              <img className='random-image' src={require('../../../assets/card-images/image-' + [Math.floor(Math.random() * (54 - 1 + 1) + 1)] + '.svg')} alt='appointment' />
            </Box>
            <Box margin={2} padding={1}>
              <Box display='flex' alignItems='center' justifyContent='space-between' flexDirection={'row'}>
                <Typography variant='subtitle2' sx={{ color: '#006BBF' }}>
                  {appointment.date === undefined || appointment.date === null ? '' : formatDateTimeToString(appointment.date)}
                </Typography>
                <Typography variant='h3' sx={{ color: '#006BBF' }}>
                    {`#${data.indexOf(appointment)+1}`}
                </Typography>
              </Box>

              <Box display='flex' alignItems='center' flexDirection={'row'} marginTop={1}>
                <Typography variant='body2' sx={{ color: '#006BBF', fontWeight: 600, marginRight: 2 }}>
                  Médico: 
                </Typography>
                <Typography variant='body2' sx={{ color: '#00569C' }}>
                  {appointment.employeeId === undefined || appointment.employeeId === null ? '' : employees.find(employee => employee?.id === appointment?.employeeId)?.name}
                </Typography>
              </Box>

              <Box display='flex' alignItems='center' flexDirection={'row'} marginTop={1}>
                <Typography variant='body2' sx={{ color: '#006BBF', fontWeight: 600, marginRight: 2 }}>
                  Paciente:
                </Typography>
                <Typography variant='body2' sx={{ color: '#00569C' }}>
                  {appointment.patientId === undefined || appointment.patientId === null ? '' : patients.find(patient => patient?.id === appointment?.patientId)?.name}
                </Typography>
              </Box>

              <Box display='flex' alignItems='center' flexDirection={'row'} marginTop={1}>
                <Typography variant='body2' sx={{ color: '#006BBF', fontWeight: 600, marginRight: 2 }}>
                  Tutor: 
                </Typography>
                <Typography variant='body2' sx={{ color: '#00569C' }}>
                {appointment.ownerId === undefined || appointment.ownerId === null ? '' : tutors.find(tutor => tutor?.id === appointment?.ownerId)?.name}
                </Typography>
              </Box>

              <Box display='flex' alignItems='center' flexDirection={'row'} marginTop={1}>
                <Typography variant='body2' sx={{ color: '#006BBF', fontWeight: 600, marginRight: 2 }}>
                  Valor:
                </Typography>
                <Typography variant='h4' sx={{ color: '#00569C' }}>
                  {appointment.value === undefined || appointment.value === null ? '' : `R$ ${formatNumberToString(appointment.value)}`}
                </Typography>
              </Box>

              <Box display='flex' alignItems='center' flexDirection={'row'} marginTop={1}>
                <Typography variant='body2' sx={{ color: '#006BBF', fontWeight: 600, marginRight: 2 }}>
                  Status:
                </Typography>
                <Typography variant='body2' sx={{ color: '#00569C' }}>
                  {appointment.appointmentState === undefined || appointment.appointmentState === null ? '' : appointmentStateStringToString(appointmentStateNumberToString(appointment.appointmentState))}
                </Typography>
              </Box>

            </Box>
          </Box>
        ))}
      </Slider>
    </>
  );
};
