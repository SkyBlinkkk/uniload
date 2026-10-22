import React from 'react';
import Summary from '../components/Summary.jsx';

export default function HomePage({ tasks, today }) {
  return (
    <>
      <section className="intro">
        <p className="eyebrow">Личный учебный план</p>
        <h1 id="page-heading" tabIndex="-1">Учебные задания<br />и дедлайны</h1>
        <p className="intro-text">Соберите задания по дисциплинам в одном месте и выберите ближайшую работу.</p>
        <p className="intro-actions"><a className="button button-primary" href="#tasks">Перейти к заданиям <span aria-hidden="true">↗</span></a></p>
      </section>
      <section className="overview" aria-labelledby="summary-heading">
        <h2 className="section-title" id="summary-heading">Сводка заданий</h2>
        <Summary tasks={tasks} today={today} />
      </section>
    </>
  );
}
