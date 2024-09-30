Run from root folder:

```bash
docker-compose -f docker-compose-dev.yml up --build
```

Build and push fronend:

```bash
docker build -t edu-pulse-frontend frontend/
docker tag edu-pulse-frontend manjurulhoque/edu-pulse-frontend:latest
docker push manjurulhoque/edu-pulse-frontend:latest
```

Build and push backend:

```bash
docker build -t edu-pulse-backend backend
docker tag edu-pulse-backend manjurulhoque/edu-pulse-backend:latest
docker push manjurulhoque/edu-pulse-backend:latest
```
