// Basic UI components
export * from './icon';
export * from './text-input';
export * from './time-input';
export * from './dropzone';
export * from './copyable-label';
export * from './theme-switcher';
export * from './language-switcher/language-switcher';

// Re-export commonly used components with consistent naming
export { default as FileUpload } from './dropzone';
export { CopyableLabel as CopyLabel } from './copyable-label';
export { ThemeSwitcher as ThemeToggle } from './theme-switcher';
export { LanguageSwitcher as LocaleSelect } from './language-switcher/language-switcher';