# Setup and Installation Guide

## Prerequisites
- Node.js (v16+)
- Python (3.9+)
- MongoDB (Local or Atlas)
- npm or yarn

## 1. Backend Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   ```
4. `npm run dev`

## 2. AI Server Setup
1. `cd ai-server`
2. `pip install -r requirements.txt`
3. Download yolov8 weight: `yolov8n.pt` (will auto-download on first run)
4. `python main.py`

## 3. Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## 4. Usage
- Login with a default account (register via `/api/auth/register`).
- View the real-time map for active alerts.
- Use the AI Server endpoint `/detect/image` to upload drone footage for testing.
