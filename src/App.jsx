import React, { useEffect, useRef, useState } from 'react';
import { createTask, editTask } from './domain/task.js';
import { readTasks, writeTasks } from './storage/taskStorage.js';
import useToday from './hooks/useToday.js';
import useRoute, { navigate } from './hooks/useRoute.js';
import TaskForm from './components/TaskForm.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';
import HomePage from './pages/HomePage.jsx';
import TaskListPage from './pages/TaskListPage.jsx';

export default function App() {
  const [loaded] = useState(readTasks);
  const [tasks, setTasks] = useState(loaded.tasks);
  const [storageIssue, setStorageIssue] = useState(loaded.issue);
  const [notice, setNotice] = useState('');
  const [deletingTask, setDeletingTask] = useState(null);
  const route = useRoute();
  const today = useToday();
  const firstRender = useRef(true);
  const editingId = route.startsWith('edit/') ? route.slice(5) : null;
  const editingTask = tasks.find(task => task.id === editingId);
  const isForm = route === 'new' || Boolean(editingId);

  useEffect(() => {
    document.title = `${route === 'home' ? 'Учебные задания' : isForm ? 'Форма задания' : 'Мои задания'} — UniLoad`;
    if (firstRender.current) firstRender.current = false;
    else document.getElementById('page-heading')?.focus();
  }, [route, isForm]);

  function commitTasks(next, message) {
    setTasks(next);
    const blocked = storageIssue === 'invalid' || storageIssue === 'read';
    const saved = !blocked && writeTasks(next);
    if (!blocked) setStorageIssue(saved ? null : 'write');
    setNotice(saved ? message : `${message} Изменения не сохранены в браузере.`);
    return saved;
  }

  function saveForm(values) {
    const next = editingTask
      ? tasks.map(task => task.id === editingTask.id ? editTask(task, values) : task)
      : [...tasks, createTask(values)];
    commitTasks(next, editingTask ? 'Задание изменено.' : 'Задание добавлено.');
    navigate('tasks');
  }

  function toggleTask(id) {
    const next = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    commitTasks(next, 'Отметка выполнения изменена.');
    requestAnimationFrame(() => {
      if (document.activeElement === document.body) {
        (document.querySelector('.task-card input') ?? document.getElementById('add-task-button'))?.focus();
      }
    });
  }

  function deleteTask() {
    commitTasks(tasks.filter(task => task.id !== deletingTask.id), 'Задание удалено.');
    setDeletingTask(null);
  }

  let content;
  if (route === 'home') content = <HomePage tasks={tasks} today={today} />;
  else if (route === 'tasks') content = <TaskListPage tasks={tasks} today={today} onToggle={toggleTask} onDelete={setDeletingTask} />;
  else if (isForm && (!editingId || editingTask)) content = (
    <section className="form-page">
      <a className="text-link" href="#tasks">← К списку заданий</a>
      <h1 id="page-heading" tabIndex="-1">{editingTask ? 'Редактирование задания' : 'Новое задание'}</h1>
      <TaskForm key={route} task={editingTask} onSave={saveForm} />
    </section>
  );
  else content = <section className="empty-state"><h1 id="page-heading" tabIndex="-1">{editingId ? 'Задание не найдено' : 'Страница не найдена'}</h1><a href="#tasks">Вернуться к заданиям</a></section>;

  return (
    <>
      <a className="skip-link" href="#main" onClick={event => { event.preventDefault(); document.getElementById('main').focus(); }}>Перейти к основному содержимому</a>
      <header className="site-header container">
        <p className="brand"><span className="brand-mark" aria-hidden="true">U</span><strong>UniLoad</strong></p>
        <nav aria-label="Основная навигация"><ul className="nav-list">
          <li><a href="#home" aria-current={route === 'home' ? 'page' : undefined}>Главная</a></li>
          <li><a href="#tasks" aria-current={route === 'tasks' ? 'page' : undefined}>Мои задания</a></li>
        </ul></nav>
      </header>
      <main className="container app-main" id="main" tabIndex="-1">
        {storageIssue && <p className="storage-warning" role="alert">Не удалось {storageIssue === 'write' ? 'сохранить' : 'прочитать'} задания в браузере. Текущий список доступен, но изменения могут потеряться после перезагрузки.</p>}
        <p className="notice" role="status" aria-live="polite">{notice}</p>
        {content}
      </main>
      {deletingTask && <ConfirmDialog title="Удалить задание?" confirmLabel="Удалить задание" onConfirm={deleteTask} onCancel={() => setDeletingTask(null)}>Задание «{deletingTask.title}» будет удалено из списка. Это действие нельзя отменить.</ConfirmDialog>}
      <footer className="site-footer container"><p><strong>UniLoad</strong> · Личный учебный план</p><p>Задания хранятся в этом браузере.</p></footer>
    </>
  );
}
