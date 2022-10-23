import { Box, Button, Paper, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { BaseLayoutPage } from '../../shared/layouts';

export const TutorDetails: React.FC = () => {
  const mddown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const theme = useTheme();

  return (
    <BaseLayoutPage
      title={'Detalhes Tutor'}
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
              Nome Completo: 
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Kauã Claudino Loureiro
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Telefone:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              (11) 98028-7824
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              E-mail:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              kaua.loureiro@gmail.com
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Documento:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              757.817.228-07
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              CEP:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              06708-710
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Estado:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              SP
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Cidade:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Cotia
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Bairro:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Jardim Mediterrâneo
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Endereço:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Rua Nice
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Número:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              110A
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Complemento:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Pacientes:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Rex | Maia 
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
          <Button
            variant="contained"
            disableElevation
            fullWidth
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
        </Box>

      </Box>
    </BaseLayoutPage>
  );
};