import { describe, expect, it } from 'vitest';
import { validateForm } from './task.js';

describe('FR-02: календарные границы', () => {
  it.each([
    ['T04', '2024-02-29', true],
    ['T05', '2025-02-29', false],
    ['T06', '2026-04-31', false],
    ['T07', '0000-01-01', false],
  ])('%s: дата %s допустима = %s', (_id, dueDate, valid) => {
    const errors = validateForm({ title: 'Конспект', subject: 'Математика', dueDate });

    expect(errors).toEqual(valid ? {} : { dueDate: 'Укажите существующую дату.' });
  });
});
