# 🤖 ZeroCode FE Assignment – ChatBot App

A fully responsive chatbot built with React, TypeScript, Tailwind CSS, and Hugging Face API. It includes authentication, dark/light mode, voice input, auto-scroll, input history, export, and loading indicators.

---

## 🌐 Live Demo

**🔗 URL**: https://zerocode-fe-assignment-bay.vercel.app
**🧪 Test Credentials**:  
- Username: `test`  
- Password: `test123`

---

## 🛠️ Setup Instructions

### 1. Clone the repository
git clone https://github.com/41Uday/zerocode-fe-assignment.git
cd zerocode

2. Install dependencies
npm install

3. Add Together API Key
Create a .env file in the root directory and add your Together API key:
VITE_TOGETHER_API_KEY=your_key_here

5. Start development server
npm run dev

🧱 Architecture Diagram
+-------------------+      +-----------------------+
|   Register/Login  | ---> | LocalStorage Auth     |
+-------------------+      +-----------------------+
         |                           |
         v                           v
+-------------------+      +-----------------------+
|     Chat Page     | ---> | Together API Call  |
+-------------------+      +-----------------------+
         |
         v
+-------------------+
| Voice Input,      |
| Export, AutoScroll|
| Dark Mode         |
+-------------------+
📁 Project Structure

zerocode/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── together.ts            # Together API logic
│   ├── hooks/
│   │   └── useAuth.ts             # Authentication logic
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Chat.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── tailwind.config.js
├── vite.config.ts
└── README.md

⚙️ Features
✅ JWT-style Auth (localStorage)

✅ Register & Login Pages

✅ Hugging Face Chat Integration

✅ Dark/Light Mode Toggle

✅ Auto-scroll to Latest Message

✅ Input History Stored in Chat

✅ Voice-to-Text Input via Web Speech API

✅ Bot Loading Indicator

✅ Export Chat as .txt File

✅ Fully Mobile Responsive



🧰 Tech Stack
Framework: React + TypeScript

Styling: Tailwind CSS

Auth: localStorage (JWT-style)

LLM: Together AI API

Voice Input: Web Speech API

Bundler: Vite

Deployment: Vercel

👨‍💻 Author
Built with ❤️ by Uday
Submitted for Zerocode Frontend Assignment
