# ZapZapCards

ZapZapCards is a modern web application that helps you create, manage, and study flashcards with ease. Powered by AI, you can generate flashcards from any text or topic, or create your own manually for focused learning. Organize your flashcards into sets, review them interactively, and take control of your study sessions.

## Technology Stack

- **Frontend:** Next.js, React, Material-UI (MUI)
- **Authentication:** Clerk
- **Backend/Database:** Firebase Firestore
- **AI Integration:** Groq LLM (via groq-sdk)
- **Cloud Functions:** Firebase Functions (with Genkit)
- **Other:** Emotion (CSS-in-JS), Vercel Speed Insights

## Features

- **AI Flashcard Generation:** Enter any topic or text and let the AI generate a set of high-quality flashcards for you.
- **Manual Flashcard Creation:** Create your own flashcards by entering custom questions and answers.
- **Flashcard Set Management:** Organize flashcards into named sets, view all your sets, and click to review individual cards.
- **Interactive Review:** Flip cards to test your knowledge, and navigate through your flashcard sets.
- **Edit & Delete:** Delete individual flashcards or entire sets. (Editing is planned; currently, you can delete and recreate cards.)
- **Authentication:** Secure sign-up and sign-in with Clerk.
- **Responsive Design:** Works beautifully on desktop and mobile devices.

## Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/zapzapcards.git
cd zapzapcards
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Firebase

- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
- Enable Firestore and set up your project credentials.
- Create a `.env.local` file in the root directory and add your Firebase config:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
GROQ_API_KEY=your_groq_api_key
```

- (Optional) Set up Clerk for authentication. See [Clerk Docs](https://clerk.com/docs/quickstarts/nextjs) for details.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

### 5. Link to Deployed Application

🔗 [zapzapcards.vercel.app](https://zapzapcards.vercel.app)

- Deploy to Vercel, Firebase Hosting, or your preferred platform.
- For deploying Firebase Functions, navigate to the `functions` directory and follow standard Firebase deployment steps.

---

**Enjoy smarter, faster, and more effective studying with ZapZapCards!**

### 6. System architecture

The ZapZapCards platform uses a modular architecture: a user-friendly frontend communicates with a Node.js backend, which handles AI flashcard generation and data storage. Authentication is managed separately using Clerk, while the backend integrates with Groq’s AI models and Firebase as the database to deliver seamless, real-time flashcard creation.

![image](https://github.com/user-attachments/assets/002f4f80-1ed6-4d89-8feb-6a31b6fa3dad)

### 7. Screenshots of the UI

**Home Page:**  
  A clean, welcoming homepage that lets users instantly choose between AI-generated flashcards or manual creation.

![image](https://github.com/user-attachments/assets/6757de71-5ba9-41d6-b52a-6856c968274f)
<br>
<br>


**Sign Up:**  
  A simple and secure sign-up page powered by Clerk, offering quick registration via email or Google.

![image](https://github.com/user-attachments/assets/4077d1c8-7e1a-4106-9365-fb92a6b0ef54)
<br>
<br>


**Try AI Generate:**  
  An intuitive interface to instantly generate custom flashcards by entering any topic, powered by AI.

![image](https://github.com/user-attachments/assets/15a321b1-fe8e-48c6-b8be-5e350999443b)
<br>
<br>


**Manual Flashcard:**  
  A simple interface to manually create and customize your own flashcards by adding questions and answers.

![WhatsApp Image 2025-07-02 at 14 58 08_3d084aaa](https://github.com/user-attachments/assets/0e9ab32f-99e7-4e10-9768-8568e5a39641)
<br>
<br>


**Saved Flashcard Sets:**  
  A clean dashboard that displays all your created flashcard sets for quick access and management.

![WhatsApp Image 2025-07-02 at 14 56 50_2006640d](https://github.com/user-attachments/assets/12c38e4e-e811-40ff-9fd3-9d2c2d1de910)
<br>
<br>

### 8. Team Members & Contributions

- *Akshit Nalawade*  
  - Full Stack Development, Testing, UI/UX Design, Firebase Integration, and Project Architecture
  - Email: akshitnalawade33@gmail.com

- *Yahya Shaik*  
  - Full Stack Development, Testing, AI Integration, and Documentation
  - Email: yahya.alim.37@gmail.com

ZapZapCards is a collaborative project by Akshit Nalawade and Yahya Shaik.

---

### 9. Future Roadmap & Improvements 

To enhance ZapZapCards into a more robust and interactive learning platform, here are some upcoming features and improvements we aim to implement:

### 📥 Input & Import Features
- *Import flashcards from PDF, DOCX, and image files (via OCR)* for faster set creation.
- *Bulk upload support* to streamline large-scale content ingestion for educators.

### 📤 Export & Sharing
- *Shareable flashcard links* for public or restricted access.
- *Export flashcards as PDF/CSV* for offline use or printout.
- *Classroom mode* for teachers to share sets with students.

### 🎮 Gamification & Engagement
- *Interactive quizzes* generated from flashcards.
- *Scoring and leaderboard system* to make learning competitive and fun.
- *Daily challenge mode* to reinforce learning consistency.

### 🧠 AI-Powered Enhancements
- *Smart tagging and category suggestions* using NLP.
- *Auto-summarization and question generation* from imported content.

### 🔧 Usability Improvements
- *Mobile responsiveness improvements* for better accessibility.
- *Enhanced search and filtering* for large flashcard libraries.
- *Dark mode* for comfortable night-time studying.
