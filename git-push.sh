#!/bin/bash

cd "/c/Users/gyo12/Downloads/craftlandia/CraftLandia/dungeon-site"

echo "🔧 Inicializando repositório git..."
git init

echo "👤 Configurando usuário..."
git config user.name "gyo123"
git config user.email "dev@example.com"

echo "📝 Adicionando arquivos..."
git add .

echo "💾 Fazendo commit..."
git commit -m "Add teams data with images for Dungeon Leagues tournament"

echo "🌐 Adicionando repositório remoto..."
git remote add origin https://github.com/gyo123/dungeons-league.git

echo "⚙️  Renomeando branch para main..."
git branch -M main

echo "🚀 Fazendo push para GitHub..."
git push -u origin main

echo "✅ Pronto! Código enviado para o GitHub!"
