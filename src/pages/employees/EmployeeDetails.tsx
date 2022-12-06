import { useEffect, useState } from 'react';
import { Box, Paper, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';
import { EmployeesService, IDetailEmployee } from '../../shared/services/api/employees/EmployeesService';
import { activeBooleanToString, activeStringToString, formatDateToString, formatDocumentNumber, formatPhoneNumber, removeInvalidCharacters, typeStringToStringPtBr, specialtyStringToString, specialtyNumberToString } from '../../shared/helpers';

export const EmployeeDetails: React.FC = () => {
  const mddown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const theme = useTheme();
  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const [data, setData] = useState<IDetailEmployee>({
    id: id!,
    name: '',
    email: '',
    type: '',
    phoneNumber: '',
    documentNumber: '',
    medicalLicense: '',
    specialty:0,
    active: true,
    birthDate: undefined,
    observation: '',
  });

  const getTokenCurrentUser = () => {
    const _user = localStorage.getItem('APP_USER');
  
    if (_user) {
      const obj = JSON.parse(_user);
      return obj.token;
    }
  };

  useEffect(() => {
    EmployeesService.getById(id!, getTokenCurrentUser())
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
          navigate('/404');
        } else if (result.status === 500) {
          navigate('/500');
        } else if (result.status === 200) {
          setData(result.data);
        }
      });
  }, []);

  return (
    <BaseLayoutPage
      title={'Detalhes Funcionário'}
      toolbar={
        <DetailTools 
          showButtonReturn
          onClickButtonReturn={() => navigate('/funcionarios')}
        />}
    >
      <Box
        margin={2}
        padding={1}
        height={theme.spacing(mddown ? 110 : mdUp ? 90 : 110)} 
        component={Paper}
        display='flex'
        alignItems='stretch'
        justifyContent='space-between'
        sx={{flexDirection: 'column'}}
      >
        <Box margin={2}>
          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Nome: 
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.name === undefined || data.name === null ? '' : data.name}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              E-mail:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
            {data.email === undefined || data.email === null ? '' : data.email}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Telefone:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.phoneNumber === undefined || data.phoneNumber === null ? '' : formatPhoneNumber(removeInvalidCharacters(data.phoneNumber))}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              CPF:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.documentNumber === undefined || data.documentNumber === null ? '' : formatDocumentNumber(removeInvalidCharacters(data.documentNumber))}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Data de Nascimento:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
             {data.birthDate === undefined || data.birthDate === null ? '' : formatDateToString(data.birthDate)}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Cargo:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
            {data.type === undefined || data.type === null ? '' : typeStringToStringPtBr(data.type)}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Especialidade:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.specialty === undefined || data.specialty === null ? '' : specialtyStringToString(specialtyNumberToString(data.specialty!))}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              CRMV:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.medicalLicense === undefined || data.medicalLicense === null ? '' : data.medicalLicense}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Status:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
            {data.active === undefined || data.active === null ? '' : activeStringToString(activeBooleanToString(data.active))}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Observação:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.observation === undefined || data.observation === null ? '' : data.observation}
            </Typography>
          </Box>
          
        </Box>

      </Box>
    </BaseLayoutPage>
  );
};