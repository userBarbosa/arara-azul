import { Drawer, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AdminPanelSettings, EventAvailable, FolderShared, Home, Pets } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMenuLateralContext } from '../../contexts/MenuLateralContext';

interface IMenuLateralProps {
    children: React.ReactNode;
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isMenuOpen, toggleMenuOpen } = useMenuLateralContext();

  return (
    <>
      <Drawer open={isMenuOpen} variant={smDown ? 'temporary' : 'permanent'}  onClose={toggleMenuOpen}>
        <Box bgcolor={theme.palette.primary.main} color={theme.palette.primary.contrastText} width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
          <Box flex={1}>
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <Home sx={{ color: '#F7F9FC'}}/>
                </ListItemIcon>
                <ListItemText primary="Home"/>
              </ListItemButton>
            </List>
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <EventAvailable sx={{ color: '#F7F9FC'}}/>
                </ListItemIcon>
                <ListItemText primary="Consultas"/>
              </ListItemButton>
            </List>
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <Pets sx={{ color: '#F7F9FC'}}/>
                </ListItemIcon>
                <ListItemText primary="Pacientes"/>
              </ListItemButton>
            </List>
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <FolderShared sx={{ color: '#F7F9FC'}}/>
                </ListItemIcon>
                <ListItemText primary="Tutores"/>
              </ListItemButton>
            </List>
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <AdminPanelSettings sx={{ color: '#F7F9FC'}}/>
                </ListItemIcon>
                <ListItemText primary="Funcionários"/>
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        { children }
      </Box>
    </>
  );
};