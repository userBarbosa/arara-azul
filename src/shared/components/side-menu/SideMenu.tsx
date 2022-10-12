import { Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useSideMenuContext } from '../../contexts/SideMenuContext';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface ISideMenuProps {
  children: React.ReactNode;
}

interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch(resolvedPath.pathname);

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon sx={{ color: '#F7F9FC' }}>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const SideMenu: React.FC<ISideMenuProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isSideMenuOpen, sideMenuOptions, toggleSideMenuOpen } = useSideMenuContext();

  return (
    <>
      <Drawer open={isSideMenuOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleSideMenuOpen}>
        <Box bgcolor={theme.palette.primary.main} color={theme.palette.primary.contrastText} width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
          <Box flex={1}>
            <List component="nav">
              {sideMenuOptions.map(sideMenuOption => (
                <ListItemLink
                  to={sideMenuOption.path}
                  key={sideMenuOption.path}
                  icon={sideMenuOption.icon}
                  label={sideMenuOption.label}
                  onClick={smDown ? toggleSideMenuOpen : undefined}
                />
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};