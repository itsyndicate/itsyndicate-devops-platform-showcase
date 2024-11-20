import React from 'react';
import { Route } from 'react-router-dom';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
  CatalogTable,
  CatalogTableColumnsFunc,
} from '@backstage/plugin-catalog';
import './global.css'
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { orgPlugin } from '@backstage/plugin-org';
import { SearchPage } from '@backstage/plugin-search';
import {
  TechDocsIndexPage,
  techdocsPlugin,
  TechDocsReaderPage,
} from '@backstage/plugin-techdocs';
import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
import { ReportIssue } from '@backstage/plugin-techdocs-module-addons-contrib';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { apis } from './apis';
import { entityPage } from './components/catalog/EntityPage';
import { searchPage } from './components/search/SearchPage';
import { Root } from './components/Root';
import { RbacPage } from '@janus-idp/backstage-plugin-rbac';

import {
  AlertDisplay,
  OAuthRequestDialog,
  SignInPage,
} from '@backstage/core-components';
import { gitlabAuthApiRef } from '@backstage/core-plugin-api';

import { createApp } from '@backstage/app-defaults';
import { AppRouter, FlatRoutes } from '@backstage/core-app-api';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { RequirePermission } from '@backstage/plugin-permission-react';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';
import { costInsightsAwsPlugin } from '@aws/cost-insights-plugin-for-backstage';
import { themes, UnifiedThemeProvider } from '@backstage/theme';
import { TechRadarPage } from '@backstage-community/plugin-tech-radar';
import { ToolboxPage } from '@drodil/backstage-plugin-toolbox';
export { grafanaPlugin } from '@backstage-community/plugin-grafana';
import { CostInsightsPage } from '@backstage-community/plugin-cost-insights';
import { SecurityPage } from './components/customs/SecurityPage';
import { MonitoringPage } from './components/customs/MonitoringPage';
import { TaskPage } from './components/customs/TaskPage';
import {Billing} from './components/customs/BillingPage';
import {Hosting} from './components/customs/HostPage';
import { HomepageCompositionRoot } from '@backstage/plugin-home';

import { HomePage } from './components/home/HomePage';
const myColumnsFunc: CatalogTableColumnsFunc = entityListContext => {
  if (entityListContext.filters.kind?.value === 'MyKind') {
    return [
      CatalogTable.columns.createNameColumn(),
      CatalogTable.columns.createOwnerColumn(),
    ];
  }

  return CatalogTable.defaultColumnsFunc(entityListContext);
};
const app = createApp({
  apis,
  plugins: [costInsightsAwsPlugin],
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
      viewTechDoc: techdocsPlugin.routes.docRoot,
      createFromTemplate: scaffolderPlugin.routes.selectedTemplate,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
      viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
  components: {
    SignInPage: props => (
      <SignInPage
        {...props}
        providers={[
          'guest',
          {
            id: 'gitlab-auth-provider',
            title: 'GitLab',
            message: 'Sign in using GitLabb',
            apiRef: gitlabAuthApiRef,
          },
        ]}
      />
    ),
  },
  themes: [
    {
      id: 'light',
      title: 'Light',
      variant: 'light',
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={themes.light} children={children} />
      ),
    },
    {
      id: 'dark',
      title: 'Dark',
      variant: 'dark',
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={themes.dark} children={children} />
      ),
    },
  ],
});

const routes = (
  <FlatRoutes>
    <Route path="/" element={<HomepageCompositionRoot />}>
      <HomePage />
    </Route>
    <Route
      path="/catalog"
      element={
        <CatalogIndexPage
          initiallySelectedFilter="all"
          initiallySelectedNamespaces={['default']}
        />
      }
    />
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/costs/cost-insights" element={<CostInsightsPage />} />
    <Route path="/rbac" element={<RbacPage />} />;
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route path = "/toolbox" element = {<ToolboxPage />} />
    <Route path="/taskpage" element={<TaskPage />} />
    <Route path="/costs" element={<Billing />} />
    <Route path="/hosting" element={<Hosting />} />
    <Route
      path="/docs/:namespace/:kind/:name/*"
      element={<TechDocsReaderPage />}
    >
      <TechDocsAddons>
        <ReportIssue />
      </TechDocsAddons>
    </Route>
    <Route path="/create" element={
      <ScaffolderPage
        groups={[
          {
            title: "AWS Environments and Environment Providers",
            filter: entity =>
              (entity?.metadata?.tags?.includes('environment-provider') || entity?.metadata?.tags?.includes('aws-environment')) ?? false,
          },
          {
            title: "AWS Resources",
            filter: entity =>
              entity?.metadata?.tags?.includes('aws-resource') ?? false,
          },
        ]}
      />
    } />
    <Route
      path="/catalog-import"
      element={
        <RequirePermission permission={catalogEntityCreatePermission}>
          <CatalogImportPage />
        </RequirePermission>
      }
    />
    <Route path="/search" element={<SearchPage />}>
      {searchPage}
    </Route>
    <Route
      path="/tech-radar"
      element={<TechRadarPage width={1500} height={800} />}
    />
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/catalog-graph" element={<CatalogGraphPage />} />

<Route path="/security" element={<SecurityPage />} />
<Route path="/monitoring" element={<MonitoringPage />} />
  </FlatRoutes>
);

export default app.createRoot(
  <>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </>,
);
