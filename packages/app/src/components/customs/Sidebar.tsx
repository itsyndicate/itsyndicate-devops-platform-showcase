import React from 'react';
import {
  DEFAULT_NAMESPACE,
  stringifyEntityRef,
} from '@backstage/catalog-model';
import {
  SidebarItem,
  SidebarSubmenu,
  SidebarSubmenuItem,
} from '@backstage/core-components';
import {
  IconComponent,
  identityApiRef,
  useApi,
  useRouteRef,
} from '@backstage/core-plugin-api';
import useAsync from 'react-use/esm/useAsync';
import {
  catalogApiRef,
  CatalogApi,
  entityRouteRef,
} from '@backstage/plugin-catalog-react';
import { getCompoundEntityRef } from '@backstage/catalog-model';

/**
 * MyServicesSidebarItem can be added to your sidebar providing quick access to all components where the user is a member of the owning group.
 *
 * @public
 */
export const MyServicesSidebarItem = (props: {
  singularTitle: string;
  pluralTitle: string;
  icon: IconComponent;
}) => {
  const { singularTitle, pluralTitle, icon } = props;

  const identityApi = useApi(identityApiRef);
  const catalogApi: CatalogApi = useApi(catalogApiRef);
  const catalogEntityRoute = useRouteRef(entityRouteRef);

  // Fetch all components and filter by components where the user is a member of the owning group
  const { value: services } = useAsync(async () => {
    const profile = await identityApi.getBackstageIdentity();
    const userEntityRef = profile.userEntityRef;

    const groupsResponse = await catalogApi.getEntities({
      filter: [
        { kind: 'group' },
        { 'relations.hasMember': userEntityRef },
      ],
      fields: ['metadata'],
    });
    const userGroups = groupsResponse.items.map(group => stringifyEntityRef(group));

    const response = await catalogApi.getEntities({
      filter: [
        { kind: 'component' },
      ],
      fields: ['metadata', 'kind', 'relations'],
    });

    return response.items.filter(component =>
      component.relations?.some(
        relation =>
          relation.type === 'ownedBy' && userGroups.includes(relation.targetRef)
      ),
    );
  }, []);

  // No services found
  if (!services?.length) {
    return null;
  }

  // Only one service found
  if (services.length === 1) {
    const service = services[0];
    return (
      <SidebarItem
        text={singularTitle}
        to={catalogEntityRoute(getCompoundEntityRef(service))}
        icon={icon}
      />
    );
  }

  // Multiple services found
  return (
    <SidebarItem icon={icon} text={pluralTitle}>
      <SidebarSubmenu title={pluralTitle}>
        {services?.map(function servicesMap(service) {
          return (
            <SidebarSubmenuItem
              title={service.metadata.title || service.metadata.name}
              subtitle={
                service.metadata.namespace !== DEFAULT_NAMESPACE
                  ? service.metadata.namespace
                  : undefined
              }
              to={catalogEntityRoute(getCompoundEntityRef(service))}
              icon={icon}
              key={stringifyEntityRef(service)}
            />
          );
        })}
      </SidebarSubmenu>
    </SidebarItem>
  );
};

/**
 * MyProfileSidebarItem can be added to your sidebar providing quick access to the user's profile.
 *
 * @public
 */
export const MyProfileSidebarItem = (props: { icon: IconComponent }) => {
  const { icon } = props;

  const identityApi = useApi(identityApiRef);

  // Fetch user's profile
  const { value: profile } = useAsync(async () => {
    const identity = await identityApi.getBackstageIdentity();
    return identity;
  }, []);

  // Return null if profile is not loaded
  if (!profile) {
    return null;
  }

  // Extract the username from userEntityRef, removing 'user:default/' prefix
  const username = profile.userEntityRef.split('/').pop(); // Extracts the part after 'user:default/'

  const profileLink = `/catalog/default/user/${username}`;

  return (
    <SidebarItem
      text="My Profile"
      to={profileLink}
      icon={icon}
    />
  );
};