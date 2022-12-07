import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { BaseLayoutPage } from '../../shared/layouts';
import { ReactComponent as ImageLogo } from '../../assets/logo.svg';
import { SliderCard } from '../../shared/components';
import { formatDateCardDash, formatDateToString } from '../../shared/helpers';
import { useNavigate } from 'react-router-dom';
import { AppointmentsService, IListAppointment } from '../../shared/services/api/appointments/AppointmentsService';

export const Home: React.FC = () => {
  const down350 = useMediaQuery((theme: Theme) => theme.breakpoints.down(350));
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const navigate = useNavigate();
  const theme = useTheme();

  const date = formatDateCardDash();
  
  const [data, setData] = useState<IListAppointment[]>([]);

  const getTokenCurrentUser = () => {
    const _user = localStorage.getItem('APP_USER');
  
    if (_user) {
      const obj = JSON.parse(_user);
      return obj.token;
    }
  };

  useEffect(() => {
    AppointmentsService.getAll(getTokenCurrentUser())
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
      title={'Home'}
    >
      <Box width='100%' display='flex'>

        <Grid container margin={2}>
          <Grid item container spacing={2}>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Card sx={{ bgcolor: '#EDF7FF' }}>
                <CardContent>
                  <Box padding={1} display='flex' alignItems='center' sx={{ flexDirection: { xs: 'column', md: 'row'}, justifyContent: { xs: 'center', md: 'space-evenly'} }}>
                    <Box>
                      <Typography variant='h6'>
                      Bem-vindo de volta!
                      </Typography>
                      <Typography variant='subtitle2' marginTop={4}>
                        {date}
                      </Typography>
                    </Box>
                    <Box>
                      <ImageLogo
                        height={theme.spacing(down350 ? 30 : lgDown ? 30 : 40)}
                        width={theme.spacing(down350 ? 30 : lgDown ? 30 : 40)} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Card sx={{ minHeight: { xs: 300, lg: 380}, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CardContent>
                  <Box padding={1} display='flex' alignItems='center' sx={{ flexDirection: { xs: 'column', md: 'row'}, justifyContent: { xs: 'center', md: 'space-evenly'} }}>
                    <Box alignItems='center'>
                      <Typography variant='h4' sx={{ textTransform: 'uppercase', fontWeight: 500, color: '#00335C' }}>
                      Total de Consultas Para Hoje:
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='h1' sx={{ color: '#006BBF', fontWeight: 700, marginLeft: { xs: 0, md: 10 } }}>
                        {data.filter((appointment)  => formatDateToString(appointment.date!) === formatDateToString(new Date())).length}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Grid>

      </Box>
      <Box width='100%' display='flex'>
        <SliderCard />
      </Box>
    </BaseLayoutPage>
  );
};
