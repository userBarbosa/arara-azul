import { Box, Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { SideMenu } from '../components/side-menu/SideMenu';
import { useSideMenuContext } from '../contexts';

interface IBaseLayoutPageProps {
  children: React.ReactNode;
  title: string;
  toolbar?: React.ReactNode; 
}

export const BaseLayoutPage: React.FC<IBaseLayoutPageProps> = ({ children, title, toolbar }) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const theme = useTheme();

  const { toggleSideMenuOpen } = useSideMenuContext();
  
  return (
    <>
      <SideMenu/>
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        <Box height='100%' display='flex' flexDirection='column' gap={1}>
          <Box padding={1} height={theme.spacing(smDown ? 5 : mdDown ? 6 : 7)} display='flex' alignItems='center' gap={1}>
            {smDown && (
              <IconButton onClick={toggleSideMenuOpen}>
                <Icon>menu</Icon>
              </IconButton>
            )}

            <Typography 
              sx={{fontWeight: 600}}
              variant={smDown ? 'h6' : mdDown ? 'h5' : 'h4'}
              overflow='hidden'
              whiteSpace='nowrap'
              textOverflow='ellipsis'
              color={theme.palette.primary.main}
            >
              {title}
            </Typography>
          </Box>

          {toolbar && (<Box>
            {toolbar}
          </Box>)}
      
          <Box flex={1} overflow='auto'>
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};
