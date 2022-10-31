import { Box, Paper, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DetailTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';

export const EmployeeDetails: React.FC = () => {
  const mddown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const theme = useTheme();
  const navigate = useNavigate();

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
              Edmilson Cruz de Padua
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              E-mail:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              edmilson.padua@gmail.com
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Telefone:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              (11) 98247-7223
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              CPF:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              868.224.618-09
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Data de Nascimento:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              17/10/1989
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Cargo:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Recepcionista
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Especialidade:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              CRMV:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: { xs: 0, md: 2 } }}>
              Status:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Ativo
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