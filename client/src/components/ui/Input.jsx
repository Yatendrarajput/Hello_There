import PropTypes from 'prop-types';

export const Input = ({ className = '', error = false, ...props }) => {
  return (
    <input
      className={`w-full px-4 py-3 rounded-lg border-2 bg-background text-foreground 
        ${error ? 'border-destructive' : 'border-border'} 
        focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 
        transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        placeholder:text-muted-foreground ${className}`}
      {...props}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool,
};
