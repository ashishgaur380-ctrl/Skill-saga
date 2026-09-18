# Skill Saga — Learner App Foundation v1

Branch: `admin-foundation-v1`

This version implements Part A points 1–4 from the master blueprint.

## Learner app

1. Startup / Splash
- Branded startup/loading state
- Admin-controlled maintenance mode
- Maintenance message
- Minimum app/web version field
- Optional force-update gate

2. Login / Sign Up
- Email login
- Forgot password
- Email signup
- Learner / Parent / Teacher role selection
- Learner board and class capture
- Terms/Privacy acceptance
- Existing mobile OTP path remains available but is disabled by default through the feature/config controls
- Admin controls for app-side availability of login/signup paths

3. First-time Learner Setup
- Board
- Class
- Subjects
- Learning goals
- Learning profile
- Completion flag stored on user profile
- Admin-configurable required/optional steps and allowed boards/classes

4. Home
- Existing approved Home design preserved
- Admin-controlled visibility for stats, Daily Mission, Skills, Next Milestone, Continue Learning and bottom note
- Admin-controlled welcome subtitle and quote
- Home remains connected to existing XP, streak, rank and quiz data

## Admin Console

New tile: **Learner App Foundation**

Controls:
- Startup / Splash
- Authentication
- First-time Setup
- Home Control

Settings are stored in:
- `appSettings/startup`
- `appSettings/authentication`
- `appSettings/learnerSetup`
- `appSettings/home`

## Important

Firebase Authentication provider activation itself is not performed from Firestore. The Admin Console controls the Skill Saga app-side availability; Firebase provider enablement remains a Firebase project setting.

## Testing status

Code is implemented on a dedicated branch and should be tested before merging. Do not merge to main until:
- Admin Foundation opens
- Each four settings screens load
- Each settings document saves
- Learner signup still works
- First-time setup appears for a new learner
- Existing learner with onboarding completed goes directly to Home
- Home visibility settings take effect
- Maintenance mode blocks normal app entry
- Existing Play/Competition/Admin controls remain intact
