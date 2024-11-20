import { useState } from 'react';
import { Grid, Tabs, Tab, Box, Typography } from '@material-ui/core';
import { Content, PageWithHeader, SupportButton } from '@backstage/core-components';
import {  styled } from '@material-ui/core/styles';
import React from 'react';
import { Resources } from '@itsyndicate/backstage-plugin-s3-tfstate-parser'
import { AwsResourcesWidget } from '@itsyndicate/backstage-plugin-aws-resources';
import { MarkdownPage } from './Docs';
const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));
const Overview = () => (

      <Grid item xs={12} md={12}>
        <AwsResourcesWidget />
      </Grid>
);


export const Hosting = () => {
  const [activeTab, setActiveTab] = useState('overview'); // Default tab is "overview"

  const handleChange = (_event: any, newValue: React.SetStateAction<string>) => {
    setActiveTab(newValue);
  };

  return (
    <PageWithHeader themeId="tool" title="Hosting Information">
      <Content>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
          <StyledTabs value={activeTab} onChange={handleChange} aria-label="billing navigation tabs" indicatorColor="primary" textColor="primary" variant="scrollable" scrollButtons="auto">
            <Tab label="Overview" value="overview" />
            <Tab label="AWS Developments" value="aws-app-development" />
            <Tab label="Docs" value="docs" />
          </StyledTabs>
          <SupportButton>Hosting page.</SupportButton>
          </div>

        <Grid container spacing={3}>
          {activeTab === 'overview' && (
            <Grid item xs={12}>
              <Overview />
            </Grid>
          )}
          {activeTab === 'aws-app-development' && (
            <Grid item xs={12}>
              <Resources />
            </Grid>
          )}

          {activeTab === 'docs' && (
            <Grid item xs={12}>
              <MarkdownPage fileName={'/home.md'} />
            </Grid>
          )}
        </Grid>
      </Content>
    </PageWithHeader>
  );
};
