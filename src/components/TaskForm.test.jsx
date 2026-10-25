import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from './TaskForm.jsx';

describe('FR-02: проверка полей формы', () => {
  it('T01: показывает все обязательные поля и не отправляет пустую форму', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(<TaskForm onSave={onSave} />);

    await user.click(screen.getByRole('button', { name: 'Сохранить задание' }));

    expect(screen.getByRole('textbox', { name: 'Название задания' })).toHaveFocus();
    expect(screen.getByRole('textbox', { name: 'Название задания' })).toHaveAccessibleDescription('Укажите название задания.');
    expect(screen.getByRole('textbox', { name: 'Дисциплина' })).toHaveAccessibleDescription('Укажите дисциплину.');
    expect(screen.getByText('Укажите существующую дату.')).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('T02: отклоняет название и дисциплину из пробелов даже с корректной датой', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(<TaskForm onSave={onSave} />);

    await user.type(screen.getByRole('textbox', { name: 'Название задания' }), '   ');
    await user.type(screen.getByRole('textbox', { name: 'Дисциплина' }), '   ');
    await user.type(screen.getByLabelText(/Срок выполнения/), '2026-10-25');
    await user.click(screen.getByRole('button', { name: 'Сохранить задание' }));

    expect(screen.getByRole('textbox', { name: 'Название задания' })).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('textbox', { name: 'Дисциплина' })).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText(/Срок выполнения/)).toHaveAttribute('aria-invalid', 'false');
    expect(onSave).not.toHaveBeenCalled();
  });

  it('T03: после исправления ошибок принимает корректную прошедшую дату', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(<TaskForm onSave={onSave} />);

    await user.click(screen.getByRole('button', { name: 'Сохранить задание' }));
    await user.type(screen.getByRole('textbox', { name: 'Название задания' }), 'Конспект');
    await user.type(screen.getByRole('textbox', { name: 'Дисциплина' }), 'Математика');
    await user.type(screen.getByLabelText(/Срок выполнения/), '2020-01-15');
    await user.click(screen.getByRole('button', { name: 'Сохранить задание' }));

    expect(screen.queryByText('Укажите название задания.')).not.toBeInTheDocument();
    expect(screen.queryByText('Укажите дисциплину.')).not.toBeInTheDocument();
    expect(screen.queryByText('Укажите существующую дату.')).not.toBeInTheDocument();
    expect(onSave).toHaveBeenCalledExactlyOnceWith({
      title: 'Конспект', subject: 'Математика', dueDate: '2020-01-15',
    });
  });
});

