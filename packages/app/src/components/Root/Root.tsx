import React, { PropsWithChildren } from 'react';
import CategoryIcon from '@material-ui/icons/Category';
import { makeStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
// import MapIcon from '@material-ui/icons/MyLocation';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
// import CreateComponentIcon from '@material-ui/icons/AddCircleOutline';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
import {
  Settings as SidebarSettings,
  UserSettingsSignInAvatar,
} from '@backstage/plugin-user-settings';
import { SidebarSearchModal } from '@backstage/plugin-search';
import {
  Sidebar,
  sidebarConfig,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarPage,
  SidebarScrollWrapper,
  SidebarSpace,
  useSidebarOpenState,
  Link,
  SidebarSubmenu,
  SidebarSubmenuItem,
} from '@backstage/core-components';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
// import CloudIcon from '@material-ui/icons/Cloud';
import { useApi, appThemeApiRef } from '@backstage/core-plugin-api';
import { MyGroupsSidebarItem } from '@backstage/plugin-org';
import { Administration } from '@janus-idp/backstage-plugin-rbac';
// import SchoolIcon from '@material-ui/icons/School';
import ConstructionIcon from '@mui/icons-material/Construction';
// import MoneyIcon from '@material-ui/icons/MonetizationOn';
import CodeIcon from '@material-ui/icons/Code';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { MyProfileSidebarItem, MyServicesSidebarItem } from '../customs/Sidebar'
import PaidIcon from '@mui/icons-material/Paid';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SecurityIcon from '@mui/icons-material/Security';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import PersonIcon from '@mui/icons-material/Person';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import DnsIcon from '@mui/icons-material/Dns';
const useSidebarLogoStyles = makeStyles({
  root: {
    width: '100%',
    height: 3 * sidebarConfig.logoHeight,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: -14,
  },
  link: {
    width: '100%',
    marginInline: '24px',
    display: 'flex',
    justifyContent: 'center'
  },
});

function getLogo(themeId: string) {
  switch (themeId) {
    default:
      return [<LogoFull />, <LogoIcon />];
  }
}
const SidebarLogo = () => {
  const appThemeApi = useApi(appThemeApiRef);
  const themeId = appThemeApi.getActiveThemeId();
  const classes = useSidebarLogoStyles();
  const { isOpen } = useSidebarOpenState();

  const [fullLogo, iconLogo] = getLogo(themeId ?? '');

  return (
    <div className={classes.root}>
      <Link to="/" underline="none" className={classes.link} aria-label="Home">
        {isOpen ? fullLogo : iconLogo}
      </Link>
    </div>
  );
};

export const Root = ({ children }: PropsWithChildren<{}>) => (
  <SidebarPage>
    <Sidebar>
      <SidebarLogo />
      <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
        <SidebarSearchModal />
        <SidebarItem icon={HomeIcon} to="/" text="Home" />
      </SidebarGroup>
      <SidebarDivider />
      <SidebarGroup label="Menu" icon={<MenuIcon />}>
        <MyGroupsSidebarItem
          singularTitle="Development"
          pluralTitle="Development"
          icon={DeveloperBoardIcon}
        />
        <SidebarItem icon={MonitorHeartIcon} to="monitoring" text="Monitoring" />
        <SidebarItem icon={SecurityIcon} to="security" text="Security" />
        <SidebarItem icon={PaidIcon} to="costs" text="Billing" />
        <SidebarItem icon={DnsIcon} to="hosting" text="Hosting" />
        <SidebarItem icon={AssignmentIcon} to="taskpage" text="Tasks" />
        <SidebarDivider />
        <SidebarGroup label="Tools" icon={<MenuIcon />}>
          <SidebarItem icon={ConstructionIcon} text="Tools">
            <SidebarSubmenu title="Tools">
              <SidebarSubmenuItem
                title="ToolBox"
                to="toolbox"
                icon={HomeRepairServiceIcon}
              />
            </SidebarSubmenu>
          </SidebarItem>
          <SidebarItem icon={LibraryBooks} to="docs" text="Docs" />
          <SidebarItem icon={CategoryIcon} to="catalog" text="Catalog" />

        </SidebarGroup>
        <SidebarDivider />
        <MyProfileSidebarItem
            icon={PersonIcon}
          />
        <MyServicesSidebarItem
            singularTitle="Repository"
            pluralTitle="Repositories"
            icon={CodeIcon}
          />
        
        

        {/* End global nav */}
        <SidebarDivider />
      </SidebarGroup>
      <SidebarSpace />
      <SidebarDivider />
      <SidebarGroup
        label="Settings"
        icon={<UserSettingsSignInAvatar />}
        to="/settings"
      > 
        <SidebarSettings />
        <SidebarScrollWrapper>
          <Administration />
        </SidebarScrollWrapper>
      </SidebarGroup>
      
    </Sidebar>
    {children}
  </SidebarPage>
);
