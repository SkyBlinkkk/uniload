export function subjectsFor(tasks) {
  return [...new Set(tasks.map(task => task.subject))].sort((a, b) => a.localeCompare(b, 'ru'));
}

export function selectTasks(tasks, { subject = '', status = 'all', direction = 'asc' } = {}) {
  return tasks.filter(task => (!subject || task.subject === subject)
    && (status === 'all' || (status === 'done' ? task.completed : !task.completed)))
    .sort((a, b) => {
      const dueDate = a.dueDate.localeCompare(b.dueDate);
      return (direction === 'desc' ? -dueDate : dueDate)
        || a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id);
    });
}
