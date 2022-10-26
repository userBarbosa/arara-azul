import { useEffect, useMemo, useState } from 'react';
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ListTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';

import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment';
import { IListPatient, PatientsService } from '../../shared/services/api/patients/PatientsService';


export const PatientsList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListPatient[]>([]);
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
      PatientsService.getAll(page, search)
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
      title={'Pacientes'}
      toolbar={
        <ListTools
          showInputSearch
          searchText={search}
          onClickButtonAdd={() => navigate('/pacientes/inserir')}
          onChangeSearchText={text => setSearchParams({ search: text, page: '1' }, { replace: true })}
        />
      }
    >
      <TableContainer component={Paper} variant="outlined" sx={{ m: 2, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Tutor</TableCell>
              <TableCell>Espécie</TableCell>
              <TableCell>Data de Nascimento</TableCell>
              <TableCell>Sexo</TableCell>
              <TableCell>Em tratamento</TableCell>
              <TableCell width={100}>Opções</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.tutor}</TableCell>
                <TableCell>{row.specie}</TableCell>
                <TableCell>{row.birthDate}</TableCell>
                <TableCell>{row.sex}</TableCell>
                <TableCell>{row.treatment}</TableCell>
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
              <TableCell>Maia</TableCell>
              <TableCell>Kauã Claudino Loureiro</TableCell>
              <TableCell>Cachorro</TableCell>
              <TableCell>30/11/2020</TableCell>
              <TableCell>Fêmea</TableCell>
              <TableCell>Não</TableCell>
              <TableCell>
                <IconButton size="small" onClick={() => navigate('/pacientes/atualizar/1')}>
                  <Icon>edit</Icon>
                </IconButton>
                <IconButton size="small" onClick={() => navigate('/pacientes/detalhe/1')}>
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