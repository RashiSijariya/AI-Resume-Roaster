const API_KEY = "YOUR_GEMINI_API_KEY";
 
const loadingMsgs = [
  "Judging your life choices...",
  "Counting buzzwords...",
  "Noticing you said 'passionate' 4 times...",
  "Preparing the roast..."
];
 
async function roastResume() {
  const resume = document.getElementById('resume-input').value.trim();
  if (!resume || resume.length < 50) {
    document.getElementById('input-err').textContent = 'Please paste a proper resume (at least a few lines).';
    return;
  }
  document.getElementById('input-err').textContent = '';
  showScreen('screen-loading');
 
  let i = 0;
  const msgEl = document.getElementById('loading-msg');
  const interval = setInterval(() => { msgEl.textContent = loadingMsgs[i++ % loadingMsgs.length]; }, 1800);
 
  const prompt = `You are a brutally honest, witty resume coach. Roast the given resume with sharp humor but also give genuinely useful, actionable feedback.
 
Resume:
${resume}
Keep all text fields short and concise. Max 2 sentences per field.`;
 
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                score:         { type: "INTEGER" },
                verdict:       { type: "STRING" },
                sub:           { type: "STRING" },
                roast:         { type: "STRING", maxLength: 300 },
                red_flags:     { type: "ARRAY", items: { type: "STRING" } },
                good_parts:    { type: "ARRAY", items: { type: "STRING" } },
                top_fixes:     { type: "ARRAY", items: { type: "STRING" } },
                impact_score:  { type: "INTEGER" },
                clarity_score: { type: "INTEGER" },
                cringe_score:  { type: "INTEGER" }
              },
              required: ["score","verdict","sub","roast","red_flags","good_parts","top_fixes","impact_score","clarity_score","cringe_score"]
            }
          }
        })
      }
    );
 
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData?.error?.message || `HTTP Error ${res.status}`);
    }
 
    const data = await res.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    const r = JSON.parse(raw);
 
    clearInterval(interval);
    showResult(r);
 
  } catch (e) {
    clearInterval(interval);
    showScreen('screen-input');
    document.getElementById('input-err').textContent = `Error: ${e.message}`;
  }
}
 
function scoreClass(s) {
  if (s < 40) return 'score-bad';
  if (s < 70) return 'score-mid';
  return 'score-ok';
}
 
function showResult(r) {
  showScreen('screen-result');
  const score = r.score ?? 50;
  document.getElementById('result-content').innerHTML = `
    <div class="verdict-row">
      <div class="score-ring ${scoreClass(score)}">
        ${score}
        <span class="score-label">/ 100</span>
      </div>
      <div style="flex:1;">
        <div class="verdict-headline">${r.verdict ?? 'Needs work'}</div>
        <div class="verdict-sub">${r.sub ?? ''}</div>
      </div>
    </div>
 
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-val">${r.impact_score ?? '?'}<span style="font-size:13px;color:#888">/10</span></div>
        <div class="metric-lbl">impact</div>
      </div>
      <div class="metric-card">
        <div class="metric-val">${r.clarity_score ?? '?'}<span style="font-size:13px;color:#888">/10</span></div>
        <div class="metric-lbl">clarity</div>
      </div>
      <div class="metric-card">
        <div class="metric-val">${r.cringe_score ?? '?'}<span style="font-size:13px;color:#888">/10</span></div>
        <div class="metric-lbl">cringe</div>
      </div>
    </div>
 
    <div class="section-card">
      <div class="section-title">🔥 the roast</div>
      <div class="roast-text">${r.roast ?? ''}</div>
    </div>
 
    <div class="section-card">
      <div class="section-title">⚠️ red flags</div>
      <div>${(r.red_flags ?? []).map(f => `<span class="tag tag-bad">${f}</span>`).join('')}</div>
    </div>
 
    <div class="section-card">
      <div class="section-title">✅ what's actually good</div>
      <div>${(r.good_parts ?? []).map(g => `<span class="tag tag-good">${g}</span>`).join('')}</div>
    </div>
 
    <div class="section-card">
      <div class="section-title">💡 top fixes</div>
      <ol style="padding-left:1.25rem; margin:0;">
        ${(r.top_fixes ?? []).map(f => `<li style="font-size:14px;margin-bottom:6px;line-height:1.6;">${f}</li>`).join('')}
      </ol>
    </div>`;
}
 
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
 
function restart() {
  document.getElementById('resume-input').value = '';
  document.getElementById('input-err').textContent = '';
  showScreen('screen-input');
}
 