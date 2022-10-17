import { useNavigate } from 'react-router-dom';
import { LayoutPageError } from '../../shared/layouts';
import { ReactComponent as ImageError403 } from '../../assets/error403.svg';
import { Theme, useMediaQuery, useTheme } from '@mui/material';

export const Error403: React.FC = () => {
  const down350 = useMediaQuery((theme: Theme) => theme.breakpoints.down(350));
  const mddown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const theme = useTheme();
  
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/home');
  };

  return (
    <LayoutPageError 
      image={<ImageError403 
        height={theme.spacing(down350 ? 30 : mddown ? 40 : mdUp ? 70 : lgUp ? 80 : 100)} 
        width={theme.spacing(down350 ? 30 : mddown ? 40 : mdUp ? 70 : lgUp ? 80 : 100)}/>}
      showButton 
      buttonText='Home'
      onClickButton={navigateHome}
    ></LayoutPageError>
  );
};
