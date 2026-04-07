# Delta Onepage

Одностраничный сайт на Next.js для презентации компании и приема заявок через SMTP.

## Требования

- Node.js 20 или выше
- npm
- SMTP-доступ от почты заказчика

## Первый запуск

1. Установить зависимости:

```bash
npm install
```

2. Создать локальный env-файл из шаблона:

```bash
cp .env.example .env.local
```

Для Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

3. Заполнить `.env.local`.

## Обязательные переменные окружения

SMTP для отправки заявок:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM`
- `MAIL_TO`

Публичные данные компании:

- `NEXT_PUBLIC_COMPANY_NAME`
- `NEXT_PUBLIC_COMPANY_LEGAL_NAME`
- `NEXT_PUBLIC_COMPANY_PHONE`
- `NEXT_PUBLIC_COMPANY_PHONE_HREF`
- `NEXT_PUBLIC_COMPANY_EMAIL`
- `NEXT_PUBLIC_COMPANY_ADDRESS_LINE1`
- `NEXT_PUBLIC_COMPANY_ADDRESS_LINE2`
- `NEXT_PUBLIC_COMPANY_LEGAL_DETAILS`
- `NEXT_PUBLIC_COMPANY_WORK_HOURS`
- `NEXT_PUBLIC_PRIVACY_POLICY_URL`
- `NEXT_PUBLIC_COMPANY_COPYRIGHT`

Все переменные и примеры значений есть в [`.env.example`](./.env.example).

## Режим разработки

```bash
npm run dev
```

Сайт откроется на `http://localhost:3000`.

## Проверка перед публикацией

```bash
npm run lint
npm run build
```

## Запуск на сервере

1. Скопировать проект на сервер.
2. Установить зависимости:

```bash
npm install
```

3. Создать и заполнить `.env.local`.
4. Собрать проект:

```bash
npm run build
```

5. Запустить приложение:

```bash
npm run start
```

По умолчанию приложение работает на порту `3000`.

## Рекомендация для продакшена

- использовать `pm2` или `systemd` для автозапуска
- поставить `Nginx` как reverse proxy
- настроить HTTPS
- настроить SPF, DKIM и DMARC для доменной почты

## Как работает форма заявок

- форма отправляется на серверный action Next.js
- письмо уходит через SMTP заказчика
- на сервере включены базовые защиты: honeypot, ограничение скорости, проверка времени заполнения и валидация полей

## Важно

- проект рассчитан на серверный хостинг с Node.js
- для GitHub Pages эта версия не подходит
- перед сдачей нужно проверить реальные SMTP-настройки заказчика
