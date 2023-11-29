Quick example of a Nest.js CRUD API:
swagger documentation url - /api/docs

Develop a Sensor CRUD API in Nest.js (Typescript)

Sensor Model:
id: STRING (required and unique)
firmwareVersion: 85, 97 or 101 (default Is 85) (required)

Endpoints:
List all sensors
Create sensor - auto generated ID
Update sensor firmware
Delete sensor

All endpoints should have proper validation (required fields and enums).

All of the responses should have proper types.

Manage Sensors[] state in memory or file.
