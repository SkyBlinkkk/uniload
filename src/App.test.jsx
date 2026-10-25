import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';
import { STORAGE_KEY } from './storage/taskStorage.js';

const tasks = [
  { id: 'math-1', title: 'Решить задачи', subject: 'Математика', dueDate: '2026-10-26', completed: false, createdAt: '2026-10-20T10:00:00Z' },
  { id: 'math-2', title: 'Сдать контрольную', subject: 'Математика', dueDate: '2026-10-27', completed: true, createdAt: '2026-10-20T11:00:00Z' },
  { id: 'web-1', title: 'Сверстать страницу', subject: 'Веб-разработка', dueDate: '2026-10-28', completed: false, createdAt: '2026-10-20T12:00:00Z' },
];

function openTasks(initialTasks = tasks, route = 'tasks') {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
  window.history.replaceState(null, '', `/#${route}`);
  return render(<App />);
}

function savedTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

describe('FR-02: невалидная форма в приложении', () => {
  it('T08: ошибка формы не создаёт запись и не меняет сохранённый список', async () => {
    const user = userEvent.setup();
    openTasks(tasks, 'new');
    const before = localStorage.getItem(STORAGE_KEY);

    await user.click(screen.getByRole('button', { name: 'Сохранить задание' }));

    expect(screen.getByRole('heading', { name: 'Новое задание' })).toBeInTheDocument();
    expect(screen.getByText('Укажите название задания.')).toBeInTheDocument();
    expect(localStorage.getItem(STORAGE_KEY)).toBe(before);
    expect(screen.queryByText('Задание добавлено.')).not.toBeInTheDocument();
  });
});

describe('FR-08: совместные фильтры', () => {
  it('T09: применяет дисциплину и выполнение вместе, не меняя общие числа и данные', async () => {
    const user = userEvent.setup();
    openTasks();
    const before = localStorage.getItem(STORAGE_KEY);

    await user.selectOptions(screen.getByRole('combobox', { name: 'Дисциплина' }), 'Математика');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Выполнение' }), 'active');

    expect(screen.getByRole('heading', { name: 'Решить задачи' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Сдать контрольную' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Сверстать страницу' })).not.toBeInTheDocument();
    expect(screen.getByText('Показано: 1 из 3')).toBeInTheDocument();
    checkCounts(2, 1);

    await user.selectOptions(screen.getByRole('combobox', { name: 'Выполнение' }), 'done');
    expect(screen.getByRole('heading', { name: 'Сдать контрольную' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Решить задачи' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Сверстать страницу' })).not.toBeInTheDocument();
    checkCounts(2, 1);
    expect(localStorage.getItem(STORAGE_KEY)).toBe(before);
  });

  it('T10: при отсутствии совпадений предлагает сброс и восстанавливает весь список', async () => {
    const user = userEvent.setup();
    openTasks();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Дисциплина' }), 'Веб-разработка');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Выполнение' }), 'done');

    expect(screen.getByRole('heading', { name: 'Ничего не найдено' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Заданий пока нет' })).not.toBeInTheDocument();
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
    expect(screen.getByText('Показано: 0 из 3')).toBeInTheDocument();

    const emptyState = screen.getByRole('heading', { name: 'Ничего не найдено' }).closest('section');
    await user.click(within(emptyState).getByRole('button', { name: 'Сбросить фильтры' }));

    expect(screen.getByRole('combobox', { name: 'Дисциплина' })).toHaveValue('');
    expect(screen.getByRole('combobox', { name: 'Выполнение' })).toHaveValue('all');
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
    expect(screen.getByText('Показано: 3 из 3')).toBeInTheDocument();
    expect(savedTasks()).toEqual(tasks);
  });
});

describe('FR-10: изменение выполнения', () => {
  it('T11: переключает выполнение в обе стороны, обновляет счётчики и сохраняет результат', async () => {
    const user = userEvent.setup();
    const initial = tasks.filter(task => !task.completed);
    const view = openTasks(initial);
    const name = 'Выполнение: Решить задачи';
    checkCounts(2, 0);

    await user.click(screen.getByRole('checkbox', { name }));

    expect(screen.getByRole('checkbox', { name })).toBeChecked();
    checkCounts(1, 1);
    expect(savedTasks()).toEqual(initial.map(task => task.id === 'math-1' ? { ...task, completed: true } : task));

    view.unmount();
    const reopened = render(<App />);
    expect(screen.getByRole('checkbox', { name })).toBeChecked();
    checkCounts(1, 1);

    await user.click(screen.getByRole('checkbox', { name }));

    expect(screen.getByRole('checkbox', { name })).not.toBeChecked();
    checkCounts(2, 0);
    expect(savedTasks()).toEqual(initial);
    reopened.unmount();
    render(<App />);
    expect(screen.getByRole('checkbox', { name })).not.toBeChecked();
    checkCounts(2, 0);
  });

  it('T12: завершённая задача уходит из активного фильтра, но остаётся в данных', async () => {
    const user = userEvent.setup();
    openTasks();
    await user.selectOptions(screen.getByRole('combobox', { name: 'Дисциплина' }), 'Математика');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Выполнение' }), 'active');

    await user.click(screen.getByRole('checkbox', { name: 'Выполнение: Решить задачи' }));

    expect(screen.queryByRole('heading', { name: 'Решить задачи' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ничего не найдено' })).toBeInTheDocument();
    checkCounts(1, 2);
    expect(savedTasks()).toEqual(tasks.map(task => task.id === 'math-1' ? { ...task, completed: true } : task));
    await waitFor(() => expect(screen.getByRole('link', { name: 'Добавить задание' })).toHaveFocus());

    await user.selectOptions(screen.getByRole('combobox', { name: 'Выполнение' }), 'done');
    expect(screen.getByRole('checkbox', { name: 'Выполнение: Решить задачи' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Выполнение: Сдать контрольную' })).toBeChecked();
    expect(screen.queryByRole('heading', { name: 'Сверстать страницу' })).not.toBeInTheDocument();
  });
});

function checkCounts(active, completed) {
  const summary = screen.getByLabelText('Общее количество заданий');
  for (const [label, count] of [['Активные', active], ['Выполненные', completed]]) {
    const row = within(summary).getByText(label).parentElement;
    expect(within(row).getByRole('definition')).toHaveTextContent(new RegExp(`^${count}$`));
  }
}
