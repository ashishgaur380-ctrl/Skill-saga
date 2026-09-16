# Skill Saga — Play Store Release Gate

## Engineering — completed/ready for final verification

- [x] Android target API 36 configured.
- [x] Version code/name moved to 2 / 1.1.
- [x] Debug APK build validation workflow.
- [x] Release AAB build validation workflow.
- [x] Disposable admin test seed removed from the release build workflow.
- [x] Final learner navigation layer preserved.
- [x] Play mode action layer connected to published quiz content.
- [x] Class progression rules documented and enforced for UI feedback.
- [x] Password reset from Settings fixed to use the authenticated account email.
- [x] Actionable teacher-assignment notification layer added.
- [x] Attempt-detail persistence hardening added.
- [x] Quiz question JSON normalization hardened against stale fields.
- [x] Skill Mastery duplicate-row/detail interaction hardening added.
- [x] Privacy and Help screens added as launch-safe in-app drafts.
- [x] Firestore quiz-attempt read access tightened to learner/linked educator/admin contexts.
- [x] Ads disabled.
- [x] Premium payments disabled.
- [x] Discussion Forum disabled until child-safety/moderation controls are complete.

## Developer manual gate

- [ ] Run the final debug APK on a physical Android phone.
- [ ] Test login/signup/logout and password reset.
- [ ] Test Learn class selection and subject/topic actions.
- [ ] Test all four Play modes with real published quizzes.
- [ ] Test current-class and +/-1, +/-2, +/-3 unlock rules.
- [ ] Test assigned-quiz notification → Start → completion → notification cleared.
- [ ] Test Quiz History → Attempt Details on a newly completed quiz.
- [ ] Test Profile → Privacy and Help.
- [ ] Test teacher/parent linked-student data after a fresh learner attempt.
- [ ] Test admin quiz lifecycle and bulk import.
- [ ] Confirm no test/demo content is exposed to normal learners.
- [ ] Deploy final Firestore rules and verify them with a test learner, teacher and admin.
- [ ] Confirm Firebase Authentication providers intended for launch are enabled.
- [ ] Confirm Firebase billing/quotas and production project settings.

## Legal / Play Console gate

- [ ] Replace placeholders in `PRIVACY_POLICY_DRAFT.md` and publish it on HTTPS.
- [ ] Add the privacy-policy URL inside the app and to Play Console.
- [ ] Prepare Terms of Use and support contact.
- [ ] Complete Target Audience and Content accurately.
- [ ] Complete Data Safety accurately for the production build and enabled SDKs.
- [ ] Complete IARC Content Rating.
- [ ] Declare ads accurately (currently disabled).
- [ ] Provide app access instructions for Google review.
- [ ] Add account-deletion information and external deletion resource where required.
- [ ] Prepare store icon, feature graphic and screenshots.
- [ ] Finalize app title, short description and full description.
- [ ] Set countries/regions and pricing.
- [ ] Upload the release AAB using the developer's upload key/Play App Signing setup.
- [ ] Run internal testing first.
- [ ] Resolve all pre-launch report issues.
- [ ] Promote to closed/open testing as appropriate.
- [ ] Submit production release.

## Current important policy note

Skill Saga may be used by children. Google Play's Families requirements therefore need to be treated as a launch gate, including accurate target-audience/data-safety declarations and child-safe handling of any social features. Keep Discussion Forum disabled until the required moderation, reporting, blocking and adult-control implementation is genuinely complete.
