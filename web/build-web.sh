#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PUBLIC="$ROOT/web/public"
mkdir -p "$PUBLIC"
cp "$ROOT/app/src/main/assets/index.html" "$PUBLIC/index.html"
cp "$ROOT/app/src/main/assets/final-ui.js" "$PUBLIC/final-ui.js"
cp "$ROOT/app/src/main/assets/final-ui-links.js" "$PUBLIC/final-ui-links.js"
cp "$ROOT/web/teacher-data-sync.js" "$PUBLIC/teacher-data-sync.js"
if [ -f "$ROOT/web/learner-home-fix.js" ]; then cp "$ROOT/web/learner-home-fix.js" "$PUBLIC/learner-home-fix.js"; fi
cp "$ROOT/web/learn-flow.js" "$PUBLIC/learn-flow.js"
if [ -f "$ROOT/app/src/main/assets/logo.png" ]; then cp "$ROOT/app/src/main/assets/logo.png" "$PUBLIC/logo.png"; fi
python3 - "$PUBLIC/index.html" <<'PY'
from pathlib import Path
p=Path(__import__('sys').argv[1]); s=p.read_text(encoding='utf-8')
for tag in ['<script src="final-ui.js"></script>','<script src="final-ui-links.js"></script>','<script src="teacher-data-sync.js"></script>','<script src="learner-home-fix.js"></script>','<script src="learn-flow.js"></script>']:
    if tag not in s: s=s.replace('</head>',tag+'\n</head>',1)
p.write_text(s,encoding='utf-8')
PY
echo "Web build ready: web/public"
