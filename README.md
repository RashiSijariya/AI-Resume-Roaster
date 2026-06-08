# 🔥 AI Resume Roaster

A brutally honest, AI-powered resume analyzer built with vanilla JavaScript and the Google Gemini API. Paste your resume, get a score, a roast, and actionable feedback — all in one API call.

## ✨ Features

- 📊 **Resume Score** out of 100 with breakdown across Impact, Clarity, and Cringe
- 🔥 **AI Roast** — funny but genuinely useful overall feedback
- ⚠️ **Red Flags** — things that hurt your chances
- ✅ **What's Good** — strengths worth keeping
- 💡 **Top 3 Fixes** — actionable improvements to make right now
- ⚡ **Single API Call** — no per-question calls, instant results

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML, CSS, JavaScript | Frontend UI |
| Google Gemini 2.5 Flash API | AI resume analysis |
| `responseSchema` (Gemini) | Enforced structured JSON output |
| REST API | Communication with Gemini backend |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-resume-roaster.git
cd ai-resume-roaster
```

### 2. Get a Gemini API Key

- Go to [https://aistudio.google.com](https://aistudio.google.com)
- Sign in and click **"Get API Key"**
- Copy your key

### 3. Add your API Key

Open `script.js` and replace:

```js
const API_KEY = "YOUR_GEMINI_API_KEY_HERE";
```

### 4. Run the project

Just open `index.html` in your browser — no server or install needed.

---

## 📁 Project Structure

```
ai-resume-roaster/
│
├── index.html       # Main UI and layout
├── style.css        # Styling
└── script.js        # Gemini API integration and logic
```

---

## 🧠 How It Works

1. User pastes resume text into the input box
2. On submit, a single API call is made to **Gemini 2.5 Flash**
3. A `responseSchema` is passed to enforce valid structured JSON output
4. The response is parsed and rendered dynamically into score cards, tags, and fix lists

---

## 📌 Key Learnings

- Integrating **Google Gemini API** with vanilla JavaScript
- Using **`responseSchema`** to enforce JSON structure and avoid markdown wrapping issues
- **Prompt engineering** for consistent, structured AI output
- Building a clean **multi-screen SPA** without any framework

---

## 🙋‍♀️ Author

**Rashi Sijariya**  
📧 rashisijariya768@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/rashi-sijariya-43b41628b)  
🐙 [GitHub](https://github.com/RashiSijariya)

---

## ⚠️ Disclaimer

Keep your API key private. Do not push `script.js` with your real API key to a public repository. Use environment variables or a `.env` file if deploying to a server.
