# <table><tr><td><img src="frontend/public/assets/img/general/logo.svg" alt="EduPulse Logo" width="50"/></td><td>EduPulse</td></tr></table>

EduPulse is a modern educational platform that connects students and educators, providing an interactive learning environment with real-time feedback and progress tracking.

## 🌟 Features

### User Roles
- **Student**: Enroll in courses, track progress, and complete lessons
- **Instructor**: Create and manage courses, upload content, and monitor student progress
- **Admin**: Manage users, approve courses, and oversee platform operations

### Course Management
- **Course Creation**: Create courses with detailed descriptions, requirements, and learning outcomes
- **Course Sections**: Organize content into sections and lessons
- **Course Approval**: Admin approval system for course publication
- **Featured Courses**: Highlight special courses on the platform
- **Course Pricing**: Support for free and paid courses with actual and discounted prices

### Learning Features
- **Course Enrollment**: Easy enrollment process for students
- **Lesson Progress**: Track completion of individual lessons
- **Course Reviews**: Students can review and rate courses
- **Wishlist**: Save courses for later enrollment
- **Cart System**: Add courses to cart before purchase

### User Features
- **User Profiles**: Customizable profiles with avatars and bios
- **Authentication**: Secure login and registration system
- **Dashboard**: View enrolled courses and progress
- **Course Search**: Find courses by category, instructor, or keywords

### Admin Features
- **User Management**: View, update, and delete user accounts
- **Course Moderation**: Approve or reject courses
- **Featured Course Management**: Mark courses as featured
- **Platform Statistics**: View platform-wide statistics and metrics

## 🛠️ Tech Stack

### Frontend
- Next.js 14 (React Framework)
- TypeScript
- Redux Toolkit for state management
- React Query for data fetching
- Bootstrap 5 for styling
- SCSS for custom styling
- Formik & Zod for form handling
- React Leaflet for maps
- Various UI components (React Quill, React Player, etc.)

### Backend
- FastAPI (Python web framework)
- SQLAlchemy (ORM)
- PostgreSQL (Database)
- JWT Authentication
- Alembic for database migrations
- Pydantic for data validation

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose
- Git

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/manjurulhoque/edu-pulse.git
cd edu-pulse
```

2. Start the development environment:
```bash
docker-compose -f docker-compose.dev.yml up --build
```

3. Initialize the database:
```bash
# Access the container's shell
docker-compose -f docker-compose.dev.yml exec backend sh

# Once inside the container shell, run:
python -m apps.seed

# To exit the shell when done
exit
```

4. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- API Documentation: http://localhost:8080/docs

## 🏗️ Building for Production

Build and push frontend:

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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
