import React from 'react';
import { Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import {
  Tabs,
  Tab,
  Box,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Content, PageWithHeader, SupportButton } from '@backstage/core-components';
import { DashboardsComponent } from '@itsyndicate/backstage-plugin-aws-metricdashboards';
import { MarkdownPage } from './Docs';


// Define custom styles using Material-UI's styled API
const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const TabContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

/**
 * MonitoringPage
 * Main page component that includes tab navigation and routes to different monitoring sections.
 */
export const MonitoringPage = () => {
  const location = useLocation();

  // Determine the active tab based on the current path
  const getActiveTab = () => {
    if (location.pathname.startsWith('/monitoring/metrics')) return '/monitoring/metrics';
    return '/monitoring'; // Default to Overview
  };

  const activeTab = getActiveTab();

  return (
    <PageWithHeader themeId="tool" title="Monitoring, Logging and Alerting">
      <Content>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
          <TabNavigation activeTab={activeTab} />
          <SupportButton>Project monitoring page.</SupportButton>
        </div>
        <TabContent>
          <Routes>
            <Route path="/" element={<DashboardsComponent />} />
            <Route path="*" element={<Navigate to="/monitoring" replace />} />
            <Route path='/docs' element={<MarkdownPage fileName={'/home.md'} />}/>
          </Routes>
        </TabContent>
      </Content>
    </PageWithHeader>
  );
};


/**
 * TabNavigation
 * Component for rendering navigation tabs.
 */
const TabNavigation = ({ activeTab }: { activeTab: string }) => (
  <StyledTabs
    value={activeTab}
    aria-label="monitoring navigation tabs"
    indicatorColor="primary"
    textColor="primary"
    variant="scrollable"
    scrollButtons="auto"
  >
    <Tab label="Overview" value="/monitoring" component={Link} to="/monitoring" />
    <Tab label="Docs" value="/monitoring/docs" component={Link} to="/monitoring/docs" />
  </StyledTabs>
);