# План разработки UniLoad

План рассчитан на восемь недель и 70 часов. Оценки включают реализацию и проверку задач. Подготовка репозитория и HTML-страницы завершена; дальше идёт настройка React.

Полные описания и критерии готовности находятся в [GitHub Issues](https://github.com/SkyBlinkkk/uniload/issues?q=is%3Aissue). Метка `BACKLOG` обозначает открытые задачи, `Done` — выполненные. Недели и направления работы отмечены метками. Все задачи относятся к обязательной первой версии и имеют приоритет High.

| Неделя | Задачи | Часы |
| --- | --- | ---: |
| 1 | [FE-001](https://github.com/SkyBlinkkk/uniload/issues/1), [FE-002](https://github.com/SkyBlinkkk/uniload/issues/2), [FE-003](https://github.com/SkyBlinkkk/uniload/issues/3) | 8 |
| 2 | [FE-004](https://github.com/SkyBlinkkk/uniload/issues/4), [FE-005](https://github.com/SkyBlinkkk/uniload/issues/5), [FE-006](https://github.com/SkyBlinkkk/uniload/issues/6) | 8 |
| 3 | [FE-007](https://github.com/SkyBlinkkk/uniload/issues/7), [FE-008](https://github.com/SkyBlinkkk/uniload/issues/8), [FE-009](https://github.com/SkyBlinkkk/uniload/issues/9) | 9 |
| 4 | [FE-010](https://github.com/SkyBlinkkk/uniload/issues/10), [FE-011](https://github.com/SkyBlinkkk/uniload/issues/11), [FE-012](https://github.com/SkyBlinkkk/uniload/issues/12) | 9 |
| 5 | [FE-013](https://github.com/SkyBlinkkk/uniload/issues/13), [FE-014](https://github.com/SkyBlinkkk/uniload/issues/14), [FE-015](https://github.com/SkyBlinkkk/uniload/issues/15) | 9 |
| 6 | [FE-016](https://github.com/SkyBlinkkk/uniload/issues/16), [FE-017](https://github.com/SkyBlinkkk/uniload/issues/17), [FE-018](https://github.com/SkyBlinkkk/uniload/issues/18), [FE-019](https://github.com/SkyBlinkkk/uniload/issues/19) | 9 |
| 7 | [FE-020](https://github.com/SkyBlinkkk/uniload/issues/20), [FE-021](https://github.com/SkyBlinkkk/uniload/issues/21), [FE-022](https://github.com/SkyBlinkkk/uniload/issues/22) | 9 |
| 8 | [FE-023](https://github.com/SkyBlinkkk/uniload/issues/23), [FE-024](https://github.com/SkyBlinkkk/uniload/issues/24) | 9 |

## Задачи

| ID | Название | Направление | Оценка | Зависимости |
| --- | --- | --- | ---: | --- |
| [FE-001](https://github.com/SkyBlinkkk/uniload/issues/1) | Подготовить репозиторий и документацию | Подготовка | 3 ч | нет |
| [FE-002](https://github.com/SkyBlinkkk/uniload/issues/2) | Сверстать структуру главной страницы | Подготовка | 3 ч | FE-001 |
| [FE-003](https://github.com/SkyBlinkkk/uniload/issues/3) | Настроить React и Vite | Подготовка | 2 ч | FE-002 |
| [FE-004](https://github.com/SkyBlinkkk/uniload/issues/4) | Добавить экраны и переходы | Интерфейс | 3 ч | FE-003 |
| [FE-005](https://github.com/SkyBlinkkk/uniload/issues/5) | Создать общие компоненты интерфейса | Интерфейс | 3 ч | FE-004 |
| [FE-006](https://github.com/SkyBlinkkk/uniload/issues/6) | Определить модель задачи и проверку данных | Данные | 2 ч | FE-003 |
| [FE-007](https://github.com/SkyBlinkkk/uniload/issues/7) | Загрузить задачи из localStorage | Хранение | 3 ч | FE-006 |
| [FE-008](https://github.com/SkyBlinkkk/uniload/issues/8) | Сохранить изменения и обработать отказ записи | Хранение | 4 ч | FE-007 |
| [FE-009](https://github.com/SkyBlinkkk/uniload/issues/9) | Создать общую форму задания | Форма | 2 ч | FE-005, FE-006 |
| [FE-010](https://github.com/SkyBlinkkk/uniload/issues/10) | Проверить поля и показать ошибки | Форма | 3 ч | FE-009, FE-006 |
| [FE-011](https://github.com/SkyBlinkkk/uniload/issues/11) | Добавить создание задачи | Форма | 3 ч | FE-008, FE-010, FE-004 |
| [FE-012](https://github.com/SkyBlinkkk/uniload/issues/12) | Добавить редактирование задачи | Форма | 3 ч | FE-011 |
| [FE-013](https://github.com/SkyBlinkkk/uniload/issues/13) | Показать задачи и главную страницу | Список | 3 ч | FE-005, FE-007 |
| [FE-014](https://github.com/SkyBlinkkk/uniload/issues/14) | Рассчитать срочность по календарной дате | Список | 4 ч | FE-013, FE-006 |
| [FE-015](https://github.com/SkyBlinkkk/uniload/issues/15) | Удалить задачу после подтверждения | Список | 2 ч | FE-013, FE-008 |
| [FE-016](https://github.com/SkyBlinkkk/uniload/issues/16) | Переключить выполнение и обновить счётчики | Список | 3 ч | FE-013, FE-008, FE-014 |
| [FE-017](https://github.com/SkyBlinkkk/uniload/issues/17) | Фильтровать по дисциплине | Поиск задач | 2 ч | FE-013 |
| [FE-018](https://github.com/SkyBlinkkk/uniload/issues/18) | Добавить совместный фильтр выполнения | Поиск задач | 2 ч | FE-017, FE-016 |
| [FE-019](https://github.com/SkyBlinkkk/uniload/issues/19) | Сортировать список по сроку | Поиск задач | 2 ч | FE-018 |
| [FE-020](https://github.com/SkyBlinkkk/uniload/issues/20) | Оформить пустой список и ошибки хранения | Состояния | 3 ч | FE-008, FE-011, FE-019 |
| [FE-021](https://github.com/SkyBlinkkk/uniload/issues/21) | Сделать интерфейс для трёх ширин | Качество | 3 ч | FE-020 |
| [FE-022](https://github.com/SkyBlinkkk/uniload/issues/22) | Проверить доступность с клавиатуры | Качество | 3 ч | FE-021, FE-010 |
| [FE-023](https://github.com/SkyBlinkkk/uniload/issues/23) | Проверить функции и пограничные случаи | Приёмка | 5 ч | FE-022, FE-014, FE-012, FE-015 |
| [FE-024](https://github.com/SkyBlinkkk/uniload/issues/24) | Проверить браузеры и подготовить сборку | Приёмка | 4 ч | FE-023 |

Работа начинается после выполнения зависимостей. Например, создание задания FE-011 требует готовой формы, проверки полей и записи в localStorage. Номер недели задаёт план, а не заменяет этот порядок.

При завершении задачи проверяются её критерии, изменения сохраняются коммитом и Issue закрывается. Пример сообщения: `feat(FE-011): add task creation`.

## Требования

План основан на ТЗ UniLoad: создание и изменение заданий, срочность, фильтры, выполнение и локальное хранение. Проверки охватывают FR-01–FR-12 и NFR-01–NFR-05. Аккаунты, сервер, синхронизация, календарь и уведомления не запланированы.
