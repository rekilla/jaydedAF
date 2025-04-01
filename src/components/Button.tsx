import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  as?: 'button' | 'a' | 'Link'; // Allow rendering as different elements
  href?: string; // For 'a' tag
  to?: LinkProps['to']; // For 'Link' component
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  as = 'button',
  className = '',
  href,
  to,
  ...props
}) => {
  const baseStyle =
    'inline-block px-8 py-3 border border-brand-gold font-body uppercase tracking-wider text-sm transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-background focus:ring-brand-gold rounded-sm'; // Added focus styles and subtle rounding

  const primaryStyle = 'bg-brand-gold text-brand-background hover:bg-transparent hover:text-brand-gold';
  const secondaryStyle = 'bg-transparent text-brand-gold hover:bg-brand-gold hover:text-brand-background';

  const variantStyle = variant === 'primary' ? primaryStyle : secondaryStyle;

  const combinedClassName = `${baseStyle} ${variantStyle} ${className}`;

  if (as === 'a' && href) {
    return (
      <a href={href} className={combinedClassName} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  if (as === 'Link' && to) {
    return (
      <Link to={to} className={combinedClassName} {...(props as Omit<LinkProps, 'to'>)}>
        {children}
      </Link>
    );
  }

  // Default to button
  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
