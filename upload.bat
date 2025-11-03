@echo off
REM Change to your project directory
cd /d "C:\Users\Md Sohag Rana\Downloads\EMBY"

REM Initialize Git if not already done
IF NOT EXIST .git (
    git init
    git branch -M main
    git remote add origin https://github.com/sohag1192/Emby-banner-content-display-.git
)

REM Add all files
git add .

REM Commit with a default message
git commit -m "Automated commit via batch file"

REM Push to GitHub
git push -u origin main

pause