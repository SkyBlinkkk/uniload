import React from 'react';
import Summary from '../components/Summary.jsx';
import TaskCard from '../components/TaskCard.jsx';
import { selectTasks } from '../domain/selectTasks.js';
import { formatDate } from '../domain/urgency.js';

export default function HomePage({ tasks, today }) {
  const nearest = selectTasks(tasks, { status: 'active' }).slice(0, 3);
  return (
    <>
      <div className="home-layout">
      <section className="intro">
        <p className="eyebrow">Личный учебный план</p>
        <h1 id="page-heading" tabIndex="-1">Учебные задания<br />и дедлайны</h1>
        <p className="intro-text">Соберите задания по дисциплинам в одном месте и выберите ближайшую работу.</p>
        <p className="intro-actions"><a className="button button-primary" href="#tasks">Перейти к заданиям <span aria-hidden="true">↗</span></a></p>
        <p className="demo-note">Сегодня {formatDate(today)}. Без регистрации и передачи заданий на сервер.</p>
      </section>
      <section className="home-preview" aria-labelledby="nearest-heading">
        <h2 className="section-title" id="nearest-heading">Ближайшие сроки</h2>
        {nearest.length ? <ul className="task-list">{nearest.map(task => <li key={task.id}><TaskCard task={task} today={today} readOnly /></li>)}</ul>
          : <div className="empty-state"><h3>{tasks.length ? 'Все задания выполнены' : 'Начните с первого задания'}</h3><p>{tasks.length ? 'Новые работы можно добавить в списке заданий.' : 'Укажите название, дисциплину и срок. UniLoad поможет выбрать, с чего начать.'}</p><a className="text-link" href="#tasks">Открыть список →</a></div>}
      </section>
      </div>
      <section className="overview" aria-labelledby="summary-heading">
        <h2 className="section-title" id="summary-heading">Сводка заданий</h2>
        <Summary tasks={tasks} today={today} />
      </section>
      <aside className="storage-note"><h2>Ваш список остаётся в этом браузере</h2><p>После очистки данных браузера задания удалятся. Перенос между устройствами не предусмотрен.</p></aside>
    </>
  );
}
