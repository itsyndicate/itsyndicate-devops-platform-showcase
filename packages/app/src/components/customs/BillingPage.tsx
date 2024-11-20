import { useState, useEffect } from 'react';
import { Grid, Tabs, Tab, Box, Typography } from '@material-ui/core';
import { Content, PageWithHeader, SupportButton } from '@backstage/core-components';
import { CostInsightsPage } from '@backstage-community/plugin-cost-insights';
import {  styled } from '@material-ui/core/styles';
import React from 'react';
import { MarkdownPage } from './Docs';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const CustomCostInsightsPage = () => {
  useEffect(() => {
    const hideHeader = () => {
      const headers = document.getElementsByTagName('header');
      if (headers.length > 1) {
        headers[1].style.display = 'none';
      }
    };

    // Delay hiding the header to ensure it’s fully loaded
    const timeoutId = setTimeout(hideHeader, 25); // Adjust time if needed

    return () => clearTimeout(timeoutId); // Clean up on component unmount
  }, []);

  return (
        <CostInsightsPage />
  );
};
export default CustomCostInsightsPage;

export const Billing = () => {
  const [activeTab, setActiveTab] = useState('overview'); // Default tab is "overview"

  const handleChange = (_event: any, newValue: React.SetStateAction<string>) => {
    setActiveTab(newValue);
  };

  return (
    <PageWithHeader themeId="library" title="Billing Information">
      <Content>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <StyledTabs value={activeTab} onChange={handleChange} aria-label="billing navigation tabs" indicatorColor="primary" textColor="primary" variant="scrollable" scrollButtons="auto">
            <Tab label="Overview" value="overview" />
            <Tab label="Docs" value="docs" />
          </StyledTabs>
          <SupportButton>Billing page.</SupportButton>
          </div>

        <Grid container spacing={3}>
          {activeTab === 'overview' && (
            <Grid item xs={12}>
              <CustomCostInsightsPage />
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
