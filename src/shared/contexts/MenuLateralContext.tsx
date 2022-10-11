import { createContext, useCallback, useContext, useState } from 'react';

interface IMenuLateralContextData {
  isMenuOpen: boolean;
  toggleMenuOpen: () => void;
}

const MenuLateralContext = createContext({} as IMenuLateralContextData);

interface IMenuLateralProps {
  children: React.ReactNode;
}

export const useMenuLateralContext = () => {
  return useContext(MenuLateralContext);
};

export const MenuLateralProvider: React.FC<IMenuLateralProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuOpen = useCallback(() => {
    setIsMenuOpen((oldIsMenuOpen) => !oldIsMenuOpen);
  }, []);

  return (
    <MenuLateralContext.Provider value={{ isMenuOpen, toggleMenuOpen }}>
      {children}
    </MenuLateralContext.Provider>
  );
};
