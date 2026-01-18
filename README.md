# Grade Calculator (Vite + React + Tailwind)

Simple responsive grade calculator that computes final score from internal and external marks with configurable target calculations.

Features
- Internal: 2 Assignments (each out of 40) and 2 CATs (each out of 60). Internal final = 40% assignments + 60% CATs (result out of 100).
- External: exam marks out of 100.
- Final score = 40% internal + 60% external (out of 100).
- Grade mapping and points:
  - 91–100 → O (10 pts)
  - 81–90  → A+ (9 pts)
  - 71–80  → A  (8 pts)
  - 61–70  → B+ (7 pts)
  - 56–60  → B  (6 pts)
  - 50–55  → C  (5 pts)
  - 0–49   → U  (0 pts)
- Shows internal contribution (40%), external contribution (60%), final score, grade and points.
- Target calculator:
  - Given internal (out of 40 contribution) → required external to reach a desired grade.
  - Given external → required internal (out of 40 contribution) to reach a desired grade.
- Tailwind CSS only, responsive card layout.

Quick start (local)
1. Install
   npm install

2. Run dev server
   npm run dev

3. Open the URL shown by Vite (usually http://localhost:5173)

Project structure
- src/
  - App.jsx
  - main.jsx
  - index.css
  - assets/ (put logo image here, e.g. src/assets/tceLogo.png)
  - components/
    - Header.jsx
    - InternalMarks.jsx
    - ExternalMarks.jsx
    - Result.jsx
    - TargetCalculator.jsx

Docker (pull prebuilt image)
- Pull the image:
  docker pull praveenkumartv111/grade-calculator-app:latest_v2

- Run container (map port as needed; example maps 5173):
  docker run --rm -p 5173:5173 praveenkumartv111/grade-calculator-app:latest_v2

Note: The image may serve the built app on a different port or via a static server. If the container does not expose port 5173, check the image documentation or inspect the Dockerfile used to build the image.

How calculation works (brief)
- Assignment % = (A1 + A2) / 80 * 100
- CAT % = (CAT1 + CAT2) / 120 * 100
- Internal (0–100) = Assignment% * 0.4 + CAT% * 0.6
- Final (0–100) = Internal * 0.4 + External * 0.6
- Grade determined by final thresholds above.

License
- MIT (or update as desired)

