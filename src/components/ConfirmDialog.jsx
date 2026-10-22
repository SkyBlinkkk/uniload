import React, { useEffect, useRef } from 'react';
import Button from './Button.jsx';

export default function ConfirmDialog({ title, children, confirmLabel, onConfirm, onCancel }) {
  const dialog = useRef(null);
  const cancel = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    dialog.current.showModal();
    cancel.current.focus();
    return () => {
      requestAnimationFrame(() => {
        const target = previousFocus?.isConnected ? previousFocus : document.getElementById('add-task-button');
        target?.focus();
      });
    };
  }, []);

  return (
    <dialog className="confirm-dialog" ref={dialog} aria-labelledby="confirm-title" aria-describedby="confirm-description" onCancel={event => { event.preventDefault(); onCancel(); }}>
      <h2 id="confirm-title">{title}</h2>
      <p id="confirm-description">{children}</p>
      <div className="form-actions">
        <Button variant="quiet" ref={cancel} onClick={onCancel}>Отмена</Button>
        <Button variant="danger" onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </dialog>
  );
}
