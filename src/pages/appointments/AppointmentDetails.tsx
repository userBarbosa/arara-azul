import { Box, Paper, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DetailTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';

export const AppointmentDetails: React.FC = () => {
  const mddown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <BaseLayoutPage
      title={'Detalhes Consulta'}
      toolbar={
        <DetailTools 
          showButtonReturn 
          onClickButtonReturn={() => navigate('/consultas')}
          showButtonMedicalRecord 
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
              Data:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              20/08/2022
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Horário:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              15:30
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Tutor:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Kauã Claudino Loureiro
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Paciente:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Rex
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Motivo:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Acupuntura
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Médico:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Lorenna Veiga Salomão
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Valor:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              R$ 250,00
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Pagamento:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              PIX
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Status:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Realizada
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Observação:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
            </Typography>
          </Box>
          
        </Box>

      </Box>
    </BaseLayoutPage>
  );
};