import { Box, Button, Paper, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { BaseLayoutPage } from '../../shared/layouts';

export const PatientDetails: React.FC = () => {
  const mddown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const theme = useTheme();

  return (
    <BaseLayoutPage
      title={'Detalhes Paciente'}
    >
      <Box
        margin={2}
        padding={1}
        height={theme.spacing(mddown ? 150 : mdUp ? 100 : 150)} 
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
              Kauã Claudino Loureiro
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Nome:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Maia
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Data de Nascimento:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              30/11/2020
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Tipo Sanguineo:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              DEA 3
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Sexo:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Fêmea
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Espécie:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Cachorro
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Em Tratamento:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Não
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Alergias:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Abelha
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Peso:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              8 kg
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

        <Box margin={2}>
          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }}>
            <Button
              variant="contained"
              disableElevation
              fullWidth
              sx={{ marginRight: { xs: 0, md: 1 }, marginBottom: { xs: 1, md: 0 } }}
            >
              <Typography
                variant='button'
                overflow='hidden'
                whiteSpace='nowrap'
                textOverflow='ellipsis'
              >
                  Voltar
              </Typography>
            </Button>
            <Button
              variant="contained"
              disableElevation
              fullWidth
              sx={{ marginLeft: { xs: 0, md: 1 }, marginTop: { xs: 1, md: 0 } }}
            >
              <Typography
                variant='button'
                overflow='hidden'
                whiteSpace='nowrap'
                textOverflow='ellipsis'
              >
                  Prontuário
              </Typography>
            </Button>
          </Box>

        </Box>

      </Box>
    </BaseLayoutPage>
  );
};