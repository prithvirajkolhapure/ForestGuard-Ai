#!/bin/bash

# Trap Ctrl+C to kill all background processes cleanly
trap 'kill $(jobs -p) 2>/dev/null; exit' SIGINT SIGTERM EXIT

echo "🌲 Starting ForestGuard AI Cloud Stack..."

# 1. Start AI Server
echo "🚀 Starting AI Server (FastAPI) on port 8000..."
(cd ai-server && python3 main.py) &

# 2. Start Backend Server
echo "🚀 Starting Backend (Node.js/Express) on port 5005..."
(cd backend && npm start) &

# 3. Wait 2 seconds and start Frontend
sleep 2
echo "🚀 Starting Frontend (Vite/React) on port 5173..."
cd frontend && npm run dev

