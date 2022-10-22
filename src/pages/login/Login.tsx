import { LayoutPageAuth } from '../../shared/layouts';
import { Box, Button, Card, CardActions, CardContent, Link, TextField, Typography } from '@mui/material';

export const Login: React.FC = () => {


  return (
    <LayoutPageAuth 
      form={
        <Card sx={{ borderRadius: 2, bgcolor: 'background.paper', width: { xs: 250, sm: 400 } }}> 
          <CardContent>
            <Box 
              display='flex' 
              flexDirection='column' 
              gap={2} 
              sx={{ marginLeft: { xs: 1, sm: 2 }, marginRight: { xs: 1, sm: 2 }, marginTop: { xs: 1, sm: 2 }  }}
            >
  
              <Typography variant='h6'>
                Login
              </Typography>
              
              <TextField
                fullWidth 
                id="login-email" 
                label="E-mail" 
                variant="outlined"
                type='email'
              />
  
              <TextField
                fullWidth 
                id="login-password" 
                label="Senha" 
                variant="outlined"
                type='password'
              />
            </Box>
          </CardContent>
          <CardActions>
            <Box 
              width='100%' 
              display='flex' 
              flexDirection='column' 
              gap={2} 
              alignItems='center' 
              justifyContent='center' 
              sx={{ marginLeft: { xs: 1, sm: 2 }, marginRight: { xs: 1, sm: 2 }, marginBottom: { xs: 1, sm: 2 }  }}
            >
  

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
                  Entrar
                </Typography>
              </Button>
  

              <Link underline="hover" href="/esqueceu-sua-senha">              
                <Typography
                  variant='button'
                  overflow='hidden'
                  whiteSpace='nowrap'
                  textOverflow='ellipsis'
                >
                  Esqueceu a senha?
                </Typography></Link>
  
            </Box>
          </CardActions>
        </Card>
      }
    ></LayoutPageAuth>
  );
};