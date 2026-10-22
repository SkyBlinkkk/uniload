import React from 'react';
import Button from './Button.jsx';
import StatusMessage from './StatusMessage.jsx';

export default function StorageNotice({ issue, onRetry, onReset }) {
  if (!issue) return null;
  const messages = {
    invalid: 'Сохранённые данные повреждены. Исходная запись не изменена. Текущий список будет храниться только в памяти, пока вы не подтвердите сброс.',
    read: 'Не удалось прочитать хранилище браузера. Изменения в текущем списке пока не сохраняются. Проверьте настройки браузера и повторите чтение.',
    write: 'Изменения не сохранены в браузере. Текущий список остаётся на экране, но после перезагрузки эти изменения могут потеряться.',
  };
  return (
    <StatusMessage kind="warning" role="alert">
      <p>{messages[issue]}</p>
      <div className="message-actions">
        {issue === 'invalid'
          ? <Button variant="quiet" onClick={onReset}>Сбросить повреждённые данные</Button>
          : <Button variant="quiet" onClick={onRetry}>{issue === 'write' ? 'Повторить сохранение' : 'Повторить чтение'}</Button>}
      </div>
    </StatusMessage>
  );
}
