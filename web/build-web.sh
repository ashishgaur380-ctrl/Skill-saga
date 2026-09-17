#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="$ROOT/app/src/main/assets"
PUBLIC="$ROOT/web/public"
mkdir -p "$PUBLIC"

# Build the hosted web app from the exact asset set packaged in the working APK.
cp "$ASSETS/index.html" "$PUBLIC/index.html"

APK_SCRIPTS=(
  final-ui.js
  final-ui-interactions-v2.js
  admin-test-seed.js
  final-content-actions-v3.js
  play-unlock-v1.js
  final-learn-actions-v1.js
  final-compete-actions-v1.js
  final-account-notifications-v1.js
  final-skills-actions-v1.js
  play-unlock-v2.js
  final-teacher-sync-v1.js
  final-account-actions-v2.js
  final-production-hardening-v1.js
  final-account-fix-v2.js
  final-learn-hierarchy-v1.js
  skills-other-v1.js
  play-modes-v1.js
  class-unlock-v1.js
  skill-mastery-v1.js
  quiz-history-details-v1.js
  assignment-notifications-v1.js
  password-reset-v1.js
  help-support-v1.js
  privacy-v1.js
)

for f in "${APK_SCRIPTS[@]}"; do
  cp "$ASSETS/$f" "$PUBLIC/$f"
done

if [ -f "$ASSETS/logo.png" ]; then
  cp "$ASSETS/logo.png" "$PUBLIC/logo.png"
fi

# Remove files from the newer experimental web UI layers so the hosted app
# cannot accidentally combine them with the APK baseline.
for f in \
  final-ui-links.js teacher-data-sync.js \
  learner-home-fix.js learner-home-ui-refresh.js learner-home-force.js \
  learn-flow.js learner-learn-ui.js learner-learn-force.js \
  learner-play-flow.js learner-compete-flow.js learner-rewards-flow.js \
  learner-progress-flow.js learner-quiz-history-flow.js learner-notifications-flow.js \
  learner-profile-flow.js nav-order-force.js learner-navigation-force.js; do
  rm -f "$PUBLIC/$f"
done

echo "Web build created from working APK asset baseline: $PUBLIC"
echo "Files: $(find "$PUBLIC" -maxdepth 1 -type f | wc -l)"
