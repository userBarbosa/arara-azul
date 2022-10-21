import { Box } from '@mui/material';
import { ReactComponent as ImageLogo } from '../../assets/logo.svg';
import { Theme, useMediaQuery, useTheme } from '@mui/material';

interface ILayoutPageAuthProps {
  form: React.ReactNode;
}

export const LayoutPageAuth: React.FC<ILayoutPageAuthProps> = ({ 
  form,
}) => {
  const down350 = useMediaQuery((theme: Theme) => theme.breakpoints.down(350));
  const mddown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const theme = useTheme();

  return (
    <Box
      height='100%'
      width='100%'
      display= 'flex'
      alignItems= 'center'
      bgcolor={'#EDF7FF'}
      sx={{ flexDirection: { xs: 'column', md: 'row'}, justifyContent: { xs: 'center', md: 'space-evenly'} }}
    >
      <Box>
        <ImageLogo
          height={theme.spacing(down350 ? 30 : mddown ? 40 : mdUp ? 70 : lgUp ? 80 : 100)}
          width={theme.spacing(down350 ? 30 : mddown ? 40 : mdUp ? 70 : lgUp ? 80 : 100)} />
      </Box>
      <Box display='flex' alignItems= 'center' justifyContent='center'>
        {form}
      </Box>
    </Box>
  );
};
