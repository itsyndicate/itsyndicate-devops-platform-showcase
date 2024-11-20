import type { Entity } from '@backstage/catalog-model';
import { catalogConditions, createCatalogConditionalDecision, createCatalogPermissionRule } from '@backstage/plugin-catalog-backend/alpha';
import { PermissionPolicy, PolicyQuery, PolicyQueryUser, createConditionFactory } from '@backstage/plugin-permission-node';
import { AuthorizeResult, PolicyDecision, isResourcePermission } from '@backstage/plugin-permission-common';
import { z } from 'zod';

export const isInSystemRule = createCatalogPermissionRule({
  name: 'IS_IN_SYSTEM',
  description: 'Checks if an entity is part of the system provided',
  resourceType: 'catalog-entity',
  paramsSchema: z.object({
    systemRef: z
      .string()
      .describe('SystemRef to check the resource is part of'),
  }),
  apply: (resource: Entity, { systemRef }) => {
    if (!resource.relations) {
      return false;
    }

    return resource.relations
      .filter(relation => relation.type === 'partOf')
      .some(relation => relation.targetRef === systemRef);
  },
  toQuery: ({ systemRef }) => ({
    key: 'relations.partOf',
    values: [systemRef],
  }),
});

const isInSystem = createConditionFactory(isInSystemRule);
class CustomPermissionPolicy implements PermissionPolicy {
  async handle(
    request: PolicyQuery,
    user?: PolicyQueryUser,
  ): Promise<PolicyDecision> {
    if (isResourcePermission(request.permission, 'catalog-entity')) {
      return createCatalogConditionalDecision(
        request.permission,
        {
          anyOf: [
            catalogConditions.isEntityOwner({
              claims: user?.info.ownershipEntityRefs ?? [],
            }),
            isInSystem({ systemRef: 'interviewing' }),
          ],
        },
      );
    }

    return { result: AuthorizeResult.ALLOW };
  }
}