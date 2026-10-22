export function calendarDay(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(0);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCFullYear(year, month - 1, day);
  if (year < 1 || date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return Math.floor(date.getTime() / 86400000);
}

export function validateForm(values) {
  const errors = {};
  if (!values.title.trim()) errors.title = 'Укажите название задания.';
  if (!values.subject.trim()) errors.subject = 'Укажите дисциплину.';
  if (calendarDay(values.dueDate) === null) errors.dueDate = 'Укажите существующую дату.';
  return errors;
}

export function isTask(task) {
  return task !== null && typeof task === 'object'
    && typeof task.id === 'string' && task.id.trim().length > 0
    && typeof task.title === 'string' && task.title.trim().length > 0
    && typeof task.subject === 'string' && task.subject.trim().length > 0
    && typeof task.dueDate === 'string' && calendarDay(task.dueDate) !== null
    && typeof task.completed === 'boolean'
    && typeof task.createdAt === 'string' && task.createdAt.includes('T')
    && Number.isFinite(Date.parse(task.createdAt));
}

export function createTask(values) {
  return {
    id: crypto.randomUUID(),
    title: values.title.trim(),
    subject: values.subject.trim(),
    dueDate: values.dueDate,
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

export function editTask(task, values) {
  return { ...task, title: values.title.trim(), subject: values.subject.trim(), dueDate: values.dueDate };
}
