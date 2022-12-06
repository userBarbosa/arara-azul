import { useEffect, useState } from 'react';
import { Box, Grid, Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Theme, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ListTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';

import { Environment } from '../../shared/environment';
import { EmployeesService, IListEmployee } from '../../shared/services/api/employees/EmployeesService';
import { activeBooleanToString, activeStringToString, formatDateToString, formatDocumentNumber, formatPhoneNumber, removeInvalidCharacters, typeStringToStringPtBr } from '../../shared/helpers';

export const EmployeesList: React.FC = () => {
  const xldown = useMediaQuery((theme: Theme) => theme.breakpoints.down('xl'));
  const xlup = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

  const [name, setName] = useState('');
  const navigate = useNavigate();

  const [data, setData] = useState<IListEmployee[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [foundEmployees, setFoundEmployees] = useState(data);

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
      const results = data.filter((employee) => {
        const name = employee.name === undefined || employee.name === null ? '' : employee.name
        return name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setTotalCount(results.length);
      setFoundEmployees(results);
    } else {
      setTotalCount(data.length);
      setFoundEmployees(data);
    }

    setName(keyword);
  };

  const indexOfLastData = page * Environment.LIMIT;
  const indexOfFirstData = indexOfLastData - Environment.LIMIT;
  const currentData = foundEmployees.slice(indexOfFirstData, indexOfLastData);

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
          setTotalCount(result.data.length);
          setData(result.data);
          setFoundEmployees(result.data);
        }
      });
  }, []);

  return (
    <BaseLayoutPage
      title={'Funcionários'}
      toolbar={
        <ListTools
          showInputSearch
          searchText={name}
          onClickButtonAdd={() => navigate('/funcionarios/inserir')}
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
                  Cargo
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
                  Opções
                  </Typography>
                </TableCell>

              </TableRow>
            </TableHead>

              <TableBody>
                {currentData.map(employee => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name === undefined || employee.name === null ? '' : employee.name}</TableCell>
                    <TableCell>{employee.email === undefined || employee.email === null ? '' : employee.email}</TableCell>
                    <TableCell>{employee.phoneNumber === undefined || employee.phoneNumber === null ? '' : formatPhoneNumber(removeInvalidCharacters(employee.phoneNumber))}</TableCell>
                    <TableCell>{employee.documentNumber === undefined || employee.documentNumber === null ? '' : formatDocumentNumber(removeInvalidCharacters(employee.documentNumber))}</TableCell>
                    <TableCell>{employee.birthDate === undefined || employee.birthDate === null ? '' : formatDateToString(employee.birthDate)}</TableCell>
                    <TableCell>{employee.type === undefined || employee.type === null ? '' : typeStringToStringPtBr(employee.type)}</TableCell>
                    <TableCell>{employee.active === undefined || employee.active === null ? '' : activeStringToString(activeBooleanToString(employee.active))}</TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => navigate(`/funcionarios/atualizar/${employee.id}`)}>
                        <Icon>edit</Icon>
                      </IconButton>
                      <IconButton size="small" onClick={() => navigate(`/funcionarios/detalhe/${employee.id}`)}>
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
              {currentData.map(employee => (
                <Grid key={employee.id} item xs={12} sm={8} md={4} lg={3} maxWidth={'300px'} margin={1} padding={2} borderRadius={5} bgcolor={'background.paper'}>
                  
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
                        {employee.name === undefined || employee.name === null ? '' : employee.name}
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
                        {employee.email === undefined || employee.email === null ? '' : employee.email}
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
                        {employee.phoneNumber === undefined || employee.phoneNumber === null ? '' : formatPhoneNumber(removeInvalidCharacters(employee.phoneNumber))}
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
                        {employee.documentNumber === undefined || employee.documentNumber === null ? '' : formatDocumentNumber(removeInvalidCharacters(employee.documentNumber))}
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
                        {employee.birthDate === undefined || employee.birthDate === null ? '' : formatDateToString(employee.birthDate)}
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
                        Cargo:
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant='body2'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                      >
                        {employee.type === undefined || employee.type === null ? '' : typeStringToStringPtBr(employee.type)}
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
                        {employee.active === undefined || employee.active === null ? '' : activeStringToString(activeBooleanToString(employee.active))}
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
                      <IconButton size="small" onClick={() => navigate(`/funcionarios/atualizar/${employee.id}`)}>
                        <Icon>edit</Icon>
                      </IconButton>
                      <IconButton size="small" onClick={() => navigate(`/funcionarios/detalhe/${employee.id}`)}>
                        <Icon>visibility</Icon>
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          
          {(totalCount > 0 && totalCount > Environment.LIMIT) && (
            <Box width='auto' margin={1} bgcolor={'background.paper'} padding={1} display='flex' alignItems='center' justifyContent="center">
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