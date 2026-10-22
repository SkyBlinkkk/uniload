import React from 'react';

export default function FormField({ name, label, error, hint, ...props }) {
  const id = `task-${name}`;
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ');
  return (
    <div className="field">
      <label htmlFor={id}>{label} <span aria-hidden="true">*</span></label>
      <input id={id} name={name} required aria-invalid={Boolean(error)} aria-describedby={describedBy || undefined} {...props} />
      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
      {hint && <p className="field-hint" id={`${id}-hint`}>{hint}</p>}
    </div>
  );
}
