# 🧠 Brainboard
Brainboard is a second brain application designed to help you capture, organize, and access your most valuable digital content in one place — whether it's tweets, YouTube videos, Google Docs, or articles.

Built for productivity-focused individuals, Brainboard helps you store, tag, and share the content that matters most.

## 🚀 Tech Stack
- Frontend: React, TypeScript, Recoil, ShadCN UI

- Backend: Node.js, Express, MongoDB

## 🧩 Features
- ✍️ Add content: Save links with rich metadata like title, description, type, and tags

- 📚 Organize content: Filter and categorize using tags

- 🔐 User authentication: Signup, login, and secure access to user-specific data

- 📤 Share content: Generate shareable links for public access

- 📥 Minimal UI: Clean, accessible, and responsive interface powered by ShadCN components

## 🌐 Backend API Routes

### 👤 User Routes
- `POST /api/v1/user/signup` - Register a new user with name, email, and password

- `POST /api/v1/user/login` - Login with email and password to receive a token

- `GET /api/v1/user/profile` - Fetch logged-in user's name and email

### 📄 Content Routes
- `POST /api/v1/content` - Add new content with fields: link, type, title, description, tags

- `GET /api/v1/content` - Fetch all content for the logged-in user

- `DELETE /api/v1/content` - Delete a specific content item

### 🔗 Share Routes
- `POST /api/v1/brain/share` - Create a sharable link for selected content

- `GET /api/v1/brain/:shareLink` - Retrieve publicly shared content via the unique link
