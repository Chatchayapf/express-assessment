# Product Management App (React + Express)

เว็บแอปพลิเคชันสำหรับการจัดการข้อมูลสินค้าแม่และเด็ก (CRUD Operations) เชื่อมต่อระหว่าง Frontend (React) และ Backend (Express API)

---

## ก่อนเริ่มรันโปรเจกต์ โปรดตรวจสอบว่าเครื่องคอมพิวเตอร์ได้ติดตั้งซอฟต์แวร์ต่อไปนี้แล้ว:

- **Node.js** (เวอร์ชัน 18.x ขึ้นไป)
- **npm** (มาพร้อมกับ Node.js)

---

### Tech Stack & Ports

- Frontend: React (Vite) — http://localhost:5173 (Port 5173)
- Backend: Node.js + Express — http://localhost:3001 (Port 3001)

## วิธีการรันโปรเจกต์แบบ Local

### 1. Backend (Express Server)

1. เปิด Terminal แล้วเข้าไปที่โฟลเดอร์ `backend`
   ```bash
   cd backend
   ```
2. ติดตั้ง Dependencies
   ```bash
   npm install
   ```
3. เริ่มต้นรัน Server
   ```bash
   npm run dev
   ```
   (ในส่วนนี้ถ้าไม่ใช้ npm run dev สามารถใช้ node server.js ดูได้)

- Status: Backend (server) รันอยู่ที่ http://localhost:3001

### 2.Frontend (React Client)

1. เปิด Terminal อีกหน้าต่าง (Split Terminal) แล้วเข้าไปที่โฟลเดอร์ `frontend`
   ```bash
   cd frontend
   ```
2. ติดตั้ง Dependencies
   ```bash
   npm install
   ```
3. เริ่มต้นรัน Client Application
   ```bash
   npm run dev
   ```

- Status: Frontend (client) รันอยู่ที่ http://localhost:5173