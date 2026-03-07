# AI Pipeline Builder

This repository features a fully functional, highly interactive ReactFlow node-based canvas on the frontend, powered by a FastAPI Python backend to validate incoming pipeline DAGs (Directed Acyclic Graphs).

## Key Features
- **Interactive Node Canvas:** Uses `reactflow` to let users drag, drop, and connect pipeline logic nodes (LLMs, Inputs, Outputs, APIs, etc.).
- **"Premium SaaS" Gamification:** Intentionally designed with an ultra-premium glassmorphic aesthetic inspired by Vercel and Stripe.
- **Advanced Animations:** Features CSS Houdini `@property` animated glowing borders, `framer-motion` sliding toast notifications, and `gsap` physics springs for dragging nodes and hovering components.
- **Dynamic Theming:** Deeply integrated React Context provider for seamlessly toggling between Dark Mode and Light Mode.
- **Fullstack Validation:** Connects to a FastAPI backend endpoint to mathematically analyze the graph and detect cycles in the DAG.

---

## 🚀 How to Run the Application Locally

To run this project, you need to step into both the `backend` and `frontend` directories and start them in two separate terminal windows.

### 1. Start the Backend (FastAPI)

The backend parses the nodes and edges from the frontend to determine if the pipeline forms a valid Directed Acyclic Graph.

1. Open a new terminal window.
2. Navigate into the `backend` directory:
   ```bash
   cd backend
   ```
3. *(Optional but recommended)* Create and activate a Python virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
4. Install the required dependencies:
   ```bash
   pip install fastapi uvicorn pydantic
   ```
   *(This ensures the server routing and data validation libraries are installed).*

5. Start the backend server:
   ```bash
   python3 -m uvicorn main:app --reload --port 8000
   ```
   *The backend should now be running cleanly at `http://localhost:8000`.*

---

### 2. Start the Frontend (React)

The frontend contains the interactive UI, rendering the ReactFlow canvas and communicating with the backend.

1. Open a **second** (separate) terminal window.
2. Navigate into the `frontend` directory:
   ```bash
   cd frontend
   ```
3. Install the Node.js dependencies:
   ```bash
   npm install
   ```
   *(This single command automatically installs all the advanced libraries I added, including `reactflow`, `framer-motion`, `gsap`, `animejs`, `lucide-react`, `zustand`, and `axios`).*

4. Start the development server:
   ```bash
   npm start
   ```
   *Your browser will automatically open to `http://localhost:3000` displaying the loaded application.*

---

## Usage

1. **Build a Pipeline:** Drag nodes (e.g., Input, Output, LLM) from the left sidebar onto the dotted background canvas.
2. **Connect Nodes:** Click and drag the handles (the small dots on the sides of the nodes) to connect them to each other.
3. **Toggle Theme:** Click the "Light Mode / Dark Mode" toggle in the top right corner to instantly switch the app's aesthetic.
4. **Analyze Graph:** Click the **"Run Pipeline"** button in the top right corner. The frontend will bundle your graph, send it to the FastAPI backend running on port 8000, and a sleek toast notification will physically slide up from the bottom to tell you how many nodes/edges you have and whether the graph is a mathematically valid DAG.
