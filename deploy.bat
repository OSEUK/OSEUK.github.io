@echo off
REM GitHub Pages 배포 스크립트 (Windows)
REM 사용법: deploy.bat

echo 🔨 Building project...
call npm run build
if errorlevel 1 (
    echo Build failed!
    exit /b 1
)

echo 📦 Preparing deployment...
REM worktree가 이미 존재하면 제거
if exist ".deploy" (
    echo Removing existing .deploy directory...
    git worktree remove .deploy --force 2>nul
    if exist ".deploy" rmdir /s /q .deploy
)

REM gh-pages 브랜치가 없으면 생성
git show-ref --verify --quiet refs/heads/gh-pages
if errorlevel 1 (
    echo Creating gh-pages branch...
    git branch gh-pages
)

echo Creating worktree...
git worktree add .deploy gh-pages
if errorlevel 1 (
    echo Failed to create worktree!
    exit /b 1
)

cd .deploy

echo 🧹 Cleaning gh-pages branch...
git rm -rf . 2>nul
git clean -fxd

echo 📋 Copying build files...
xcopy /E /I /Y ..\dist\* .
if exist ..\dist\.nojekyll copy /Y ..\dist\.nojekyll .

echo ✅ Committing changes...
git add -A

git diff --cached --quiet
if not errorlevel 1 (
    echo No changes to deploy
    cd ..
    git worktree remove .deploy
    exit /b 0
)

git commit -m "Deploy to GitHub Pages - %date% %time%"

echo 🚀 Pushing to GitHub...
git push origin gh-pages --force
if errorlevel 1 (
    echo Push failed!
    cd ..
    git worktree remove .deploy
    exit /b 1
)

cd ..

echo 🧹 Cleaning up...
git worktree remove .deploy

echo.
echo ✨ Deployment successful!
echo 🌐 Your site will be available at: https://oseuk.github.io/
echo ⏱️  GitHub Pages typically takes 1-3 minutes to update
