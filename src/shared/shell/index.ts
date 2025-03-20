// Shell pages
export * from './pages';

// Shell layouts and components
export { DashboardLayout } from '../components/layouts/DashboardLayout';
export { DefaultLayout } from '../components/layouts/DefaultLayout';
export { MainHeader } from '../components/groups/main-header';
export { MainNavbar } from '../components/groups/main-navbar';

// Shell providers
export { QueryProvider } from '../services/api/query.provider';
export { ThemeProvider } from '../services/theme/theme.provider';
export { LanguageProvider } from '../services/i18n/i18n.provider';
export { FeatureProvider } from '../services/features/feature.provider';