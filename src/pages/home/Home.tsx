import { Box, Card, CardContent, Grid, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { BaseLayoutPage } from '../../shared/layouts';
import { ReactComponent as ImageLogo } from '../../assets/logo.svg';
import { SliderCard } from '../../shared/components';

export const Home: React.FC = () => {
  const down350 = useMediaQuery((theme: Theme) => theme.breakpoints.down(350));
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const theme = useTheme();
  
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
                      Hoje é 20 de agosto de 2022.
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
                        20
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
