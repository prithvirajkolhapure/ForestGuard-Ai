#!/bin/bash
set -e

echo "==============================================="
echo "🌲 Setting up ForestGuard AI in Cloud Codespace"
echo "==============================================="

# Install backend dependencies
echo "📦 Installing backend packages..."
cd backend && npm install && cd ..

# Install frontend dependencies
echo "📦 Installing frontend packages..."
cd frontend && npm install && cd ..

# Install AI server dependencies
echo "📦 Installing Python packages for AI Server..."
pip install -r ai-server/requirements.txt

echo "==============================================="
echo "✅ Environment Ready!"
echo "To start the frontend:"
echo "  cd frontend && npm run dev"
echo "To start the backend:"
echo "  cd backend && npm start"
echo "To start the AI server:"
echo "  cd ai-server && python main.py"
echo "==============================================="
