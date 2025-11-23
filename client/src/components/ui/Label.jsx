import PropTypes from 'prop-types';

export const Label = ({ children, htmlFor, className = '' }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-foreground mb-2 ${className}`}
    >
      {children}
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string,
  className: PropTypes.string,
};
