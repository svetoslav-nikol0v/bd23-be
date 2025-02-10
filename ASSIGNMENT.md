Full Stack Engineer - Home Assignment

Objective
This assignment aims to assess your full-stack development skills by creating an abstraction layer over the Star Wars API (SWAPI: https://swapi.dev/). The goal is to build a simplified, more user-friendly API that interacts with SWAPI and serves data in a more manageable format. You are free to use any language/framework combinations you are comfortable with (e.g., Node.js/NestJS/Express, Python/Flask/Django, Ruby on Rails, PHP etc.). Please document your choices in a README file.

Requirements
Fetch & Aggregate Data

Implement endpoints to fetch data from SWAPI (e.g., /films, /people, /starships, etc.).
Allow querying by specific fields (e.g., get characters by name, films by release year).
Aggregate related data (e.g., enrich character data with starships they have piloted).
Sorting & Filtering

Allow sorting by any available field (e.g., ?sort=name for people, ?sort=release_date for films).
Support ascending and descending order (?sort=name&order=desc).
Implement filtering based on multiple criteria.
Caching & Performance

Implement in-memory caching (e.g., Redis, Node.js cache) to reduce external API calls.
Use pagination for large lists (?page=2&limit=10).
Authentication & Rate Limiting (Optional, for an extra challenge)

Require authentication using either an API key or JWT token.
Implement rate limiting (e.g., limit requests per minute).
Validation

Validate incoming requests to ensure required parameters are present.
Implement data validation for query parameters (e.g., enforce correct data types for sorting and filtering options).
Return meaningful error messages for invalid or missing inputs.
Endpoint Versioning

Implement versioning for your API.
Ensure backward compatibility by supporting multiple versions if needed.
Tech Stack

Backend: NestJS (or Express, if flexibility is preferred).
Frontend (Optional): Basic UI to showcase API data (React or Next.js).
Database (Optional): If persistence is needed, use SQLite/PostgreSQL.
Bonus Features
Authorization: Implement role-based access control (RBAC) or permission-based access to specific API endpoints (e.g., admin vs. regular users).
Logging System: Log API requests and responses (e.g., using Winston or a similar logging library).
Dockerized Setup: Provide a Dockerfile and docker-compose.yml for easy deployment.
Unit Tests: Write tests for key functionalities using Jest or another testing framework.
Submission Requirements
Provide a public GitHub repository with the project code.
Include a README.md with setup instructions and API documentation.
If a frontend is implemented, include a demo link or setup guide.
This assignment is designed to evaluate your full-stack development skills, API design, and ability to optimize performance. Good luck!
