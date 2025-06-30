@echo off
title Ankara Usta Bul - Development Server
color 0A

echo.
echo ========================================
echo   Ankara Usta Bul Development Server
echo ========================================
echo.
echo Starting development server...
echo Server will be available at: http://localhost:3000
echo Browser will open automatically in 5 seconds...
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the development server
npm run dev

REM Wait for server to start and open browser
timeout /t 5 /nobreak >nul
start http://localhost:3000

echo.
echo ========================================
echo   Development server is running!
echo   Browser should be open now.
echo ========================================
echo.
echo To stop the server, press Ctrl+C
echo.
pause 