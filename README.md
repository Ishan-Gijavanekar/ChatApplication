# 💬 ChatApplication

**ChatApplication** is a real-time, full-stack chat system built with the MERN (MongoDB, Express, React, Node.js) stack and WebSocket for live communication. It supports user authentication, private and group chats, and displays a clean, responsive UI for seamless messaging.

🚀 **Live Demo:** [https://chatapplication-ief8.onrender.com/](https://chatapplication-ief8.onrender.com/)

---

## 🔑 Key Features

- **User Authentication** – Register, login, and maintain sessions
- **Real-time Messaging** – Instant chat powered by Socket.io
- **User Presence** – Shows which users are online
- **Chat Types** – Support for one-on-one and group conversations
- **Message History** – Persist chat history in MongoDB
- **Responsive Interface** – Clean UI built with React

---

## 🧱 Project Structure

```

/backend
├── config/             # Database and Socket.io setup
├── controllers/        # Business logic for users and messages
├── models/             # Mongoose schemas: User, Message, Chat
├── routes/             # REST endpoints for sign up/login/etc.
├── sockets/            # Socket.io event handlers
└── server.js           # App entry with Express and WebSocket

/frontend
├── public/             # Static assets and index.html
├── src/
│   ├── api/            # Axios requests to REST API
│   ├── components/     # ChatRoom, MessageList, LoginForm, Sidebar
│   ├── context/        # React Context for Auth and Chat state
│   ├── hooks/          # Custom hooks: useAuth, useChat, useSocket
│   ├── pages/          # AuthPage, ChatPage, ProfilePage
│   ├── App.js          # Route & layout setup
│   └── index.js        # Root render and context providers
.gitignore
README.md

````

---

## ⚙️ Setup & Installation

### ⚙️ Backend

```bash
cd backend
npm install
````

Create a `.env` in `/backend`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_jwt_secret_key
```

Start the backend:

```bash
npm run dev
# or
npm start
```

### 💻 Frontend

```bash
cd frontend
npm install
```

In `/frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm start
```

---

## 🔐 Authentication Flow

1. Users register or log in to get a JWT.
2. JWT is saved (localStorage or HTTP-only cookie).
3. Protected REST routes use middleware to validate JWT.
4. WebSocket connections send the JWT for authentication.
5. AuthContext manages user session state in React.

---

## 🧠 Real-Time Chat via Socket.io

* Upon connecting, clients join “rooms” (private or group).
* The server broadcasts messages to the correct room.
* Presence updates (join/leave) are emitted to all participants.
* ChatContext and custom `useSocket` hook handle events client-side.

---

## 🗄️ Database Models

* `User`: Stores username, email, hashed password, online status
* `Message`: Contains content, timestamp, sender ID, and chat ID

---

## 🛠️ API Endpoints

| Method | Route                         | Description                   |
| ------ | ----------------------------- | ----------------------------- |
| POST   | `/api/auth/register`          | Register a new user           |
| POST   | `/api/auth/login`             | Login and get JWT             |
| GET    | `/api/users/me`               | Get current user info         |
| GET    | `/api/chats`                  | List available chats for user |
| GET    | `/api/chats/:chatId/messages` | Fetch message history         |
| POST   | `/api/chats`                  | Create a new chat room        |

WebSocket Events:

* `joinChat`, `leaveChat`, `message`, `typing`, `onlineUsers`, etc.

---

## 🧪 Testing (Optional)

If you have set up tests (e.g., Jest, Supertest):

```bash
cd backend
npm test

cd frontend
npm test
```

---

## 🌍 Deployment

The app is deployed live at:

👉 **[https://chatapplication-ief8.onrender.com/](https://chatapplication-ief8.onrender.com/)**

### Deployment Strategy:

* Hosted on **Render**, with separate backend and frontend builds.
* MongoDB Atlas for database hosting.
* Backend serves the React frontend build or they can be hosted individually.

#### Setup Steps:

1. Build frontend:

   ```bash
   npm run build
   ```
2. Serve static files from `/frontend/build`.
3. Add environment variables in Render dashboard for both services.

---

## 📋 Environment Variables

### Backend `.env`

```env
PORT=5000
MONGO_URI=<your MongoDB connection string>
JWT_SECRET=<your JWT secret>
```

### Frontend `.env`

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🔮 Roadmap

* [ ] Online status indicator (e.g., “typing…”)
* [ ] Profile customization (status message, avatar)
* [ ] Search chats and users
* [ ] Notifications for new messages
* [ ] Group invite management
* [ ] Deploy as a PWA

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/YourFeature`
3. Commit: `git commit -m 'Add YourFeature'`
4. Push: `git push origin feature/YourFeature`
5. Open a Pull Request

---

## 📄 License

Licensed under MIT — see [LICENSE](LICENSE) for more information.

---

## 🙋 Contact

**Ishan Gijavanekar**
GitHub: [@Ishan-Gijavanekar](https://github.com/Ishan-Gijavanekar)

---

Start chatting instantly with **ChatApplication**! 🚀
