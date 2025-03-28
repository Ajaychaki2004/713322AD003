# 🚀 Social Media Analytics Dashboard

This is a **Next.js + TypeScript + Tailwind CSS** based frontend project.

---

## 📂 Folder Structure

```
📦 dashboard
┣ 📁 app
┃ ┣ 📄 page.tsx             
┃ ┣ 📁 top-users
┃ ┃ ┗ 📄 page.tsx           
┃ ┣ 📁 posts
┃ ┃ ┗ 📄 page.tsx           
┃ ┣ 📁 feed
┃ ┃ ┗ 📄 page.tsx           
┣ 📁 public
┣ 📄 package.json
┣ 📄 tailwind.config.js
┣ 📄 next.config.js
┣ 📄 README.md
```

---

## 📌 Features

### 1. Top Users
- Displays top 5 users based on number of posts.
- Shows profile initials as avatars.
- Responsive layout with hover effects.

### 2. Trending Posts
- Displays posts with the highest comment count.
- Uses loader while fetching.
- Graceful message if token is invalid.

### 3. Feed
- Displays latest posts in real-time order.
- Clean scrollable UI, dynamically updates.

---

## 🚪 API Endpoints Used

These APIs are consumed from ’s provided backend:

- **Top Users**: `GET http://localhost:8000/top-users/`
- **Trending Posts**: `GEThttp://localhost:8000/api/posts/popular/`
- **Latest Feed**: `GET http://localhost:8000/api/posts/latest/`

> Note: Token must be provided where required.

---

## 💡 Tech Stack

- **Framework**: [Next.js 15.2.4](https://nextjs.org/)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React

---

## 📢 Notes

- All three required pages are implemented.
- API integration is complete and dynamic.
- Loading, fallback, and responsiveness all prioritized.
- Designed keeping user experience and clarity in mind.
- Modular code and structured folder system.

---
