import { useEffect, useMemo, useState } from 'react';
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ListTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';

import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment';
import { IListTutor, TutorsService } from '../../shared/services/api/tutors/TutorsService';


export const TutorsList: React.FC = () => {
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
      <TableContainer component={Paper} variant="outlined" sx={{ m: 2, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Pacientes</TableCell>
              <TableCell width={100}>Opções</TableCell>
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
              <TableCell>Kauã Claudino Loureiro</TableCell>
              <TableCell>kaua.loureiro@gmail.com</TableCell>
              <TableCell>(11) 98028-7824</TableCell>
              <TableCell>757.817.228-07</TableCell>
              <TableCell>Rua Nice, 110A, Jardim Mediterrâneo, 06708-710, Cotia - SP</TableCell>
              <TableCell>Rex | Maia</TableCell>
              <TableCell>
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
      </TableContainer>
    </BaseLayoutPage>
  );
};