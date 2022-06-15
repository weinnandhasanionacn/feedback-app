import PropTypes from 'prop-types';

const Button = ({ children, version, type, disabled, ...rest }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn btn-${version}`}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  version: 'primary',
  type: 'button',
  disabled: false,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  version: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
