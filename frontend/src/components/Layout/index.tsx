import { FC, useState } from 'react';
import { Location, Outlet, useLocation } from 'react-router-dom';
import TopBarComponent from '../TopBar';
import { useMediaQuery } from '@mui/material';
import SideBarComponent from '../SideBar';
import { MainSection, RootBox } from './styles';

const LayoutComponent: FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location: Location = useLocation();
  const isNonMobile = useMediaQuery('(min-width:760px)');
  return location.pathname === '/login' || location.pathname === '/register' ? (
    <>
      <Outlet />
    </>
  ) : (
    <RootBox
      display={isNonMobile ? 'flex' : 'block'}
      width="100%"
      height="100%"
      justifyContent="space-between"
    >
      <SideBarComponent
        isNonMobile={isNonMobile}
        drawerWidth={'250px'}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <MainSection>
        <TopBarComponent
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isNonMobile={isNonMobile}
        />
        <Outlet />
      </MainSection>
    </RootBox>
  );
};

export default LayoutComponent;
