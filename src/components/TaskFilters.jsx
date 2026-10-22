import React from 'react';
import Button from './Button.jsx';

export default function TaskFilters({ subjects, filters, onChange, onReset }) {
  return (
    <section className="filters" aria-label="Фильтры и сортировка">
      <div className="filter-field">
        <label htmlFor="subject-filter">Дисциплина</label>
        <select id="subject-filter" value={filters.subject} onChange={e => onChange({ ...filters, subject: e.target.value })}>
          <option value="">Все дисциплины</option>
          {subjects.map(subject => <option key={subject}>{subject}</option>)}
        </select>
      </div>
      <div className="filter-field">
        <label htmlFor="status-filter">Выполнение</label>
        <select id="status-filter" value={filters.status} onChange={e => onChange({ ...filters, status: e.target.value })}>
          <option value="all">Все задания</option><option value="active">Активные</option><option value="done">Выполненные</option>
        </select>
      </div>
      <div className="filter-field">
        <label htmlFor="sort-filter">По сроку</label>
        <select id="sort-filter" value={filters.direction} onChange={e => onChange({ ...filters, direction: e.target.value })}>
          <option value="asc">Ближайшие первыми</option><option value="desc">Поздние первыми</option>
        </select>
      </div>
      <Button variant="quiet" onClick={onReset}>Сбросить фильтры</Button>
    </section>
  );
}
