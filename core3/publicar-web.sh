#!/usr/bin/env bash
# ============================================================
# CORE 3 Studio — publicar la web en GitHub Pages
# Ejecuta este script DESDE la carpeta del sitio (donde está index.html)
#   Terminal:  cd "<esta carpeta>"  &&  bash publicar-web.sh
# Requisitos: git y GitHub CLI (gh).  Instala gh con:  brew install gh
# ============================================================
set -e

REPO_NAME="core3-studio-web"     # cambia el nombre si quieres

echo "==> Comprobando herramientas..."
command -v git >/dev/null || { echo "Falta git. Instálalo con: xcode-select --install"; exit 1; }
command -v gh  >/dev/null || { echo "Falta GitHub CLI. Instálalo con: brew install gh"; exit 1; }

echo "==> Iniciando sesión en GitHub (se abrirá el navegador si hace falta)..."
gh auth status >/dev/null 2>&1 || gh auth login

echo "==> Preparando el repositorio local..."
[ -d .git ] || git init -q
git add -A
git commit -q -m "CORE 3 Studio website" || true
git branch -M main

OWNER=$(gh api user -q .login)

echo "==> Creando el repo '$REPO_NAME' en tu cuenta y subiendo..."
gh repo create "$REPO_NAME" --public --source=. --remote=origin --push

echo "==> Activando GitHub Pages..."
gh api -X POST "repos/$OWNER/$REPO_NAME/pages" \
   -f "source[branch]=main" -f "source[path]=/" >/dev/null 2>&1 \
|| gh api -X PUT "repos/$OWNER/$REPO_NAME/pages" \
   -f "source[branch]=main" -f "source[path]=/" >/dev/null 2>&1 || true

echo ""
echo "======================================================"
echo " LISTO. Tu web estará disponible en:"
echo "   https://$OWNER.github.io/$REPO_NAME/"
echo ""
echo " La primera vez tarda 1-2 minutos en activarse."
echo " Para actualizar la web más adelante, desde esta carpeta:"
echo "   git add -A && git commit -m 'cambios' && git push"
echo "======================================================"
