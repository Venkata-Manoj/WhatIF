# What IF — Component Preflight Tool

A lightweight full-stack tool to proactively detect and prevent common component-based bugs and UX errors before deployment.

## Tech
- Backend: Python + Flask
- Frontend: HTML + Tailwind CSS (via CDN)

## Run locally
1. Install Python 3.13+.
2. Install dependencies (PEP 668 environments may require the break flag):

```bash
pip3 install --break-system-packages -r requirements.txt
```

3. Start the server:

```bash
python3 app.py
```

4. Open the app:
- Navigate to http://127.0.0.1:5000 in your browser.

## API
POST /analyze

Request JSON:
```json
{ "component": "Login Page" }
```

Response JSON:
```json
{
  "component": "Login Page",
  "generatedAt": "...",
  "keyPoints": ["..."],
  "whatIfs": ["..."],
  "suggestions": ["..."],
  "checklist": ["..."]
}
```

## Notes
- Results can be saved locally in the sidebar and exported to PDF.
- The analysis logic is rule-based and fast, simulating prompt chaining without external APIs.
