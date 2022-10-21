import { Box, Button, Card, CardActions, CardContent, Icon, Link, Paper, Skeleton, TextField, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';

interface IFormAuthProps {
  cardTitle: string;

  cardSubtitle?: string;
  showCardSubtitle?: boolean;
  
  showInputLoginEmail?: boolean;
  showInputLoginPassword?: boolean;
  showLinkForgotYourPassword?: boolean;
  showButtonLogOn?: boolean;
  onClickButtonLogOn?: () => void;

  showInputForgotYourPasswordEmail?: boolean;
  showButtonPasswordReset?: boolean;
  onClickButtonPasswordReset?: () => void;

  showInputNewPassword?: boolean;
  showInputConfirmNewPassword?: boolean;
  showButtonUpdatePassword?: boolean;
  onClickButtonUpdatePassword?: () => void;
}

export const FormAuth: React.FC<IFormAuthProps> = ({
  cardTitle,

  cardSubtitle,
  showCardSubtitle = false,

  showInputLoginEmail = false,
  showInputLoginPassword = false,
  showLinkForgotYourPassword = false,
  showButtonLogOn = false,
  onClickButtonLogOn,

  showInputForgotYourPasswordEmail = false,
  showButtonPasswordReset = false,
  onClickButtonPasswordReset,

  showInputNewPassword = false,
  showInputConfirmNewPassword = false,
  showButtonUpdatePassword = false,
  onClickButtonUpdatePassword,
}) => {
  return (
    <Card sx={{ borderRadius: 2, bgcolor: 'background.paper', width: { xs: 250, sm: 400 } }}> 
      <CardContent>
        <Box 
          display='flex' 
          flexDirection='column' 
          gap={2} 
          sx={{ marginLeft: { xs: 1, sm: 2 }, marginRight: { xs: 1, sm: 2 }, marginTop: { xs: 1, sm: 2 }  }}
        >

          <Typography variant='h6'>
            {cardTitle}
          </Typography>

          {(showCardSubtitle) && (
            <Typography variant='subtitle2'>
              {cardSubtitle}
            </Typography>)}
            
          {(showInputLoginEmail) && (
            <TextField
              fullWidth 
              id="login-e-mail" 
              label="E-mail" 
              variant="outlined"
            />)}

          {(showInputLoginPassword) && (
            <TextField
              fullWidth 
              id="login-password" 
              label="Senha" 
              variant="outlined"
              type='password'
            />)}

          {(showInputForgotYourPasswordEmail) && (
            <TextField
              fullWidth 
              id="forgot-password-e-mail" 
              label="E-mail" 
              variant="outlined"
            />)}

          {(showInputNewPassword) && (
            <TextField
              fullWidth 
              id="reset-password" 
              label="Nova Senha" 
              variant="outlined"
              type='password'
            />)}

          {(showInputConfirmNewPassword) && (
            <TextField
              fullWidth 
              id="reset-password-confirm" 
              label="Confirmar Nova Senha" 
              variant="outlined"
              type='password'
            />)}

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

          {(showButtonLogOn) && (
            <Button
              onClick={onClickButtonLogOn}
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
            </Button>)}

          {(showLinkForgotYourPassword) && (
            <Link underline="hover" href="/esqueceu-sua-senha">              
              <Typography
                variant='button'
                overflow='hidden'
                whiteSpace='nowrap'
                textOverflow='ellipsis'
              >
                Esqueceu a senha?
              </Typography></Link>)}

          {(showButtonPasswordReset) && (
            <Button
              onClick={onClickButtonPasswordReset}
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
            </Button>)}

          {(showButtonUpdatePassword) && (
            <Button
              onClick={onClickButtonUpdatePassword}
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
                Atualizar
              </Typography>
            </Button>)}

        </Box>
      </CardActions>
    </Card>
  );
};
