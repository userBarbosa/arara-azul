import { useEffect, useState } from 'react';
import { Box, Grid, Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Theme, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ListTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';

import { Environment } from '../../shared/environment';
import { IListPatient, PatientsService } from '../../shared/services/api/patients/PatientsService';
import { formatDateToString, onTreatmentBooleanToString, onTreatmentStringToString, sexNumberToString, sexStringToString, specieNumberToString, specieStringToString } from '../../shared/helpers';
import { IListTutor, TutorsService } from '../../shared/services/api/tutors/TutorsService';

export const PatientsList: React.FC = () => {
  const xldown = useMediaQuery((theme: Theme) => theme.breakpoints.down('xl'));
  const xlup = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

  const [name, setName] = useState('');
  const navigate = useNavigate();

  const [data, setData] = useState<IListPatient[]>([]);
  const [tutors, setTutors] = useState<IListTutor[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [foundPatients, setFoundPatients] = useState(data);

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
      const results = data.filter((patient) => {
        const name = patient.name === undefined || patient.name === null ? '' : patient.name
        return name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setTotalCount(results.length);
      setFoundPatients(results);
    } else {
      setTotalCount(data.length);
      setFoundPatients(data);
    }

    setName(keyword);
  };

  const indexOfLastData = page * Environment.LIMIT;
  const indexOfFirstData = indexOfLastData - Environment.LIMIT;
  const currentData = foundPatients.slice(indexOfFirstData, indexOfLastData);

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
          setTotalCount(result.data.length);
          setData(result.data);
          setFoundPatients(result.data);
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
  }, []);

  return (
    <BaseLayoutPage
      title={'Pacientes'}
      toolbar={
        <ListTools
          showInputSearch
          searchText={name}
          onClickButtonAdd={() => navigate('/pacientes/inserir')}
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
                  Nome
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
                  Espécie
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant='subtitle2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  Data de Nascimento
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant='subtitle2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  Sexo
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant='subtitle2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  Em tratamento?
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
              {currentData.map(patient => (
              <TableRow key={patient.id}>
                <TableCell>{patient.name === undefined || patient.name === null ? '' : patient.name}</TableCell>
                <TableCell>{patient.tutorId === undefined || patient.tutorId === null ? '' : tutors.find(tutor => tutor?.id === patient?.tutorId)?.name}</TableCell>
                <TableCell>{patient.species === undefined || patient.species === null ? '' : specieStringToString(specieNumberToString(patient.species))}</TableCell>
                <TableCell>{patient.birthDate === undefined || patient.birthDate === null ? '' : formatDateToString(patient.birthDate)}</TableCell>
                <TableCell>{patient.sex === undefined || patient.sex === null ? '' : sexStringToString(sexNumberToString(patient.sex))}</TableCell>
                <TableCell>{patient.onTreatment === undefined || patient.onTreatment === null ? '' : onTreatmentStringToString(onTreatmentBooleanToString(patient.onTreatment))}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => navigate(`/tutores/atualizar/${patient.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/tutores/detalhe/${patient.id}`)}>
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
                  <TableCell colSpan={7}>
                    <LinearProgress variant='indeterminate' />
                  </TableCell>
                </TableRow>
              )}
              {(totalCount > 0 && totalCount > Environment.LIMIT) && (
                <TableRow>
                  <TableCell colSpan={7}>
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
              {currentData.map(patient => (
                <Grid key={patient.id} item xs={12} sm={8} md={4} lg={3} maxWidth={'300px'} margin={1} padding={2} borderRadius={5} bgcolor={'background.paper'}>
                  
                  <Box display='flex' flexDirection='column'>
                    <Box>
                      <Typography
                        variant='subtitle2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        Nome:
                      </Typography>
                    </Box>
                  
                    <Box>
                      <Typography
                        variant='body2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        {patient.name === undefined || patient.name === null ? '' : patient.name}
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
                        {patient.tutorId === undefined || patient.tutorId === null ? '' : tutors.find(tutor => tutor?.id === patient?.tutorId)?.name}
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
                        Espécie:
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant='body2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        {patient.species === undefined || patient.species === null ? '' : specieStringToString(specieNumberToString(patient.species))}
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
                        Data de Nascimento:
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant='body2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        {patient.birthDate === undefined || patient.birthDate === null ? '' : formatDateToString(patient.birthDate)}
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
                        Sexo:
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant='body2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        {patient.sex === undefined || patient.sex === null ? '' : sexStringToString(sexNumberToString(patient.sex))}
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
                        Em tratamento?
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant='body2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        {patient.onTreatment === undefined || patient.onTreatment === null ? '' : onTreatmentStringToString(onTreatmentBooleanToString(patient.onTreatment))}
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
                      <IconButton size="small" onClick={() => navigate(`/pacientes/atualizar/${patient.id}`)}>
                        <Icon>edit</Icon>
                      </IconButton>
                      <IconButton size="small" onClick={() => navigate(`/pacientes/detalhe/${patient.id}`)}>
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