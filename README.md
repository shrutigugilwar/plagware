# PlagAware 🔍📄

A full-stack Plagiarism Detection Web App using **Java Spring Boot (backend)** and **React.js + TailwindCSS (frontend)**. This project allows users to upload text files, select from different plagiarism detection algorithms (Cosine Similarity or LCS), and view similarity results instantly.

---

## 🚀 Features

- Upload and store multiple text files
- Choose between **Cosine Similarity** or **Longest Common Subsequence (LCS)** algorithm
- Get plagiarism similarity % between two selected files
- Clean and responsive UI using Tailwind CSS
- Backend database support using Spring Data JPA

---

## 🖥️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Spring Boot
- Spring Web
- Spring Data JPA
- H2 Database

---

## How It Works
- User uploads or pastes content from two different files.
- Backend stores the files temporarily using H2 database.
- User selects two files and chooses a comparison algorithm:
- Cosine: Text similarity using vector space model
- LCS: Measures the longest matching subsequence
- Server returns the similarity percentage.
- UI displays results clearly and instantly.

---

## 🧠 Algorithms Used
- Cosine Similarity: Vector-based similarity for text
- LCS (Longest Common Subsequence): Measures sequence-based similarity

## 🔮 Future Enhancements
- Add PDF/DOCX support
- Add user login and dashboard
- Save file comparison history
- Deploy on cloud (e.g., AWS, Vercel)


##  Author
- Shruti Gugilwar
- Final Year CSE Student at VIT-AP 🎓
