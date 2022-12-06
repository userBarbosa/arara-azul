import { LayoutPageAuth } from '../../shared/layouts';
import { Box, Button, Card, CardActions, CardContent, CircularProgress, InputAdornment, TextField, Typography, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { useAuthContext } from '../../shared/contexts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

YupPassword(yup);

const resetPasswordSchema = yup.object().shape({
  newPassword: yup.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .minLowercase(1, 'Senha deve conter pelo menos 1 letra minúscula')
    .minUppercase(1, 'Senha deve conter pelo menos 1 letra maiúscula')
    .minNumbers(1, 'Senha deve conter pelo menos 1 número')
    .minSymbols(1, 'Senha deve conter pelo menos 1 carácter especial')
    .required('Este campo é obrigatório'),
  confirmNewPassword: yup.string()
    .required('Este campo é obrigatório.')
    .oneOf([yup.ref('newPassword')], 'As senhas não correspondem.')
});

export const ResetPassword: React.FC = () => {
  const { resetPassword } = useAuthContext();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleMouseDownNewPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleClickShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const handleMouseDownConfirmNewPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    setIsLoading(true);
    
    resetPasswordSchema
      .validate({ newPassword, confirmNewPassword }, { abortEarly: false })
      .then(dadosValidados => {
        resetPassword(dadosValidados.newPassword)
          .then((result) => {
            if (result === 'Network Error') {
              setIsLoading(false);
              setNewPassword('');
              setConfirmNewPassword('');
              toast.error('Ocorreu um problema, tente novamente!', {
                position: toast.POSITION.BOTTOM_CENTER
              });
              navigate('/400');
            } else if (result === 400) {
              setIsLoading(false);
              setNewPassword('');
              setConfirmNewPassword('');
              toast.error('Ocorreu um problema, tente novamente!', {
                position: toast.POSITION.BOTTOM_CENTER
              });
              navigate('/400');
            } else if (result === 401) {
              setIsLoading(false);
              setNewPassword('');
              setConfirmNewPassword('');
              toast.error('Ocorreu um problema, tente novamente!', {
                position: toast.POSITION.BOTTOM_CENTER
              });
              navigate('/401');
            } else if (result === 403) {
              setIsLoading(false);
              setNewPassword('');
              setConfirmNewPassword('');
              toast.error('Ocorreu um problema, tente novamente!', {
                position: toast.POSITION.BOTTOM_CENTER
              });
              navigate('/403');
            } else if (result === 404) {
              setIsLoading(false);
              setNewPassword('');
              setConfirmNewPassword('');
              toast.error('Ocorreu um problema, tente novamente!', {
                position: toast.POSITION.BOTTOM_CENTER
              });
              navigate('/500');
            } else if (result === 500) {
              setIsLoading(false);
              setNewPassword('');
              setConfirmNewPassword('');
              toast.error('Ocorreu um problema, tente novamente!', {
                position: toast.POSITION.BOTTOM_CENTER
              });
              navigate('/500');
            } else if (result === 200) {
              setIsLoading(false);
              setNewPassword('');
              setConfirmNewPassword('');
              toast.success('Senha alterada com sucesso!', {
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
          if (error.path === 'newPassword') {
            setNewPasswordError(error.message);
          } else if (error.path === 'confirmNewPassword') {
            setConfirmNewPasswordError(error.message);
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
              Redefinir Senha
              </Typography>
  

              <TextField
                fullWidth
                name='password'
                label="Nova Senha" 
                variant="outlined"
                value={newPassword}
                disabled={isLoading}
                error={!!newPasswordError}
                helperText={newPasswordError}
                onKeyDown={() => setNewPasswordError('')}
                onChange={e => setNewPassword(e.target.value)}
                type={showNewPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: 
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownNewPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>,
                }}
              />


              <TextField
                fullWidth
                name='password'
                label="Confirmar Nova Senha" 
                variant="outlined"
                value={confirmNewPassword}
                disabled={isLoading}
                error={!!confirmNewPasswordError}
                helperText={confirmNewPasswordError}
                onKeyDown={() => setConfirmNewPasswordError('')}
                onChange={e => setConfirmNewPassword(e.target.value)}
                type={showConfirmNewPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: 
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmNewPassword}
                        onMouseDown={handleMouseDownConfirmNewPassword}
                        edge="end"
                      >
                        {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
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
                  Atualizar
                </Typography>
              </Button>
  
            </Box>
          </CardActions>
        </Card>
      }
    ></LayoutPageAuth>
  );
};