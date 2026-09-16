# Skill Saga — Deferred Manual Fixes

These items are intentionally parked so development can continue without risking the finalized `index.html`.

## Current blockers / later fixes

1. **Quiz Access Control integration**
   - Add Admin/Teacher quiz access fields to the existing Create/Edit Quiz form.
   - Enforce Free / XP Unlock / Coin Unlock / Premium / Assigned Only when a learner opens a quiz.
   - XP remains a threshold; coins are spendable.
   - Premium payment remains disabled until launch.

2. **Pending assignment notification**
   - Bell → For You should show an actionable pending teacher-assigned quiz with a Start action.
   - Completed assignments should no longer remain actionable.

3. **Teacher learner-performance synchronization**
   - Teacher Dashboard currently does not correctly reflect learner XP, accuracy, streak and quiz count.
   - Repair the data source/sync without changing the finalized learner UI.

4. **Quiz History Attempt Details**
   - History cards and Attempt Details screen work, but question-by-question responses are not yet persisted/displayed reliably.

5. **Skill Mastery data/navigation**
   - Remove duplicate Reasoning entries.
   - Restore row/detail navigation when a mastery skill is tapped.

6. **Account authentication**
   - Change/Reset Password is deferred.
   - Mobile OTP Login is deferred.

7. **Admin Create/Edit Quiz expansion**
   - Expand fields to the finalized Category → Class/Skill → Subject/Topic → Difficulty → Questions → rewards → Access → Status structure.

8. **Learn implementation**
   - Build the finalized Academic / Skills / Other learning hierarchy and Academic Class 1–12 → Subject → Chapter → Topic → Lesson flow.

9. **Play implementation expansion**
   - Preserve the current quiz engine while completing Academic / Skills / Other navigation, class progression and access rules.

10. **Compete Discussion Forum**
    - Implement the planned moderated forum inside Compete with reporting/moderation safeguards.

11. **Privacy / Help & Support**
    - Replace current placeholders later with real privacy controls and support channels.

12. **Premium and Advertisement systems**
    - Prepare future entitlement and advertisement management, but keep `PREMIUM_PAYMENT_ENABLED=false` and `ADS_ENABLED=false` until launch requirements are finalized.

## Rule
Do not replace the working `index.html` wholesale to solve these items. Address them as targeted/manual patches later so the tested core remains intact.
