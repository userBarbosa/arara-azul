import { Box, Button, Paper, Typography, useTheme } from '@mui/material';
import { BaseLayoutPage } from '../../shared/layouts';

export const EmployeeDetails: React.FC = () => {
  const theme = useTheme();

  return (
    <BaseLayoutPage
      title={'Detalhes Funcionário'}
    >
      <Box
        marginX={2}
        padding={1}
        paddingX={1}
        gap={1}
        height={theme.spacing(100)}
        component={Paper}
        display='flex'
        alignItems='stretch'
        justifyContent='space-between'
        sx={{flexDirection: 'column'}}
      >
        <Box margin={2} padding={1}>
          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: 2 }}>
              Nome Completo: 
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Edmilson Cruz de Padua
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: 2 }}>
              E-mail:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              edmilson.padua@gmail.com
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: 2 }}>
              Telefone:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              (11) 98247-7223
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: 2 }}>
              CPF:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              868.224.618-09
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: 2 }}>
              Data de Nascimento:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              17/10/1989
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: 2 }}>
              Cargo:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Recepcionista
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: 2 }}>
              Especialidade:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: 2 }}>
              CRMV:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: 2 }}>
              Status:
            </Typography>
            <Typography variant='body2' sx={{ color: '#000000' }}>
              Ativo
            </Typography>
          </Box>

          <Box display='flex' sx={{ flexDirection: { xs: 'column', md: 'row'} }} marginTop={3}>
            <Typography variant='body2' sx={{ color: '#9E9E9E', fontWeight: 600, marginRight: 2 }}>
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