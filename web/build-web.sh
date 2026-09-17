#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$ROOT/web/public"
cp "$ROOT/app/src/main/assets/SkillSaga-working-baseline-index.html" "$ROOT/web/public/index.html"
python3 - "$ROOT/web/public/index.html" <<'PY'
from pathlib import Path
p=Path(__import__('sys').argv[1])
s=p.read_text(encoding='utf-8')
tag='<script src="teacher-data-sync.js"></script>'
if tag not in s:
    s=s.replace('</head>', tag+'\n</head>', 1)
p.write_text(s, encoding='utf-8')
PY
cp "$ROOT/web/teacher-data-sync.js" "$ROOT/web/public/teacher-data-sync.js"
if [ -f "$ROOT/app/src/main/assets/logo.png" ]; then cp "$ROOT/app/src/main/assets/logo.png" "$ROOT/web/public/logo.png"; fi
echo "Web build ready: web/public"
