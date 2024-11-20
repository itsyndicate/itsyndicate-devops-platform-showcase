import React from 'react';
import { Content, PageWithHeader, SupportButton } from '@backstage/core-components';
import { Box, Grid, Typography } from '@mui/material'; // Updated import from @mui/material
// import { JiraUserIssuesViewCard } from '@axis-backstage/plugin-jira-dashboard';

// const Gitlab = () => {
//   return (
//     <div>
//       <h3>Gitlab Issues</h3>
//       <ul>
//         <li>Here will be placed your assigned issues</li>
//         <li>Current state: Production, in paid package</li>
//       </ul>
//     </div>
//   );
// };

export const TaskPage = () => {
  return (
    <PageWithHeader themeId="component" title="Task Management">
      {/* Increase right padding to push the button further to the right */}

      <Content>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '40px', paddingTop: '10px' }}>
          <SupportButton>Tasks on the project.</SupportButton>
        </div>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item md={12} xs={12}>
            <Typography variant="h4">Here you can provide your task management extentions</Typography>
          </Grid>
        </Grid>
      </Content>
    </PageWithHeader>
  );
};

