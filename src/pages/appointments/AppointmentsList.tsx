import { useEffect, useMemo, useState } from 'react';
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ListTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';

import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment';
import { AppointmentsService, IListAppointment } from '../../shared/services/api/appointments/AppointmentsService';


export const AppointmentsList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListAppointment[]>([]);
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
      AppointmentsService.getAll(page, search)
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
      title={'Consultas'}
      toolbar={
        <ListTools
          showInputSearch
          searchText={search}
          onClickButtonAdd={() => navigate('/consultas/inserir')}
          onChangeSearchText={text => setSearchParams({ search: text, page: '1' }, { replace: true })}
        />
      }
    >
      <TableContainer component={Paper} variant="outlined" sx={{ m: 2, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Horário</TableCell>
              <TableCell>Motivo</TableCell>
              <TableCell>Médico</TableCell>
              <TableCell>Tutor</TableCell>
              <TableCell>Paciente</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Pagamento</TableCell>

              <TableCell width={100}>Opções</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.reason}</TableCell>
                <TableCell>{row.employeeId}</TableCell>
                <TableCell>{row.ownerId}</TableCell>
                <TableCell>{row.patientId}</TableCell>
                <TableCell>{row.appointmentState}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>

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
              <TableCell>20/08/2022</TableCell>
              <TableCell>15:30</TableCell>
              <TableCell>Acupuntura</TableCell>
              <TableCell>Lorenna Veiga Salomão</TableCell>
              <TableCell>Kauã Claudino Loureiro</TableCell>
              <TableCell>Rex</TableCell>
              <TableCell>Realizada</TableCell>
              <TableCell>PIX</TableCell>
              <TableCell>
                <IconButton size="small" onClick={() => navigate('/consultas/atualizar/1')}>
                  <Icon>edit</Icon>
                </IconButton>
                <IconButton size="small" onClick={() => navigate('/consultas/detalhe/1')}>
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
                <TableCell colSpan={9}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
            {(totalCount > 0 && totalCount > Environment.ROW_LIMIT) && (
              <TableRow>
                <TableCell colSpan={9}>
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