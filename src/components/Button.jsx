import React from 'react';

export default function Button({ variant = 'primary', type = 'button', className = '', ...props }) {
  return <button type={type} className={`button button-${variant} ${className}`} {...props} />;
}
