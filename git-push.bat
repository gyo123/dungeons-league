@echo off
setlocal enabledelayedexpansion

cd /d "C:\Users\gyo12\Downloads\craftlandia\CraftLandia\dungeon-site"

set GIT_PATH=C:\Program Files\Git\bin\git.exe

echo 🔧 Inicializando repositorio git...
"%GIT_PATH%" init

echo 👤 Configurando usuario...
"%GIT_PATH%" config user.name "gyo123"
"%GIT_PATH%" config user.email "dev@example.com"

echo 📝 Adicionando arquivos...
"%GIT_PATH%" add .

echo 💾 Fazendo commit...
"%GIT_PATH%" commit -m "Add teams data with images for Dungeon Leagues tournament"

echo 🌐 Adicionando repositorio remoto...
"%GIT_PATH%" remote add origin https://github.com/gyo123/dungeons-league.git

echo ⚙️  Renomeando branch para main...
"%GIT_PATH%" branch -M main

echo 🚀 Fazendo push para GitHub...
"%GIT_PATH%" push -u origin main

echo ✅ Pronto! Codigo enviado para o GitHub!
pause
