import { useEffect, useState } from 'react';
import { Box, Paper, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';
import { IDetailTutor, TutorsService } from '../../shared/services/api/tutors/TutorsService';
import { formatDocumentNumber, formatPhoneNumber, formatZipCode, removeInvalidCharacters } from '../../shared/helpers';

export const TutorDetails: React.FC = () => {
  const mddown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const theme = useTheme();
  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const [data, setData] = useState<IDetailTutor>({
    id: id!,
    name: '',
    email: '',
    documentNumber: '',
    phoneNumber: '',
    observation: '',
    patientsName: [''],
    address: {
      zipCode: '',
      state: '',
      city: '',
      neighborhood: '',
      streetName: '',
      number: '',
      complement: '',
    }
  });

  const getTokenCurrentUser = () => {
    const _user = localStorage.getItem('APP_USER');
  
    if (_user) {
      const obj = JSON.parse(_user);
      return obj.token;
    }
  };

  useEffect(() => {
    TutorsService.getById(id!, getTokenCurrentUser())
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
          navigate('/500');
        } else if (result.status === 500) {
          navigate('/500');
        } else if (result.status === 200) {
          setData(result.data);
        }
      });
  }, []);

  return (
    <BaseLayoutPage
      title={'Detalhes Tutor'}
      toolbar={
        <DetailTools 
          showButtonReturn
          onClickButtonReturn={() => navigate('/tutores')}
        />}
    >
      <Box
        margin={2}
        padding={1}
        height={theme.spacing(mddown ? 130 : mdUp ? 90 : 130)} 
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
              {data.phoneNumber === undefined || data.phoneNumber === null ? '' : formatPhoneNumber(removeInvalidCharacters(data.phoneNumber!))}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Documento:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.documentNumber === undefined || data.documentNumber === null ? '' : formatDocumentNumber(removeInvalidCharacters(data.documentNumber!))}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              CEP:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.address?.zipCode === undefined || data.address?.zipCode === null ? '' : formatZipCode(removeInvalidCharacters(data.address?.zipCode!))}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Estado:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.address?.state === undefined || data.address?.state === null ? '' : data.address?.state!}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Cidade:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.address?.city === undefined || data.address?.city === null ? '' : data.address?.city!}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Bairro:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.address?.neighborhood === undefined || data.address?.neighborhood === null ? '' : data.address?.neighborhood!}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Endereço:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.address?.streetName === undefined || data.address?.streetName === null ? '' : data.address?.streetName!}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Número:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.address?.number === undefined || data.address?.number === null ? '' : data.address?.number!}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Complemento:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.address?.complement === undefined || data.address?.complement === null ? '' : data.address?.complement!}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Pacientes:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.patientsName === undefined || data.patientsName === null ? '' : data.patientsName.join(' | ')}
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