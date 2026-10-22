import React, { useEffect, useMemo, useState } from 'react';
import TaskCard from '../components/TaskCard.jsx';
import Summary from '../components/Summary.jsx';
import TaskFilters from '../components/TaskFilters.jsx';
import Button from '../components/Button.jsx';
import { selectTasks, subjectsFor } from '../domain/selectTasks.js';

export default function TaskListPage({ tasks, today, onToggle, onDelete }) {
  const [filters, setFilters] = useState({ subject: '', status: 'all', direction: 'asc' });
  const subjects = useMemo(() => subjectsFor(tasks), [tasks]);
  const selectedSubject = subjects.includes(filters.subject) ? filters.subject : '';
  const currentFilters = { ...filters, subject: selectedSubject };
  const visible = selectTasks(tasks, currentFilters);
  const reset = () => setFilters({ ...filters, subject: '', status: 'all' });

  useEffect(() => {
    if (filters.subject && !subjects.includes(filters.subject)) setFilters(previous => ({ ...previous, subject: '' }));
  }, [subjects, filters.subject]);

  return (
    <>
      <header className="page-heading">
        <div><h1 id="page-heading" tabIndex="-1">Мои задания</h1><p className="muted">Сроки, дисциплины и выполнение в одном списке.</p></div>
        <a className="button button-primary" id="add-task-button" href="#new">Добавить задание</a>
      </header>
      <Summary tasks={tasks} today={today} />
      <TaskFilters subjects={subjects} filters={currentFilters} onChange={setFilters} onReset={reset} />
      <p className="results-count" aria-live="polite">Показано: {visible.length} из {tasks.length}</p>
      <h2 className="visually-hidden">Список заданий</h2>
      {visible.length ? <ul className="task-list">{visible.map(task => <li key={task.id}><TaskCard task={task} today={today} onToggle={onToggle} onDelete={onDelete} /></li>)}</ul> : tasks.length ? (
        <section className="empty-state"><h2>Ничего не найдено</h2><p>Попробуйте другую дисциплину или снимите фильтр выполнения.</p><Button variant="secondary" onClick={reset}>Сбросить фильтры</Button></section>
      ) : (
        <section className="empty-state"><h2>Заданий пока нет</h2><p>Добавьте первую работу, укажите дисциплину и срок.</p><a className="button button-primary" href="#new">Добавить первое задание</a></section>
      )}
    </>
  );
}
