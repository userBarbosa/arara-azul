import { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CircularProgress, Link, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { LayoutPageAuth } from '../../shared/layouts';
import { useAuthContext } from '../../shared/contexts';
import { toast } from 'react-toastify';

YupPassword(yup);

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .minLowercase(1, 'Senha deve conter pelo menos 1 letra minúscula')
    .minUppercase(1, 'Senha deve conter pelo menos 1 letra maiúscula')
    .minNumbers(1, 'Senha deve conter pelo menos 1 número')
    .minSymbols(1, 'Senha deve conter pelo menos 1 carácter especial')
    .required('Este campo é obrigatório'),
});

export const Login: React.FC = () => {
  const { login } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    setIsLoading(true);

    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then(dadosValidados => {
        login(dadosValidados.email, dadosValidados.password)
          .then(() => {
            setIsLoading(false);
            toast.success('Seja Bem-vindo(a)!', {
              position: toast.POSITION.BOTTOM_CENTER
            });
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
          if (error.path === 'email') {
            setEmailError(error.message);
          } else if (error.path === 'password') {
            setPasswordError(error.message);
          }
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
                Login
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
  
              <TextField
                variant="outlined"
                fullWidth
                name='password'
                label='Senha'
                value={password}
                disabled={isLoading}
                error={!!passwordError}
                helperText={passwordError}
                onKeyDown={() => setPasswordError('')}
                onChange={e => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: 
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>,
                }}
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