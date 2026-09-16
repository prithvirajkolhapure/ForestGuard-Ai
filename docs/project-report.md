# ForestGuard AI - Project Report

## Executive Summary
ForestGuard AI is an integrated technology solution aimed at combating illegal logging through automated detection and real-time response mechanisms. By combining satellite/drone imagery with IoT acoustic sensors, the system provides 24/7 coverage of sensitive forest areas.

## Modules Explanation
### 1. AI Detection Module
Uses YOLOv8 for visual object detection. It is trained to identify chainsaws, logging trucks, and unauthorized personnel in dense forest environments.
### 2. Audio Analysis Module
A CNN-based model that analyzes audio streams from field sensors to detect the unique frequency signature of a chainsaw.
### 3. GIS Monitoring Dashboard
A React-based frontend that maps all active sensors and incidents. Heatmaps indicate "Hot Zones" where illegal activity is most frequent based on historical data.
### 4. Alert Engine
A WebSocket-powered notification system that alerts Forest Officers via their dashboard or mobile devices the moment a high-confidence detection occurs.

## Security Strategy
- JWT-based authentication for all API endpoints.
- Role-Based Access Control (RBAC) to ensure only authorized personnel can resolve incidents.
- Encryption for data in transit and at rest.

## Testing Strategy
- **Unit Testing**: Testing individual AI classification functions.
- **Integration Testing**: Ensuring the AI server correctly triggers incidents in the backend.
- **UAT**: Mock scenarios with forest rangers to refine the dashboard UI.
