import { useEffect, useState } from 'react';
import { Box, Grid, Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Theme, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ListTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';

import { Environment } from '../../shared/environment';
import { IListTutor, TutorsService } from '../../shared/services/api/tutors/TutorsService';
import { formatDocumentNumber, formatPhoneNumber, formatZipCode, removeInvalidCharacters } from '../../shared/helpers';


export const TutorsList: React.FC = () => {
  const xldown = useMediaQuery((theme: Theme) => theme.breakpoints.down('xl'));
  const xlup = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

  const [name, setName] = useState('');
  const navigate = useNavigate();

  const [data, setData] = useState<IListTutor[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [foundTutors, setFoundTutors] = useState(data);

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
      const results = data.filter((tutor) => {
        const name = tutor.name === undefined || tutor.name === null ? '' : tutor.name
        return name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setTotalCount(results.length);
      setFoundTutors(results);
    } else {
      setTotalCount(data.length);
      setFoundTutors(data);
    }

    setName(keyword);
  };

  const indexOfLastData = page * Environment.LIMIT;
  const indexOfFirstData = indexOfLastData - Environment.LIMIT;
  const currentData = foundTutors.slice(indexOfFirstData, indexOfLastData);

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
          setTotalCount(result.data.length);
          setData(result.data);
          setFoundTutors(result.data);
        }
      });
  }, []);

  return (
    <BaseLayoutPage
      title={'Tutores'}
      toolbar={
        <ListTools
          showInputSearch
          searchText={name}
          onClickButtonAdd={() => navigate('/tutores/inserir')}
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
                  Email
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant='subtitle2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  Telefone
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant='subtitle2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  CPF
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant='subtitle2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  Endereço
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant='subtitle2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  Pacientes
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
              {currentData.map(tutor => (
              <TableRow key={tutor.id}>
                <TableCell>{tutor.name === undefined || tutor.name === null ? '' : tutor.name}</TableCell>
                <TableCell>{tutor.email === undefined || tutor.email === null ? '' : tutor.email}</TableCell>
                <TableCell>{tutor.phoneNumber === undefined || tutor.phoneNumber === null ? '' : formatPhoneNumber(removeInvalidCharacters(tutor.phoneNumber))}</TableCell>
                <TableCell>{tutor.documentNumber === undefined || tutor.documentNumber === null ? '' : formatDocumentNumber(removeInvalidCharacters(tutor.documentNumber))}</TableCell>
                <TableCell>{tutor.address === undefined || tutor.address === null ? '' : `${tutor.address.streetName}, ${tutor.address.number}, ${tutor.address.neighborhood} - ${formatZipCode(removeInvalidCharacters(tutor.address.zipCode!))}, ${tutor.address.city} - ${tutor.address.state}`}</TableCell>
                <TableCell>{tutor.patientsName === undefined || tutor.patientsName === null ? '' : tutor.patientsName.join(' | ')}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => navigate(`/tutores/atualizar/${tutor.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/tutores/detalhe/${tutor.id}`)}>
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
              {currentData.map(tutor => (
                <Grid key={tutor.id} item xs={12} sm={8} md={4} lg={3} maxWidth={'300px'} margin={1} padding={2} borderRadius={5} bgcolor={'background.paper'}>
                  
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
                        {tutor.name === undefined || tutor.name === null ? '' : tutor.name}
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
                          Email:
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant='body2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        {tutor.email === undefined || tutor.email === null ? '' : tutor.email}
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
                          Telefone:
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant='body2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        {tutor.phoneNumber === undefined || tutor.phoneNumber === null ? '' : formatPhoneNumber(removeInvalidCharacters(tutor.phoneNumber))}
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
                          CPF:
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant='body2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        {tutor.documentNumber === undefined || tutor.documentNumber === null ? '' : formatDocumentNumber(removeInvalidCharacters(tutor.documentNumber))}
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
                        Endereço:
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant='body2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        {tutor.address === undefined || tutor.address === null ? '' : `${tutor.address.streetName}, ${tutor.address.number}, ${tutor.address.neighborhood} - ${formatZipCode(removeInvalidCharacters(tutor.address.zipCode!))}, ${tutor.address.city} - ${tutor.address.state}`}
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
                        Pacientes:
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant='body2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        {tutor.patientsName === undefined || tutor.patientsName === null ? '' : tutor.patientsName.join(' | ')}
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
                      <IconButton size="small" onClick={() => navigate(`/tutores/atualizar/${tutor.id}`)}>
                        <Icon>edit</Icon>
                      </IconButton>
                      <IconButton size="small" onClick={() => navigate(`/tutores/detalhe/${tutor.id}`)}>
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