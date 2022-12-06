import { useEffect, useState } from 'react';
import { Box, Paper, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';
import { IDetailPatient, PatientsService } from '../../shared/services/api/patients/PatientsService';
import { allergyNumberToString, allergyStringToString, formatDateToString, onTreatmentBooleanToString, onTreatmentStringToString, sexNumberToString, sexStringToString, specieNumberToString, specieStringToString } from '../../shared/helpers';
import { IDetailTutor, TutorsService } from '../../shared/services/api/tutors/TutorsService';

export const PatientDetails: React.FC = () => {
  const mddown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const theme = useTheme();
  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const [data, setData] = useState<IDetailPatient>({
    id: id!,
    tutorId: '',
    name: '',
    bloodType: '',
    observation: '',
    species: 0,
    allergy: 0,
    sex: 0,
    birthDate: undefined,
    onTreatment: true,
    weight: 0,
  });

  const [tutor, setTutor] = useState<IDetailTutor>({
    id: data.tutorId!,
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
    PatientsService.getById(id!, getTokenCurrentUser())
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

    TutorsService.getById(data.tutorId!, getTokenCurrentUser())
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
        setTutor(result.data);
      }
    });
  }, []);


  return (
    <BaseLayoutPage
      title={'Detalhes Paciente'}
      toolbar={
        <DetailTools 
          showButtonReturn 
          onClickButtonReturn={() => navigate('/pacientes')}
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
              Tutor:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {tutor.name === undefined || tutor.name === null ? '' : tutor.name}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Nome:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.name === undefined || data.name === null ? '' : data.name}
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
              Tipo Sanguineo:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.bloodType === undefined || data.bloodType === null ? '' : data.bloodType}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Sexo:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.sex === undefined || data.sex === null ? '' : sexStringToString(sexNumberToString(data.sex))}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Espécie:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.species === undefined || data.species === null ? '' : specieStringToString(specieNumberToString(data.species))}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Em Tratamento:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.onTreatment === undefined || data.onTreatment === null ? '' : onTreatmentStringToString(onTreatmentBooleanToString(data.onTreatment))}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Alergias:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.allergy === undefined || data.allergy === null ? '' : allergyStringToString(allergyNumberToString(data.allergy))}
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Peso:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              {data.weight === undefined || data.weight === null ? '' : `${data.weight} kg`}
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