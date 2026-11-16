@echo off
rem Комітить увесь проєкт і відправляє в репозиторій на GitHub (або іншому Git-сервері).
rem Запуск: подвійний клік по файлу. Перший раз попросить посилання на репозиторій,
rem а також ім'я й email для комітів, якщо їх ще не налаштовано.
chcp 65001 >nul
cd /d "%~dp0"

where git >nul 2>nul
if errorlevel 1 (
  echo Git не встановлено. Завантажте його з https://git-scm.com/download/win і запустіть цей файл ще раз.
  pause
  exit /b 1
)

rem 1. Репозиторій
if exist ".git" goto have_repo
echo Створюю Git-репозиторій...
git init
git branch -M main
:have_repo

rem 2. Ім'я й email автора (лише для цього проєкту)
git config user.name >nul 2>nul
if not errorlevel 1 goto have_name
set /p GIT_NAME=Ваше ім'я для комітів (наприклад, Ірина Петренко): 
git config user.name "%GIT_NAME%"
:have_name
git config user.email >nul 2>nul
if not errorlevel 1 goto have_email
set /p GIT_EMAIL=Ваш email (той самий, що на GitHub): 
git config user.email "%GIT_EMAIL%"
:have_email

rem 3. Віддалений репозиторій
git remote get-url origin >nul 2>nul
if not errorlevel 1 goto have_remote
echo.
echo Створіть на GitHub ПОРОЖНІЙ репозиторій (без README, .gitignore і ліцензії)
echo і скопіюйте його посилання, наприклад https://github.com/ваш-логін/genokarta.git
set /p REPO_URL=Посилання на репозиторій: 
git remote add origin "%REPO_URL%"
:have_remote

rem 4. Коміт
echo.
set "COMMIT_MSG=Генокарта: оновлення проєкту"
set /p COMMIT_MSG=Опис коміту (Enter — "%COMMIT_MSG%"): 
git add -A
git diff --cached --quiet
if errorlevel 1 (
  git commit -m "%COMMIT_MSG%"
) else (
  echo Нових змін немає — комітити нічого.
)

rem 5. Відправлення
echo.
echo Відправляю на сервер...
git push -u origin main
if errorlevel 1 (
  echo.
  echo Не вдалося відправити. Найчастіші причини:
  echo  - репозиторій на GitHub не порожній: створіть новий без README або виконайте
  echo    git pull origin main --allow-unrelated-histories
  echo  - треба увійти в GitHub: Git відкриє вікно входу, після нього запустіть файл ще раз
  echo  - помилка в посиланні: git remote set-url origin НОВЕ_ПОСИЛАННЯ
) else (
  echo.
  echo Готово! Посилання на репозиторій:
  git remote get-url origin
)
echo.
pause
