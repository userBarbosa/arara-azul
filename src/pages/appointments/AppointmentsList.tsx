import { useEffect, useState } from 'react';
import { Box, Grid, Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Theme, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ListTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';

import { Environment } from '../../shared/environment';
import { IListPatient, PatientsService } from '../../shared/services/api/patients/PatientsService';
import { IListTutor, TutorsService } from '../../shared/services/api/tutors/TutorsService';
import { IListEmployee, EmployeesService } from '../../shared/services/api/employees/EmployeesService';
import { IListAppointment, AppointmentsService } from '../../shared/services/api/appointments/AppointmentsService';
import { appointmentStateNumberToString, appointmentStateStringToString, formatDateTimeToString, paymentMethodNumberToString, paymentMethodStringToString, reasonNumberToString, reasonStringToString } from '../../shared/helpers';


export const AppointmentsList: React.FC = () => {
  const xldown = useMediaQuery((theme: Theme) => theme.breakpoints.down('xl'));
  const xlup = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

  const [name, setName] = useState('');
  const navigate = useNavigate();

  const [data, setData] = useState<IListAppointment[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [foundAppointments, setFoundAppointments] = useState(data);

  const [tutors, setTutors] = useState<IListTutor[]>([]);
  const [patients, setPatients] = useState<IListPatient[]>([]);
  const [employees, setEmployees] = useState<IListEmployee[]>([]);

  const [page, setPage] = useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const filter = (text: string) => {
    const keyword = text;

    if (keyword !== '') {
      const results = data.filter((appointment) => {
        const name = appointment.patientId === undefined || appointment.patientId === null ? '' : appointment.patientId
        return name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setTotalCount(results.length);
      setFoundAppointments(results);
    } else {
      setTotalCount(data.length);
      setFoundAppointments(data);
    }

    setName(keyword);
  };

  const indexOfLastData = page * Environment.LIMIT;
  const indexOfFirstData = indexOfLastData - Environment.LIMIT;
  const currentData = foundAppointments.slice(indexOfFirstData, indexOfLastData);

  const [isLoading, setIsLoading] = useState(true);

  const getTokenCurrentUser = () => {
    const _user = localStorage.getItem('APP_USER');
  
    if (_user) {
      const obj = JSON.parse(_user);
      return obj.token;
    }
  };


  useEffect(() => {
    setIsLoading(true);

    AppointmentsService.getAll(getTokenCurrentUser())
      .then((result) => {
        setIsLoading(false);

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
          setTotalCount(result.data.length);
          setData(result.data);
          setFoundAppointments(result.data);
        }
      });
      
      TutorsService.getAll(getTokenCurrentUser())
      .then((result) => {
        setIsLoading(false);

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
        setIsLoading(false);

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
        setIsLoading(false);

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
      title={'Consultas'}
      toolbar={
        <ListTools
          showInputSearch
          searchText={name}
          onClickButtonAdd={() => navigate('/consultas/inserir')}
          onChangeSearchText={text => filter(text)}
        />
      }
    >

      {xlup && (
        <TableContainer component={Paper} variant="outlined" sx={{ m: 2, width: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>

                <TableCell>
                  <Typography
                    variant='subtitle2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  Data e Hora
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant='subtitle2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  Motivo
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant='subtitle2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  Médico
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant='subtitle2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  Tutor
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant='subtitle2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  Paciente
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant='subtitle2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  Status
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant='subtitle2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  Pagamento
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant='subtitle2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  Opções
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map(appointment => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.date === undefined || appointment.date === null ? '' : formatDateTimeToString(appointment.date)}</TableCell>
                <TableCell>{appointment.reason === undefined || appointment.reason === null ? '' : reasonStringToString(reasonNumberToString(appointment.reason))}</TableCell>
                <TableCell>{appointment.employeeId === undefined || appointment.employeeId === null ? '' : employees.find(employee => employee?.id === appointment?.employeeId)?.name}</TableCell>
                <TableCell>{appointment.ownerId === undefined || appointment.ownerId === null ? '' : tutors.find(tutor => tutor?.id === appointment?.ownerId)?.name}</TableCell>
                <TableCell>{appointment.patientId === undefined || appointment.patientId === null ? '' : patients.find(patient => patient?.id === appointment?.patientId)?.name}</TableCell>
                <TableCell>{appointment.appointmentState === undefined || appointment.appointmentState === null ? '' : appointmentStateStringToString(appointmentStateNumberToString(appointment.appointmentState))}</TableCell>
                <TableCell>{appointment.paymentMethod === undefined || appointment.paymentMethod === null ? '' : paymentMethodStringToString(paymentMethodNumberToString(appointment.paymentMethod))}</TableCell>

                <TableCell>
                  <IconButton size="small" onClick={() => navigate(`/consultas/atualizar/${appointment.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/consultas/detalhe/${appointment.id}`)}>
                    <Icon>visibility</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            </TableBody>

            {totalCount === 0 && !isLoading && (
              <caption>{Environment.EMPTY_LIST}</caption>
            )}

            <TableFooter>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={8}>
                    <LinearProgress variant='indeterminate' />
                  </TableCell>
                </TableRow>
              )}
              {(totalCount > 0 && totalCount > Environment.LIMIT) && (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Pagination
                      page={page}
                      count={Math.ceil(totalCount / Environment.LIMIT)}
                      onChange={handlePageChange}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableFooter>
          </Table>
        </TableContainer>)}

      {xldown && (
        <Box display='flex' flexDirection='column' alignItems='center' margin={2}>

          <Box>
            {totalCount === 0 && !isLoading && (
              <Box>
                <Typography variant='h6' sx={{ color: '#006BBF' }}>
                  {Environment.EMPTY_LIST}
                </Typography>
              </Box>
            )}
            <Box>
              {isLoading && (
                <LinearProgress variant='indeterminate' />
              )}
            </Box>
          </Box>
          <Box>
            <Grid container justifyContent="center">
              {currentData.map(appointment => (
                <Grid key={appointment.id} item xs={12} sm={8} md={4} lg={3} maxWidth={'300px'} margin={1} padding={2} borderRadius={5} bgcolor={'background.paper'}>
                  
                  <Box display='flex' flexDirection='column'>
                    <Box>
                      <Typography
                        variant='subtitle2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                          Data e Hora:
                      </Typography>
                    </Box>
                  
                    <Box>
                      <Typography
                        variant='body2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        {appointment.date === undefined || appointment.date === null ? '' : formatDateTimeToString(appointment.date)}
                      </Typography>
                    </Box>

                  </Box>

                  <Box display='flex' flexDirection='column' marginTop={2}>

                    <Box>
                      <Typography
                        variant='subtitle2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                          Motivo:
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant='body2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        {appointment.reason === undefined || appointment.reason === null ? '' : reasonStringToString(reasonNumberToString(appointment.reason))}
                      </Typography>
                    </Box>

                  </Box>

                  <Box display='flex' flexDirection='column' marginTop={2}>                 
                    <Box>
                      <Typography
                        variant='subtitle2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                          Médico:
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant='body2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        {appointment.employeeId === undefined || appointment.employeeId === null ? '' : employees.find(employee => employee?.id === appointment?.employeeId)?.name}
                      </Typography>
                    </Box>

                  </Box>

                  <Box display='flex' flexDirection='column' marginTop={2}>                  
                    <Box>
                      <Typography
                        variant='subtitle2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                          Tutor:
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant='body2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        {appointment.ownerId === undefined || appointment.ownerId === null ? '' : tutors.find(tutor => tutor?.id === appointment?.ownerId)?.name}
                      </Typography>
                    </Box>

                  </Box>

                  <Box display='flex' flexDirection='column' marginTop={2}>                  
                    <Box>
                      <Typography
                        variant='subtitle2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        Paciente:
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant='body2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        {appointment.patientId === undefined || appointment.patientId === null ? '' : patients.find(patient => patient?.id === appointment?.patientId)?.name}
                      </Typography>
                    </Box>

                  </Box>

                  <Box display='flex' flexDirection='column' marginTop={2}>                  
                    <Box>
                      <Typography
                        variant='subtitle2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        Status:
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant='body2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        {appointment.appointmentState === undefined || appointment.appointmentState === null ? '' : appointmentStateStringToString(appointmentStateNumberToString(appointment.appointmentState))}
                      </Typography>
                    </Box>

                  </Box>

                  <Box display='flex' flexDirection='column' marginTop={2}>                  
                    <Box>
                      <Typography
                        variant='subtitle2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                      Pagamento:
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant='body2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        {appointment.paymentMethod === undefined || appointment.paymentMethod === null ? '' : paymentMethodStringToString(paymentMethodNumberToString(appointment.paymentMethod))}
                      </Typography>
                    </Box>

                  </Box>

                  <Box display='flex' alignItems='center' flexDirection='row' marginTop={2}>                    
                    <Box marginRight={1}>
                      <Typography
                        variant='subtitle2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                      Opções:
                      </Typography>
                    </Box>

                    <Box marginLeft={1}>
                      <IconButton size="small" onClick={() => navigate(`/consultas/atualizar/${appointment.id}`)}>
                        <Icon>edit</Icon>
                      </IconButton>
                      <IconButton size="small" onClick={() => navigate(`/consultas/detalhe/${appointment.id}`)}>
                        <Icon>visibility</Icon>
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          
          {(totalCount > 0 && totalCount > Environment.LIMIT) && (
            <Box width='100%' margin={1} bgcolor={'background.paper'} padding={1} display='flex' alignItems='center' justifyContent="center">
              <Pagination
                size="small"
                page={page}
                count={Math.ceil(totalCount / Environment.LIMIT)}
                onChange={handlePageChange}
              />
            </Box>
          )}

        </Box>
      )}

    </BaseLayoutPage>
  );
};