import React from 'react';
import TaskCard from '../components/TaskCard.jsx';
import Summary from '../components/Summary.jsx';

export default function TaskListPage({ tasks, today }) {
  return (
    <>
      <header className="page-heading">
        <div><h1 id="page-heading" tabIndex="-1">Мои задания</h1><p className="muted">Сроки, дисциплины и выполнение в одном списке.</p></div>
        <a className="button button-primary" id="add-task-button" href="#new">Добавить задание</a>
      </header>
      <Summary tasks={tasks} today={today} />
      {tasks.length ? <ul className="task-list">{tasks.map(task => <li key={task.id}><TaskCard task={task} today={today} /></li>)}</ul> : (
        <section className="empty-state"><h2>Заданий пока нет</h2><p>Добавьте первую работу, укажите дисциплину и срок.</p><a className="button button-primary" href="#new">Добавить первое задание</a></section>
      )}
    </>
  );
}
