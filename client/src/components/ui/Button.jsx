import PropTypes from 'prop-types';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-primary-dark text-primary-foreground hover:shadow-glow hover:scale-105',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
    ghost: 'text-foreground hover:bg-muted',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};
