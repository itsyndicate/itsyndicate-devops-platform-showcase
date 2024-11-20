import React from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import { Grid, Tabs, Tab, Typography } from '@material-ui/core';
import { Content, PageWithHeader, SupportButton } from '@backstage/core-components';
import { AwsHealthComponent } from '@itsyndicate/backstage-plugin-aws-health-dashboard';
import { MarkdownPage } from './Docs';

const Overview = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <AwsHealthComponent />
    </Grid>
  </Grid>
);

const TabNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Tabs
      value={currentPath}
      aria-label="security navigation tabs"
      variant="scrollable"
      indicatorColor="primary"
      textColor="primary"
    >
      <Tab label="Overview" value="/security" component={Link} to="/security" />
      <Tab label="Docs" value="/security/docs" component={Link} to="/security/docs" />
    </Tabs>
  );
};

// Main Security Page Component
export const SecurityPage = () => (
  <PageWithHeader themeId="tool" title="Security and Compliance">
    <Content>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <TabNavigation />
        <SupportButton>Project security page.</SupportButton>
      </div>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path='/docs' element={<MarkdownPage fileName={'/home.md'} />}/>
      </Routes>
    </Content>
  </PageWithHeader>
);