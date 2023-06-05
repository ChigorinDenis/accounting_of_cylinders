@echo off

REM Проверка установки зависимостей
if not exist node_modules (
    echo Установка зависимостей...
    npm install
)

REM Запуск компиляции React кода
start cmd /k "echo Компиляция React кода... && npm run watch"

REM Запуск Electron приложения
start cmd /k "echo Запуск Electron приложения... && npm start"
