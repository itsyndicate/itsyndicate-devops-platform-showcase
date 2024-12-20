/*
 * Hi!
 *
 * Note that this is an EXAMPLE Backstage backend. Please check the README.
 *
 * Happy hacking!
 */

import { createBackend } from '@backstage/backend-defaults';

import { gitlabPlugin,  catalogPluginGitlabFillerProcessorModule,} from '@immobiliarelabs/backstage-plugin-gitlab-backend'
const backend = createBackend();

backend.add(import('@backstage/plugin-app-backend/alpha'));
backend.add(import('@backstage/plugin-proxy-backend/alpha'));
backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));
backend.add(import('@roadiehq/scaffolder-backend-module-utils/new-backend'));
backend.add(import('@backstage/plugin-scaffolder-backend-module-gitlab'));

backend.add(import('@backstage/plugin-techdocs-backend/alpha'));

// auth plugin
backend.add(import('@backstage/plugin-auth-backend'));
// See https://backstage.io/docs/backend-system/building-backends/migrating#the-auth-plugin
backend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));
// See https://backstage.io/docs/auth/guest/provider

// catalog plugin
backend.add(import('@backstage/plugin-catalog-backend/alpha'));
backend.add(
  import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'),
);

// See https://backstage.io/docs/features/software-catalog/configuration#subscribing-to-catalog-errors
backend.add(import('@backstage/plugin-catalog-backend-module-logs'));

// permission plugin
backend.add(import('@backstage/plugin-permission-backend/alpha'));
// See https://backstage.io/docs/permissions/getting-started for how to create your own permission policy
backend.add(
  import('@backstage/plugin-permission-backend-module-allow-all-policy'),
);

// search plugin
backend.add(import('@backstage/plugin-search-backend/alpha'));

// search engine
// See https://backstage.io/docs/features/search/search-engines
backend.add(import('@backstage/plugin-search-backend-module-pg/alpha'));

// search collators
backend.add(import('@backstage/plugin-search-backend-module-catalog/alpha'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs/alpha'));

// kubernetes
backend.add(import('@backstage/plugin-kubernetes-backend/alpha'));


// Changes
backend.add(import('@backstage/plugin-catalog-backend-module-gitlab/alpha'));
backend.add(import('@backstage/plugin-catalog-backend-module-gitlab-org'));
backend.add(import('@backstage/plugin-auth-backend-module-gitlab-provider'))

backend.add(import('@rsc-labs/backstage-highlights-plugin-backend'));

// backend.add(import('@aws/cost-insights-plugin-for-backstage-backend'));
backend.add(gitlabPlugin);
backend.add(catalogPluginGitlabFillerProcessorModule);
backend.add(import('@itsyndicate/backstage-plugin-s3-tfstate-parser-backend'));
backend.add(import('@itsyndicate/backstage-plugin-aws-health-backend'));
backend.add(import('@itsyndicate/backstage-plugin-aws-resources-backend'));
backend.add(import('@itsyndicate/backstage-plugin-user-links-backend')); 
backend.add(import('@itsyndicate/backstage-plugin-aws-metricdashboards-backend'));

backend.start();
