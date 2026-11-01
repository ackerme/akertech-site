# akertech.co.il

- `site/`: קבצי האתר (HTML, CSS, JS, תמונות). כאן עורכים.
- `index.mjs`: קוד ה-Lambda שמגיש את האתר ומקבל פניות מהטופס.
- `.github/workflows/deploy.yml`: פריסה אוטומטית. כל שינוי ב-main עולה ל-Lambda `akertech-site` (eu-central-1).
- `iam/`: מדיניות ההרשאות של הפריסה.

הוראות עריכה של תוכן האתר: `site-README.md`.
