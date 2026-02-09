# Script de Despliegue Automatizado - EcoPet Market
# PowerShell Script para Windows

Write-Host "🚀 Iniciando despliegue de EcoPet Market..." -ForegroundColor Green

# Verificar que las CLIs estén instaladas
Write-Host "`n📦 Verificando herramientas..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
$railwayInstalled = Get-Command railway -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI no está instalado. Instalando..." -ForegroundColor Red
    npm install -g vercel
}

if (-not $railwayInstalled) {
    Write-Host "❌ Railway CLI no está instalado. Instalando..." -ForegroundColor Red
    npm install -g @railway/cli
}

Write-Host "✅ Herramientas verificadas" -ForegroundColor Green

# Desplegar Frontend
Write-Host "`n🌐 Desplegando Frontend en Vercel..." -ForegroundColor Cyan
Set-Location "frontend"
Write-Host "⚠️  Necesitarás autenticarte con: vercel login" -ForegroundColor Yellow
Write-Host "⚠️  Luego ejecuta: vercel --prod" -ForegroundColor Yellow
Set-Location ".."

# Desplegar Backend
Write-Host "`n🚂 Desplegando Backend en Railway..." -ForegroundColor Cyan
Set-Location "backend"
Write-Host "⚠️  Necesitarás autenticarte con: railway login" -ForegroundColor Yellow
Write-Host "⚠️  Luego ejecuta: railway up" -ForegroundColor Yellow
Set-Location ".."

Write-Host "`n✅ Script completado. Sigue las instrucciones arriba para autenticarte y desplegar." -ForegroundColor Green
Write-Host "📖 Ver DEPLOY_AUTOMATED.md para más detalles" -ForegroundColor Yellow
