import { useEffect, useMemo, useState } from 'react';
import { Box, Grid, Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Theme, Typography, useMediaQuery } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ListTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';

import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment';
import { IListTutor, TutorsService } from '../../shared/services/api/tutors/TutorsService';


export const TutorsList: React.FC = () => {
  const xldown = useMediaQuery((theme: Theme) => theme.breakpoints.down('xl'));
  const xlup = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListTutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);


  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get('page') || '1');
  }, [searchParams]);


  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      TutorsService.getAll(page, search)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            // console.log(result.message);
          } else {
            setTotalCount(result.totalCount);
            setRows(result.data);
          }
        });
    });
  }, [search, page]);

  const [data, setData] = useState<IListTutor[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await (
        await fetch('https://finalspaceapi.com/api/v0/character/')
      ).json();
      setData(data);
    };

    getData();
  }, []);

  return (
    <BaseLayoutPage
      title={'Tutores'}
      toolbar={
        <ListTools
          showInputSearch
          searchText={search}
          onClickButtonAdd={() => navigate('/tutores/inserir')}
          onChangeSearchText={text => setSearchParams({ search: text, page: '1' }, { replace: true })}
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
              {/* {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.telephoneNumber}</TableCell>
                <TableCell>{row.identificationNumber}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.patientsName}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => navigate(`/tutores/atualizar//${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/tutores/detalhe/${row.id}`)}>
                    <Icon>visibility</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))} */}
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  Kauã Claudino Loureiro
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant='body2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  kaua.loureiro@gmail.com
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant='body2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  (11) 98028-7824
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant='body2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  757.817.228-07
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant='body2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  Rua Nice, 110A, Jardim Mediterrâneo, 06708-710, Cotia - SP
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant='body2'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                  >
                  Rex | Maia
                  </Typography>
                </TableCell>

                <TableCell sx={{ display: 'flex', flexDirection: 'row' }}>
                  <IconButton size="small" onClick={() => navigate('/tutores/atualizar/1')}>
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate('/tutores/detalhe/1')}>
                    <Icon>visibility</Icon>
                  </IconButton>
                </TableCell>

              </TableRow>
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
              {(totalCount > 0 && totalCount > Environment.ROW_LIMIT) && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Pagination
                      page={page}
                      count={Math.ceil(totalCount / Environment.ROW_LIMIT)}
                      onChange={(_, newPage) => setSearchParams({ search, page: newPage.toString() }, { replace: true })}
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
            {data.length < 1 && !isLoading && (
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
              {data.map(tutor => (
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
                          Kauã Claudino Loureiro
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
                          kaua.loureiro@gmail.com
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
                          (11) 98028-7824
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
                          757.817.228-07
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
                        Rua Nice, 110A, Jardim Mediterrâneo, 06708-710, Cotia - SP
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
                        Rex | Maia
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
          
          {(totalCount > 0 && totalCount > Environment.ROW_LIMIT) && (
            <Box width='100%' margin={1} bgcolor={'background.paper'} padding={1} display='flex' alignItems='center' justifyContent="center">
              <Pagination
                size="small"
                page={page}
                count={Math.ceil(totalCount / Environment.ROW_LIMIT)}
                onChange={(_, newPage) => setSearchParams({ search, page: newPage.toString() }, { replace: true })}
              />
            </Box>
          )}


        </Box>
      )}
      
    </BaseLayoutPage>
  );
};