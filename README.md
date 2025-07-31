Signal Decoder Game 🎮
A fun memory-based game built with React, TypeScript, Vite, and TailwindCSS.
Your goal is to remember and select the flashing squares correctly to score points and win!

🚀 Getting Started
1. Extract the Project
Download and extract the ZIP file containing the project.

2. Open the Project Folder
Open the extracted folder in your terminal and run:

code .
(This opens the project in VS Code)

3. Install Dependencies
Inside the terminal, run:

npm install


4. Start the Development Server
Run the project with:

npm run dev


5. Open in Browser
The app will be running at:
👉 http://localhost:5173

🎮 Game Features
✅ Responsive design (mobile + desktop)

✅ Light / Dark mode toggle 🌙☀️

✅ Sound effects (click, beep, win, etc.) 🔊

✅ Animations (flash, shake, pop, fade) ✨

✅ Multiple levels with scoring system 🏆

✅ Win screen with replay option 🎉

🛠️ Tech Stack
Vite + React + TypeScript

TailwindCSS v4

Custom CSS Animations

LocalStorage theme persistence

📂 Folder Structure
bash
Copy
Edit
📦 project-root
 ┣ 📂 src
 ┃ ┣ 📂 assets/sounds     # game sound files
 ┃ ┣ 📂 components        # Grid component
 ┃ ┣ 📂 hooks             # useSound hook
 ┃ ┣ 📂 utils             # rules logic
 ┃ ┣ App.tsx              # main game logic
 ┃ ┣ main.tsx             # React entry point
 ┃ ┗ index.css            # global styles + dark mode
 ┣ index.html
 ┣ package.json
 ┗ README.md
📜 License
This project is created for learning & demonstration purposes.
