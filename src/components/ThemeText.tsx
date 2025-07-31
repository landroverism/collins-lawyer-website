
import { ReactNode } from 'react';
import { useTheme } from './ThemeContext';
import { cn } from '../lib/utils';

interface ThemeTextProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'muted' | 'contrast';
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  className?: string;
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
}

export function ThemeText({ 
  children, 
  as: Component = 'p', 
  variant = 'secondary',
  size = 'md',
  className = '',
  weight = 'normal'
}: ThemeTextProps) {
  const { theme } = useTheme();

  const getVariantClass = () => {
    switch (variant) {
      case 'primary': return 'theme-text-primary';
      case 'secondary': return 'theme-text-secondary';
      case 'tertiary': return 'theme-text-tertiary';
      case 'muted': return 'theme-text-muted';
      case 'contrast': return 'theme-text-contrast';
      default: return 'theme-text-secondary';
    }
  };

  const getSizeClass = () => {
    if (Component.startsWith('h')) {
      switch (size) {
        case 'xl': return 'heading-xl';
        case 'lg': return 'heading-lg';
        case 'md': return 'heading-md';
        case 'sm': return 'heading-sm';
        default: return 'heading-md';
      }
    } else {
      switch (size) {
        case 'xl': return 'body-lg';
        case 'lg': return 'body-lg';
        case 'md': return 'body-md';
        case 'sm': return 'body-sm';
        case 'xs': return 'text-xs';
        default: return 'body-md';
      }
    }
  };

  const getWeightClass = () => {
    switch (weight) {
      case 'light': return 'font-light';
      case 'normal': return 'font-normal';
      case 'medium': return 'font-medium';
      case 'semibold': return 'font-semibold';
      case 'bold': return 'font-bold';
      case 'extrabold': return 'font-extrabold';
      default: return 'font-normal';
    }
  };

  const classes = cn(
    getVariantClass(),
    getSizeClass(),
    getWeightClass(),
    'transition-colors duration-300 ease-in-out',
    className
  );

  return (
    <Component className={classes}>
      {children}
    </Component>
  );
}

// Utility function to get appropriate text color based on background
export function getContrastTextColor(backgroundColor: string, theme: 'light' | 'dark'): string {
  // Simple utility to determine if we need light or dark text
  const isLightBackground = backgroundColor.includes('white') || 
                           backgroundColor.includes('light') || 
                           backgroundColor.includes('#f') ||
                           backgroundColor.includes('gray-100');
  
  if (theme === 'dark') {
    return isLightBackground ? 'var(--deep-blue)' : 'var(--white)';
  } else {
    return isLightBackground ? 'var(--deep-blue)' : 'var(--white)';
  }
}

// Hook for dynamic text color based on background
export function useContrastText(backgroundColor?: string) {
  const { theme } = useTheme();
  
  if (!backgroundColor) {
    return theme === 'dark' ? 'theme-text-primary' : 'theme-text-primary';
  }
  
  const textColor = getContrastTextColor(backgroundColor, theme);
  return textColor === 'var(--white)' ? 'text-white' : 'theme-text-primary';
}
