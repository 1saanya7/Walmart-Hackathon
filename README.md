
# ValmartXperience: Redefining Retail with AI-First, Human-Centric Shopping
Modern-day shoppers are overwhelmed by choice, lack guided help, and miss the collaborative joy of in-store shopping. They struggle to find the best product without knowing its name, often can't visualize items before buying, and lack real-time support or shared decision-making. These problems are amplified across all Walmart categories—from fashion to furniture to tech.

## Our platform addresses:

- Confusion in product discovery

- Inability to visualize product use

- Lack of collaborative online shopping

- Poor website navigation or buying clarity for new users



## ✨Features

- 👚 **Realistic Try-On**: Uses AI-powered segmentation, pose estimation, and geometric cloth warping to realistically visualize outfits on users.
- 🖥 **Simple and Easy to use UI**: Built using React and Vite for a blazing-fast frontend for all types of users.
- 🔁 **Live Interaction**: Enables users to shop together in real-time, share products, vote on choices, and unlock group-based discounts.
- 🤖 **ChatBot**: Aims to help users with the website walktrough as well as any type of information regarding the current trends and pricing.
- 🔒 **Secure & Scalable**: Uses Flask, SQLAlchemy, and CORS configuration for flexible deployment.
## Virtual-Try On Data Flow
<img src = "https://github.com/user-attachments/assets/25bea623-4b02-43e8-8628-eb31c8173e95" width = "600">
<img src = "https://github.com/user-attachments/assets/7d66f648-a6fb-41f6-8a77-fd4689e6176a" width = "600">

## Group Shopping Architecture
<img src = "https://github.com/user-attachments/assets/aa661b28-255b-4e4f-94e6-b4d2e44ae6ae" width = "600">


## 🛠 Tech Stack


| Layer       | Technology                |
|------------|---------------------------|
| Frontend   | React + Vite + TailwindCSS + TypeScript              |
| Backend    | Flask + Flask-SocketIO    |
| Database   | MongoDB + SQLite (via SQLAlchemy)   |
| Realtime   | WebSockets (Socket.IO)    |
| Deployment | Docker (optional)         |



##  🚀Setup Instructions
### 1️⃣  Clone the Repository
```bash
git clone https://github.com/1saanya7/Walmart-Hackathon
cd Walmart-Hackathon-main
```
### 2️⃣ Group Shopping
#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Backend runs by default at: http://localhost:5000

#### Frontend Setup
```bash    
cd frontend
npm install
npm run dev
```
Frontend runs by default at: http://localhost:5173

### 3️⃣ Virtual Try-On
#### Backend Setup:
```bash
cd Virtual-Try-On/backend
pip install requirements.txt
uvicorn main:app --reload
```
#### Frontend Setup:
```bash
cd Virtual-Try-On/frontend
npm install
npm run dev
```
Open http://localhost:5173 to view in the browser.

### 4️⃣ Book Explorer (Optional)
```bash
cd book-explorer
npm install
node server.js
```
## 🤝Contributing

Contributions and Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.    
Please adhere to this project's `code of conduct`.


## ⚡Acknowledgements
Special thanks to Walmart for hosting the hackathon and supporting innovative retail solutions.
Team powered by passion for Gen-AI, UX, and real-world impact.
