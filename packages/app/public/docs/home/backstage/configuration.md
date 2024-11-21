---
title: Configuration
---

## Plugins Overview

Backstage is a highly extensible platform that relies on plugins to provide different functionalities. Plugins can be categorized into two main types:

- **Frontend Plugins**: These plugins are responsible for rendering UI components and interacting with users. They usually fetch data from backend services and display it in the form of dashboards, metrics, or other visual components.
- **Backend Plugins**: These plugins provide backend services, handling business logic, data processing, or integrations with third-party systems. Backend plugins typically provide REST APIs or other data interfaces that frontend plugins or other systems consume.

For more details on plugins, visit the official [Backstage Plugin Documentation](https://backstage.io/docs/backend-system/architecture/plugins).

### Adding Plugins

#### Frontend Plugins

Frontend plugins are integrated into the Backstage UI and are responsible for presenting data to the user. To add a frontend plugin:

1. **Install the plugin via Yarn**:

   ```bash
   yarn --cwd packages/app add @backstage/plugin-xyz
   ```
2. **Register the plugin in `App.tsx`**: Open the `App.tsx` file, and register the plugin's page or routes.

   ```tsx
   import { xyzPlugin } from '@backstage/plugin-xyz';
   // Next line optional
   const app = createApp({
     components: {
       Router: BrowserRouter,
     },
     plugins: [
       // Other plugins
       xyzPlugin,            
     ],
   });
   ```
3. **Add the plugin to the routing structure**: For example, you can add a custom route for the plugin page.

   ```tsx
   <Route path="/xyz" element={<XyzPage />} />
   ```

Refer to [Backstage's Plugin Configuration Guide](https://backstage.io/docs/getting-started/configure-app-with-plugins) for further details.

#### Backend Plugins

Backend plugins handle server-side operations, including interactions with external services, authentication, and data processing. To add a backend plugin:

1. **Install the plugin via Yarn**:

   ```bash
   yarn --cwd packages/backend add @backstage/plugin-xyz-backend
   ```
2. **Register the plugin in the backend `index.ts`**: Open the `packages/backend/src/index.ts` file and add the new plugin route.

   ```typescript
   backend.add(import('@backstage/plugin-xyz-backend'));
   
   ```
3. **Configure the plugin in `app-config.yaml`**: Add the necessary configuration options for the backend plugin.

   ```yaml
   xyz:
     apiUrl: 'https://xyz-service.com/api'
     apiKey: ${XYZ_API_KEY}
   ```

For more details on defining backend plugins, visit the [official Backstage documentation on backend plugins](https://backstage.io/docs/backend-system/architecture/plugins#defining-a-plugin).

---

## `app-config.yaml` Configuration

The `app-config.yaml` file is the central configuration file in a Backstage application. It is used to configure plugins, database settings, authentication providers, and other application-wide settings. Below are some key sections of the configuration file:

### 1. Database Configuration

Backstage supports various database systems (e.g., SQLite, PostgreSQL). To configure the database, update the `app-config.yaml` as follows:

```yaml
backend:
  database:
    client: 'pg' # Use 'sqlite3' for SQLite, 'pg' for PostgreSQL
    connection:
      host: localhost
      user: backstage_user
      password: backstage_pass
      database: backstage_db
```

For more details, refer to the [Backstage Database Configuration Documentation](https://backstage.io/docs/getting-started/config/database).

### 2. Authentication Configuration

Backstage supports several authentication providers such as GitHub, Google, GitLab, and others. To configure an authentication provider (e.g., GitLab):

```yaml
auth:
  environment: development
  providers:
    gitlab:
      development:
        clientId: ${AUTH_GITLAB_CLIENT_ID}
        clientSecret: ${AUTH_GITLAB_CLIENT_SECRET}
        audience: https://gitlab.com
```

Check out the [Backstage Authentication Configuration Documentation](https://backstage.io/docs/getting-started/config/authentication) for more details.

### 3. Plugin-Specific Configuration

Each plugin can have its own section in the `app-config.yaml` to manage configurations such as API keys, URLs, or service-specific settings. Here’s an example of how you might configure a plugin:

```yaml
# Configuration for AWS Cost Insights plugin
costInsights:
  aws:
    accountId: ${AWS_ACCOUNT_ID}
    region: us-east-1
```

To learn more, visit [Configuring Plugins in Backstage](https://backstage.io/docs/integrations/).

---