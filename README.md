# ForestGuard AI – Illegal Logging Detection Web Application

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/prithvirajkolhapure/ForestGuard-Ai)

## 1. Project Overview
ForestGuard AI is a comprehensive web application designed to detect and monitor illegal logging activities in real-time. It leverages advanced technologies including drone footage, satellite imagery, IoT forest sensors, and audio detection (e.g., chainsaw sounds) combined with cutting-edge AI/ML models.

The system automatically generates alerts, visualizes active risk zones on GIS maps, notifies relevant forest authorities, and maintains an immutable log of incidents for further investigation.

## 2. Directory Structure
- `/frontend`: React.js + Tailwind CSS web application.
- `/backend`: Node.js + Express backend server (REST API + WebSockets).
- `/ai-server`: FastAPI server hosting YOLOv8 (Image/Video) and Audio ML models.
- `/docs`: Architecture, Database Schema, API documentation, and Deployment Guides.
- `/.github/workflows`: CI/CD pipelines.

## 3. High-Level Architecture
1. **IoT / Drone / Audio Sensors** send data (images, audio streams, metrics) to the **AI Server (FastAPI)** and **Backend (Node.js)**.
2. **AI Server** runs YOLOv8 and Audio Classification models. If illegal activity is detected, it sends an alert payload via webhook to the Backend.
3. **Backend** processes the alert, stores the incident in **MongoDB**, and broadcasts a live notification via **WebSockets** to connected clients.
4. **Frontend Dashboard** receives the WebSockets event, updates the GIS Map, and generates visual/audio notifications for Forest Officers.

## 4. Run Virtually in Cloud (1-Click GitHub Codespaces)
Run the entire platform directly in your browser with zero local installations:

1. Click the green **Code** button on GitHub $\rightarrow$ **Codespaces** tab $\rightarrow$ **Create codespace on main**.
2. Once the cloud environment loads, run:
   ```bash
   ./start-all.sh
   ```
3. Codespaces will automatically forward port `5173` and open the live web dashboard in your browser.

## 5. Local Setup Guide
Please refer to `docs/setup-guide.md` for detailed instructions on getting the system running locally.
