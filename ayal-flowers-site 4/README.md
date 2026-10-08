# AYAL FLOWERS — сайт-каталог

Статический сайт без сборки (HTML + CSS + JS). Адреса: `/`, `/catalog`, `/catalog/<категория>`, `/product/<id>`, `/about`, `/delivery`, `/contacts`.

## Структура
- `index.html` — оболочка страницы
- `assets/config.js` — контакты (WhatsApp, Telegram, телефон, адрес, e-mail, часы)
- `assets/data.js` — категории, букеты, цены, размеры
- `assets/app.js` — роутер, каталог, карточки, окно заказа
- `assets/styles.css` — стили
- `vercel.json` — переписывание адресов на `index.html` и заголовки безопасности
- `robots.txt`, `sitemap.xml` — для поисковиков

## Публикация на Vercel
1. Загрузите папку в GitHub-репозиторий.
2. На vercel.com: Add New → Project → выберите репозиторий.
3. Framework Preset: **Other**. Build Command и Output Directory оставьте пустыми. Deploy.

Через консоль: `npx vercel --prod` в этой папке.

## Что заменить перед запуском
- `assets/config.js`: реальные контакты. WhatsApp — номер без `+`, только цифры.
- `robots.txt` и `sitemap.xml`: замените `https://ayalflowers.com` на ваш домен.
- `assets/data.js`: ваши букеты и цены. Цена в строке — для размера S, размеры M и L считаются как ×1,5 и ×2 (`SZS`).

## Фотографии
Добавьте в конец строки букета ссылку на фото с хостинга изображений (https), например:
`[1,'Оливковая нота','author',68,'Состав',[...],'r',1,'https://…/photo.jpg']`
Без ссылки показывается встроенная иллюстрация. Локальные файлы не нужны.

## Локальный просмотр
`npx serve -s .` (флаг `-s` включает переход на `index.html` для вложенных адресов).
