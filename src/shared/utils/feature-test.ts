import type { FeatureMetadata, NavigationConfig, RouteConfig } from "@/shared/types";

interface FeatureTestResult {
  valid: boolean;
  errors: string[];
}

export function validateFeatureConfig(feature: FeatureMetadata): FeatureTestResult {
  const errors: string[] = [];

  // Validate required fields
  if (!feature.id) errors.push('Feature ID is required');
  if (!feature.name) errors.push('Feature name is required');

  // Validate routes
  if (feature.routes) {
    feature.routes.forEach((route, index) => {
      if (!route.path) {
        errors.push(`Route at index ${index} is missing a path`);
      }
      if (!route.lazy && !route.Component) {
        errors.push(`Route at index ${index} must have either a lazy function or Component`);
      }
    });
  }

  // Validate navigation items
  if (feature.navigation) {
    feature.navigation.forEach((nav, index) => {
      if (!nav.id) {
        errors.push(`Navigation item at index ${index} is missing an id`);
      }
      if (!nav.title) {
        errors.push(`Navigation item at index ${index} is missing a title`);
      }
      if (nav.children?.length) {
        nav.children.forEach((child, childIndex) => {
          if (!child.id) {
            errors.push(`Child navigation item at index ${index}.${childIndex} is missing an id`);
          }
          if (!child.title) {
            errors.push(`Child navigation item at index ${index}.${childIndex} is missing a title`);
          }
        });
      }
    });
  }

  // Validate placement
  if (feature.placement && !['app', 'shell', 'hidden'].includes(feature.placement)) {
    errors.push('Invalid feature placement. Must be "app", "shell", or "hidden"');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function testFeatureRoutes(feature: FeatureMetadata): FeatureTestResult {
  const errors: string[] = [];

  if (!feature.routes?.length) {
    return { valid: true, errors: [] };
  }

  // Test for duplicate routes
  const paths = new Set<string>();
  feature.routes.forEach((route) => {
    if (!route.path) {
      errors.push('Route path is required');
      return;
    }
    if (paths.has(route.path)) {
      errors.push(`Duplicate route path found: ${route.path}`);
    }
    paths.add(route.path);
  });

  // Test for route parameter consistency
  feature.routes.forEach((route) => {
    if (!route.path) return;
    const params = route.path.match(/:[a-zA-Z]+/g) || [];
    if (params.length > 0) {
      const uniqueParams = new Set(params);
      if (params.length !== uniqueParams.size) {
        errors.push(`Route ${route.path} has duplicate parameters`);
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

export function testFeatureNavigation(feature: FeatureMetadata): FeatureTestResult {
  const errors: string[] = [];

  if (!feature.navigation?.length) {
    return { valid: true, errors: [] };
  }

  // Test for duplicate navigation IDs
  const ids = new Set<string>();
  const checkNavItem = (item: NavigationConfig) => {
    if (ids.has(item.id)) {
      errors.push(`Duplicate navigation ID found: ${item.id}`);
    }
    ids.add(item.id);

    if (item.children?.length) {
      item.children.forEach(checkNavItem);
    }
  };

  feature.navigation.forEach(checkNavItem);

  // Test for broken navigation paths
  const paths = new Set(feature.routes?.map(r => r.path) || []);
  const checkPath = (item: NavigationConfig) => {
    if (item.path && !item.path.startsWith('http') && !paths.has(item.path)) {
      errors.push(`Navigation item ${item.id} references non-existent route: ${item.path}`);
    }
    item.children?.forEach(checkPath);
  };

  feature.navigation.forEach(checkPath);

  return {
    valid: errors.length === 0,
    errors
  };
}