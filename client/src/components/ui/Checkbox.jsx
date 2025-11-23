import PropTypes from 'prop-types';
import { Check } from 'lucide-react';

export const Checkbox = ({ id, checked, onChange, className = '' }) => {
  return (
    <div className="relative inline-block">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        onClick={() => onChange?.({ target: { checked: !checked } })}
        className={`w-5 h-5 rounded border-2 cursor-pointer transition-all duration-200
          ${checked 
            ? 'bg-primary border-primary' 
            : 'bg-background border-border hover:border-primary'
          } ${className}`}
      >
        {checked && (
          <Check className="w-3 h-3 text-primary-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
};
