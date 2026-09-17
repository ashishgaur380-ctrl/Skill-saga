#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PUBLIC="$ROOT/web/public"
mkdir -p "$PUBLIC"
cp "$ROOT/app/src/main/assets/index.html" "$PUBLIC/index.html"
cp "$ROOT/app/src/main/assets/final-ui.js" "$PUBLIC/final-ui.js"
cp "$ROOT/app/src/main/assets/final-ui-links.js" "$PUBLIC/final-ui-links.js"
cp "$ROOT/web/teacher-data-sync.js" "$PUBLIC/teacher-data-sync.js"
cp "$ROOT/web/learner-home-fix.js" "$PUBLIC/learner-home-fix.js"
cp "$ROOT/web/learner-home-ui-refresh.js" "$PUBLIC/learner-home-ui-refresh.js"
cp "$ROOT/web/learner-home-force.js" "$PUBLIC/learner-home-force.js"
cp "$ROOT/web/learner-play-flow.js" "$PUBLIC/learner-play-flow.js"
cp "$ROOT/web/learner-compete-flow.js" "$PUBLIC/learner-compete-flow.js"
cp "$ROOT/web/learner-rewards-flow.js" "$PUBLIC/learner-rewards-flow.js"
cp "$ROOT/web/learner-progress-flow.js" "$PUBLIC/learner-progress-flow.js"
cp "$ROOT/web/learner-quiz-history-flow.js" "$PUBLIC/learner-quiz-history-flow.js"
cp "$ROOT/web/learner-notifications-flow.js" "$PUBLIC/learner-notifications-flow.js"
cp "$ROOT/web/learner-profile-flow.js" "$PUBLIC/learner-profile-flow.js"
if [ -f "$ROOT/app/src/main/assets/logo.png" ]; then cp "$ROOT/app/src/main/assets/logo.png" "$PUBLIC/logo.png"; fi
python3 - "$PUBLIC/index.html" <<'PY'
from pathlib import Path
p=Path(__import__('sys').argv[1])
s=p.read_text(encoding='utf-8')
tags=['<script src="final-ui.js"></script>','<script src="final-ui-links.js"></script>','<script src="teacher-data-sync.js"></script>','<script src="learner-home-fix.js"></script>','<script src="learner-home-ui-refresh.js"></script>','<script src="learner-home-force.js"></script>','<script src="learner-play-flow.js"></script>','<script src="learner-compete-flow.js"></script>','<script src="learner-rewards-flow.js"></script>','<script src="learner-progress-flow.js"></script>','<script src="learner-quiz-history-flow.js"></script>','<script src="learner-notifications-flow.js"></script>','<script src="learner-profile-flow.js"></script>']
for tag in tags:
    if tag not in s:
        s=s.replace('</head>',tag+'\n</head>',1)
p.write_text(s,encoding='utf-8')
PY
echo "Web build ready: web/public"
