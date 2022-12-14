import { useState } from 'react';
import * as yup from 'yup';
import { LayoutPageAuth } from '../../shared/layouts';
import { Box, Button, Card, CardActions, CardContent, TextField, Typography, CircularProgress } from '@mui/material';
import { useAuthContext } from '../../shared/contexts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

export const ForgotPassword: React.FC = () => {
  const { forgotPassword } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  
  const handleSubmit = () => {
    setIsLoading(true);
  
    forgotPasswordSchema
      .validate({ email }, { abortEarly: false })
      .then(dadosValidados => {
        forgotPassword(dadosValidados.email)
          .then((result) => {
            if (result === 'Network Error') {
              setIsLoading(false);
              setEmail('');
              toast.error('Ocorreu um problema, tente novamente!', {
                position: toast.POSITION.BOTTOM_CENTER
              });
              navigate('/400');
            } else if (result === 400) {
              setIsLoading(false);
              setEmail('');
              toast.error('Ocorreu um problema, tente novamente!', {
                position: toast.POSITION.BOTTOM_CENTER
              });
              navigate('/400');
            } else if (result === 401) {
              setIsLoading(false);
              setEmail('');
              toast.error('Ocorreu um problema, tente novamente!', {
                position: toast.POSITION.BOTTOM_CENTER
              });
              navigate('/401');
            } else if (result === 403) {
              setIsLoading(false);
              setEmail('');
              toast.error('Ocorreu um problema, tente novamente!', {
                position: toast.POSITION.BOTTOM_CENTER
              });
              navigate('/403');
            } else if (result === 404) {
              setIsLoading(false);
              setEmail('');
              toast.error('Ocorreu um problema, tente novamente!', {
                position: toast.POSITION.BOTTOM_CENTER
              });
              navigate('/500');
            } else if (result === 500) {
              setIsLoading(false);
              setEmail('');
              toast.error('Ocorreu um problema, tente novamente!', {
                position: toast.POSITION.BOTTOM_CENTER
              });
              navigate('/500');
            } else if (result === 200) {
              setIsLoading(false);
              toast.success('Verifique seu e-mail!', {
                position: toast.POSITION.BOTTOM_CENTER
              });
              navigate('/login');
            }
          })
          .catch(() => {
            toast.error('Ocorreu um problema, tente novamente!', {
              position: toast.POSITION.BOTTOM_CENTER
            });
          });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);
  
        errors.inner.forEach(error => {
          setEmailError(error.message);
        });
      });
  };

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
                N??o tem problema, s?? precisamos do e-mail cadastrado.
              </Typography>
            
              <TextField
                variant="outlined"
                fullWidth
                name='email'
                type='email'
                label='E-mail'
                value={email}
                disabled={isLoading}
                error={!!emailError}
                helperText={emailError}
                onKeyDown={() => setEmailError('')}
                onChange={e => setEmail(e.target.value)}
              />

            </Box>
          </CardContent>
          <CardActions>
            <Box 
              width='100%' 
              display='flex' 
              gap={2} 
              alignItems='center' 
              justifyContent='center' 
              sx={{ marginLeft: { xs: 1, sm: 2 }, marginRight: { xs: 1, sm: 2 }, marginBottom: { xs: 1, sm: 2 }, flexDirection: { xs: 'column', md: 'row'}  }}
            >

              <Button
                variant='contained'
                disabled={isLoading}
                onClick={goBack}
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

              <Button
                variant='contained'
                disabled={isLoading}
                onClick={handleSubmit}
                endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}
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