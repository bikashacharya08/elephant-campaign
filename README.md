# 🐘 Elephant Campaign Platform

A full-stack web application built to gather and manage volunteer applications for elephant conservation efforts. 

This repository is a **Monorepo** containing both the client-side user interface and the server-side API.

## 💻 Tech Stack

**Frontend:**
- Next.js (React Framework)
- TypeScript
- Tailwind CSS

**Backend:**
- Laravel 11 (PHP Framework)
- MySQL Database
- RESTful API Architecture

## ✨ Key Features
- **Responsive UI:** Modern, accessible landing page designed for campaign awareness.
- **Form Handling:** Asynchronous data submission using React state and fetch API.
- **Database Integration:** Secure backend routing that catches payload data and inserts it directly into a relational database.

## 🚀 How to Run Locally

To run this project on your local machine, you will need Node.js, Composer, and XAMPP installed.

### 1. Database Setup (XAMPP)
- Open XAMPP Control Panel and start **Apache** and **MySQL**.
- Open phpMyAdmin (`http://localhost/phpmyadmin`).
- Create a new database named `elephant_campaign_db`.

### 2. Backend Engine (Laravel)
Open a terminal and navigate to the backend directory:
```bash
cd elephant-campaign-backend
