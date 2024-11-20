import {
  ScmIntegrationsApi,
  scmIntegrationsApiRef,
  ScmAuth,
} from '@backstage/integration-react';
import {
  AnyApiFactory,
  configApiRef,
  createApiFactory,
  discoveryApiRef,
  identityApiRef,
} from '@backstage/core-plugin-api';
import { costInsightsApiRef, ExampleCostInsightsClient } from '@backstage-community/plugin-cost-insights';
import { tfStateApiRef, TfStateApiClient} from '@itsyndicate/backstage-plugin-s3-tfstate-parser';
import { userLinksApiRef, UserLinksClient } from '@itsyndicate/backstage-plugin-user-links';
import { awsHealthApiRef, AwsHealthClient } from '@itsyndicate/backstage-plugin-aws-health-dashboard';
import { automaticDashboardApiRef, AutomaticDashboardClient } from '@itsyndicate/backstage-plugin-aws-metricdashboards';
import { awsResourcesApiRef, AwsResourcesClient } from '@itsyndicate/backstage-plugin-aws-resources';

export const apis: AnyApiFactory[] = [
  createApiFactory({
    api: scmIntegrationsApiRef,
    deps: { configApi: configApiRef },
    factory: ({ configApi }) => ScmIntegrationsApi.fromConfig(configApi),
  }),
  createApiFactory({
    api: automaticDashboardApiRef,
    deps: {
      discoveryApi: discoveryApiRef,
      identityApi: identityApiRef,
    },
    factory: ({ discoveryApi, identityApi }) =>
      new AutomaticDashboardClient(discoveryApi, identityApi),
  }),
  createApiFactory({
      api: awsResourcesApiRef,
      deps: { discoveryApi: discoveryApiRef, identityApi: identityApiRef },
      factory: ({ discoveryApi, identityApi }) => new AwsResourcesClient(discoveryApi, identityApi),
    }),
  createApiFactory({
    api: userLinksApiRef,
    deps: {
      discoveryApi: discoveryApiRef,
      identityApi: identityApiRef,
    },
    factory: ({ discoveryApi, identityApi }) =>
      new UserLinksClient({ discoveryApi, identityApi }),
  }),
  createApiFactory({
    api: tfStateApiRef,
    deps: { discoveryApi: discoveryApiRef, identityApi: identityApiRef },
    factory: ({ discoveryApi, identityApi }) =>
      new TfStateApiClient(discoveryApi, identityApi),
  }),
  createApiFactory({
    api: awsHealthApiRef,
    deps: {
      discoveryApi: discoveryApiRef,
      identityApi: identityApiRef,
    },
    factory: ({ discoveryApi, identityApi }) =>
      new AwsHealthClient({ discoveryApi, identityApi }),
  }),
  createApiFactory(costInsightsApiRef, new ExampleCostInsightsClient()),
  ScmAuth.createDefaultApiFactory(),
];
