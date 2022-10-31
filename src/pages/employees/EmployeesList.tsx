import { useEffect, useMemo, useState } from 'react';
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ListTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';

import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment';
import { EmployeesService, IListEmployee } from '../../shared/services/api/employees/EmployeesService';


export const EmployeesList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListEmployee[]>([]);
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
      EmployeesService.getAll(page, search)
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
      title={'Funcionários'}
      toolbar={
        <ListTools
          showInputSearch
          searchText={search}
          onClickButtonAdd={() => navigate('/funcionarios/inserir')}
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
              <TableCell>Data de Nascimento</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell>Status</TableCell>
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
                <TableCell>{row.birthDate}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.active}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => navigate(`/funcionarios/atualizar/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/funcionarios/detalhe/${row.id}`)}>
                    <Icon>visibility</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))} */}
            <TableRow>
              <TableCell>Edmilson Cruz de Padua</TableCell>
              <TableCell>edmilson.padua@gmail.com</TableCell>
              <TableCell>(11) 98247-7223</TableCell>
              <TableCell>868.224.618-09</TableCell>
              <TableCell>17/10/1989</TableCell>
              <TableCell>Recepcionista</TableCell>
              <TableCell>Ativo</TableCell>
              <TableCell>
                <IconButton size="small" onClick={() => navigate('/funcionarios/atualizar/1')}>
                  <Icon>edit</Icon>
                </IconButton>
                <IconButton size="small" onClick={() => navigate('/funcionarios/detalhe/1')}>
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
                <TableCell colSpan={8}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
            {(totalCount > 0 && totalCount > Environment.ROW_LIMIT) && (
              <TableRow>
                <TableCell colSpan={8}>
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