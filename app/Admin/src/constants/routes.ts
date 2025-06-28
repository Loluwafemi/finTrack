/**
 * Centralized routing configuration for the Admin application
 * This ensures consistency and type safety across all navigation calls
 */
export const ROUTES = {
  DASHBOARD: '../(dashboard)' as const,
  AUTH: '../(auth)' as const,
  SIGNUP: '../(auth)/signup' as const,


  
  // Add other routes as needed
  // USERS: '/users' as const,
  // SETTINGS: '/settings' as const,
  // REPORTS: '/reports' as const,
} as const;

// Type for all available routes
export type RouteKey = keyof typeof ROUTES;
export type RouteValue = typeof ROUTES[RouteKey];

// Helper function for type-safe navigation
export const getRoute = (key: RouteKey): RouteValue => {
  return ROUTES[key];
};