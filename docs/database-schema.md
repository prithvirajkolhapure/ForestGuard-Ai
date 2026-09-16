# ER Diagram and Database Schema

## Collections

### 1. Users
- `_id`: ObjectId
- `name`: String
- `email`: String (Unique)
- `password`: String (Hashed)
- `role`: Enum ['Admin', 'Forest Officer', 'Ranger']

### 2. Incidents
- `_id`: ObjectId
- `title`: String
- `type`: Enum ['Tree Cutting', 'Chainsaw Sound', 'Unauthorized Human', 'Logging Truck']
- `location`: { lat: Number, lng: Number }
- `severity`: Enum ['Low', 'Medium', 'High', 'Critical']
- `status`: Enum ['Pending', 'Investigating', 'Resolved']
- `imageUrl`: String (S3 URL)
- `detectedBy`: String
- `timestamp`: Date

### 3. Sensors
- `sensorId`: String
- `type`: String
- `status`: Enum ['Active', 'Inactive']
- `location`: { lat: Number, lng: Number }
- `battery`: Number

### 4. Analytics
- `date`: Date
- `incidentsCount`: Number
- `regionActivity`: Array
