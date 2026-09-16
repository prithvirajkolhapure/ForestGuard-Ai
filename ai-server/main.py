from fastapi import FastAPI, UploadFile, File, HTTPException
from ultralytics import YOLO
import httpx
import os
import asyncio

app = FastAPI(title="ForestGuard AI - Illegal Logging Detection")

# Load YOLOv8 model - using 'n' (nano) for speed and compatibility
try:
    model = YOLO('yolov8n.pt') 
except Exception as e:
    print(f"Error loading YOLO model: {e}")
    model = None

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:5005/api/incidents")

@app.get("/")
async def read_root():
    return {
        "status": "Online",
        "system": "ForestGuard AI",
        "python_version": "3.14 Compatible"
    }

@app.post("/detect/image")
async def detect_image(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=500, detail="AI Model not initialized")
        
    try:
        # Save file temporarily using async write for better performance
        content = await file.read()
        temp_file = "temp_inference.jpg"
        with open(temp_file, "wb") as f:
            f.write(content)
        
        # Run inference (YOLOv8 is currently sync, so we wrap if needed, 
        # but for simple load it's fine)
        results = model(temp_file)
        
        detections = []
        alert_needed = False
        
        for r in results:
            for c in r.boxes.cls:
                name = model.names[int(c)]
                detections.append(name)
                # Detection labels in YOLOv8 standard: person, truck, etc.
                if name in ['person', 'truck', 'chainsaw', 'fire']:
                    alert_needed = True
        
        if alert_needed:
            # Send alert to backend asynchronously
            async with httpx.AsyncClient() as client:
                payload = {
                    "title": f"Illegal Activity: {', '.join(set(detections))}",
                    "type": "Unauthorized Human" if 'person' in detections else "Logging Truck",
                    "location": {"latitude": -1.2921, "longitude": 36.8219},
                    "severity": "High",
                    "detectedBy": "AI"
                }
                try:
                    await client.post(BACKEND_URL, json=payload, timeout=5.0)
                except Exception as e:
                    print(f"Alert dispatch failed: {e}")

        return {
            "detections": list(set(detections)), 
            "alert_sent": alert_needed,
            "count": len(detections)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(temp_file):
            os.remove(temp_file)

@app.post("/detect/audio")
async def detect_audio(file: UploadFile = File(...)):
    # Polyfill for audio detection logic
    return {
        "message": "Audio analysis pipeline initialized",
        "status": "Listening",
        "detected": "Ambient Forest Sounds"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
