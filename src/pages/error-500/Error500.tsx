import { LayoutPageError } from '../../shared/layouts';
import { ReactComponent as ImageError500 } from '../../assets/error500.svg';
import { Theme, useMediaQuery, useTheme } from '@mui/material';

export const Error500: React.FC = () => {
  const down350 = useMediaQuery((theme: Theme) => theme.breakpoints.down(350));
  const mddown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const theme = useTheme();

  return (
    <LayoutPageError 
      image={<ImageError500 
        height={theme.spacing(down350 ? 30 : mddown ? 40 : mdUp ? 70 : lgUp ? 80 : 100)} 
        width={theme.spacing(down350 ? 30 : mddown ? 40 : mdUp ? 70 : lgUp ? 80 : 100)}/>}
    ></LayoutPageError>
  );
};
