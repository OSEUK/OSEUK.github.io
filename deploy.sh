#!/bin/bash

# GitHub Pages 배포 스크립트
# 사용법: ./deploy.sh 또는 bash deploy.sh

set -e

echo "🔨 Building project..."
npm run build

echo "📦 Preparing deployment..."
# worktree가 이미 존재하면 제거
if [ -d ".deploy" ]; then
  echo "Removing existing .deploy directory..."
  git worktree remove .deploy --force 2>/dev/null || rm -rf .deploy
fi

# gh-pages 브랜치가 없으면 생성
if ! git show-ref --verify --quiet refs/heads/gh-pages; then
  echo "Creating gh-pages branch..."
  git branch gh-pages
fi

echo "Creating worktree..."
git worktree add .deploy gh-pages

cd .deploy

echo "🧹 Cleaning gh-pages branch..."
git rm -rf . 2>/dev/null || true
git clean -fxd

echo "📋 Copying build files..."
cp -r ../dist/* .
cp ../dist/.nojekyll . 2>/dev/null || true

echo "✅ Committing changes..."
git add -A

if git diff --cached --quiet; then
  echo "No changes to deploy"
  cd ..
  git worktree remove .deploy
  exit 0
fi

git commit -m "Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"

echo "🚀 Pushing to GitHub..."
git push origin gh-pages --force

cd ..

echo "🧹 Cleaning up..."
git worktree remove .deploy

echo ""
echo "✨ Deployment successful!"
echo "🌐 Your site will be available at: https://oseuk.github.io/"
echo "⏱️  GitHub Pages typically takes 1-3 minutes to update"
