import { LayoutPageAuth } from '../../shared/layouts';
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';

export const ForgotPassword: React.FC = () => {
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
                Esqueceu a senha?
              </Typography>

              <Typography variant='subtitle2'>
                Não tem problema, só precisamos do e-mail cadastrado.
              </Typography>
            
              <TextField
                fullWidth 
                id="forgot-password-e-mail" 
                label="E-mail" 
                variant="outlined"
                type='email'
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
                Redefinir Senha
                </Typography>
              </Button>

            </Box>
          </CardActions>
        </Card>}
    ></LayoutPageAuth>
  );
};