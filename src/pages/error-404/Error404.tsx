import { useNavigate } from 'react-router-dom';
import { LayoutPageError } from '../../shared/layouts';
import { ReactComponent as ImageError404 } from '../../assets/error404.svg';
import { Theme, useMediaQuery, useTheme } from '@mui/material';

export const Error404: React.FC = () => {
  const down350 = useMediaQuery((theme: Theme) => theme.breakpoints.down(350));
  const mddown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const theme = useTheme();
  
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <LayoutPageError 
      image={<ImageError404 
        height={theme.spacing(down350 ? 30 : mddown ? 40 : mdUp ? 70 : lgUp ? 80 : 100)} 
        width={theme.spacing(down350 ? 30 : mddown ? 40 : mdUp ? 70 : lgUp ? 80 : 100)}/>}
      showButton 
      buttonText='Voltar'
      onClickButton={goBack}
    ></LayoutPageError>
  );
};
