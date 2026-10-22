import { calendarDay } from './task.js';

export function localDate(date = new Date()) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}

export function urgency(task, today = localDate()) {
  if (task.completed) return { label: 'Выполнено', className: 'done' };
  const days = calendarDay(task.dueDate) - calendarDay(today);
  if (days < 0) return { label: 'Просрочено', className: 'overdue' };
  if (days === 0) return { label: 'Сегодня', className: 'today' };
  if (days <= 2) return { label: 'Срочно', className: 'urgent' };
  return { label: 'Обычно', className: 'normal' };
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${value}T12:00:00Z`));
}

export function taskStatistics(tasks, today) {
  return {
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
    overdue: tasks.filter(task => urgency(task, today).className === 'overdue').length,
  };
}
