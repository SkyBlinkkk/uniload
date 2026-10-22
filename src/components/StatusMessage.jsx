import React from 'react';

export default function StatusMessage({ children, kind = 'info', role = 'status' }) {
  return <div className={`status-message message-${kind}`} role={role} aria-live={role === 'alert' ? 'assertive' : 'polite'} aria-atomic="true">{children}</div>;
}
