import { createContext, useCallback, useContext, useState } from 'react';

interface ISideMenuOption {
  icon: string;
  path: string;
  label: string;
}

interface ISideMenuContextData {
  isSideMenuOpen: boolean;
  toggleSideMenuOpen: () => void;
  sideMenuOptions: ISideMenuOption[];
  setSideMenuOptions: (newSideMenuOptions: ISideMenuOption[]) => void;
}

const SideMenuContext = createContext({} as ISideMenuContextData);

interface ISideMenuProps {
  children: React.ReactNode;
}

export const useSideMenuContext = () => {
  return useContext(SideMenuContext);
};

export const SideMenuProvider: React.FC<ISideMenuProps> = ({ children }) => {
  const [sideMenuOptions, setSideMenuOptions] = useState<ISideMenuOption[]>([]);
  const [isSideMenuOpen, setisSideMenuOpen] = useState(false);

  const toggleSideMenuOpen = useCallback(() => {
    setisSideMenuOpen((oldIsSideMenuOpen) => !oldIsSideMenuOpen);
  }, []);

  const handleSetSideMenuOptions = useCallback((newSideMenuOptions: ISideMenuOption[]) => {
    setSideMenuOptions(newSideMenuOptions);
  }, []);

  return (
    <SideMenuContext.Provider value={{ isSideMenuOpen, sideMenuOptions, toggleSideMenuOpen, setSideMenuOptions: handleSetSideMenuOptions }}>
      {children}
    </SideMenuContext.Provider>
  );
};
