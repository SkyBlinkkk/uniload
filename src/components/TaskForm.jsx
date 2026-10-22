import React, { useRef, useState } from 'react';
import { validateForm } from '../domain/task.js';
import Button from './Button.jsx';
import FormField from './FormField.jsx';

export default function TaskForm({ task, onSave }) {
  const [values, setValues] = useState({ title: task?.title ?? '', subject: task?.subject ?? '', dueDate: task?.dueDate ?? '' });
  const [errors, setErrors] = useState({});
  const submitting = useRef(false);
  const form = useRef(null);

  function change(event) {
    const { name, value } = event.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (errors[name]) setErrors({ ...errors, [name]: validateForm(next)[name] });
  }

  function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      form.current.elements.namedItem(firstError).focus();
      return;
    }
    submitting.current = true;
    onSave(values);
  }

  return (
    <form className="task-form" noValidate onSubmit={submit} ref={form}>
      <p className="muted">Все поля обязательны.</p>
      <FormField name="title" label="Название задания" type="text" value={values.title} onChange={change} error={errors.title} autoComplete="off" />
      <FormField name="subject" label="Дисциплина" type="text" value={values.subject} onChange={change} error={errors.subject} autoComplete="off" />
      <FormField name="dueDate" label="Срок выполнения" type="date" value={values.dueDate} onChange={change} error={errors.dueDate} hint="Прошедшую дату можно указать для просроченного задания." />
      <div className="form-actions">
        <Button type="submit">Сохранить задание</Button>
        <a className="button button-quiet" href="#tasks">Отмена</a>
      </div>
    </form>
  );
}
