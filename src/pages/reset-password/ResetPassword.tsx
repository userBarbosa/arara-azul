import { LayoutPageAuth } from '../../shared/layouts';
import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
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
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');
    
  const handleSubmit = () => {
    setIsLoading(true);
    
    resetPasswordSchema
      .validate({ newPassword, confirmNewPassword }, { abortEarly: false })
      .then(dadosValidados => {
        resetPassword(dadosValidados.newPassword, dadosValidados.confirmNewPassword)
          .then(() => {
            setIsLoading(false);
            toast.success('Senha alterada com sucesso!', {
              position: toast.POSITION.BOTTOM_CENTER
            });
            navigate('/login');
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
                type='password'
                value={newPassword}
                disabled={isLoading}
                error={!!newPasswordError}
                helperText={newPasswordError}
                onKeyDown={() => setNewPasswordError('')}
                onChange={e => setNewPassword(e.target.value)}
              />


              <TextField
                fullWidth
                name='password'
                label="Confirmar Nova Senha" 
                variant="outlined"
                type='password'
                value={confirmNewPassword}
                disabled={isLoading}
                error={!!confirmNewPasswordError}
                helperText={confirmNewPasswordError}
                onKeyDown={() => setConfirmNewPasswordError('')}
                onChange={e => setConfirmNewPassword(e.target.value)}
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