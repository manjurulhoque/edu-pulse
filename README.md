Run from root folder:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

```bash
# Access the container's shell
docker-compose -f docker-compose.dev.yml exec backend sh

# Once inside the container shell, run:
python -m apps.seed

# To exit the shell when done
exit
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
