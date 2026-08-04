/**
 * badges.js
 * バッジの定義と、状態からどのバッジが新たに獲得されたかを判定する。
 */

const Badges = (() => {
  const DEFINITIONS = [
    { id: "first_correct", label: "はじめの一歩", desc: "はじめて正解した", icon: "🌱", check: (s) => s.totalCorrect >= 1 },
    { id: "correct_10", label: "10問クリア", desc: "累計10問正解した", icon: "📗", check: (s) => s.totalCorrect >= 10 },
    { id: "correct_50", label: "50問クリア", desc: "累計50問正解した", icon: "📘", check: (s) => s.totalCorrect >= 50 },
    { id: "correct_100", label: "100問クリア", desc: "累計100問正解した", icon: "📙", check: (s) => s.totalCorrect >= 100 },
    { id: "correct_500", label: "500問クリア", desc: "累計500問正解した", icon: "📚", check: (s) => s.totalCorrect >= 500 },
    { id: "correct_1000", label: "1000問クリア", desc: "累計1000問正解した", icon: "🏆", check: (s) => s.totalCorrect >= 1000 },
    { id: "streak_7", label: "7日連続", desc: "7日連続で学習した", icon: "🔥", check: (s) => s.studyDays.length >= 7 && hasConsecutiveDays(s.studyDays, 7) },
    { id: "streak_30", label: "30日連続", desc: "30日連続で学習した", icon: "🔥", check: (s) => hasConsecutiveDays(s.studyDays, 30) },
    { id: "streak_100", label: "100日連続", desc: "100日連続で学習した", icon: "🔥", check: (s) => hasConsecutiveDays(s.studyDays, 100) },
    { id: "level_50", label: "Lv.50到達", desc: "レベル50に到達した", icon: "⭐", check: (s) => s.level >= 50 },
    { id: "level_100", label: "Lv.100到達", desc: "レベル100に到達した", icon: "👑", check: (s) => s.level >= 100 },
  ];

  /** 学習日配列(YYYY-MM-DD)の中に、直近からn日分の連続記録があるか判定 */
  function hasConsecutiveDays(studyDays, n) {
    if (studyDays.length < n) return false;
    const sorted = Array.from(new Set(studyDays)).sort();
    let maxRun = 1;
    let run = 1;
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1]);
      const curr = new Date(sorted[i]);
      const diffDays = Math.round((curr - prev) / 86400000);
      if (diffDays === 1) {
        run += 1;
        maxRun = Math.max(maxRun, run);
      } else {
        run = 1;
      }
    }
    return maxRun >= n;
  }

  /** 現在の状態から、まだ unlockedBadges に入っていない新規獲得バッジを返す */
  function checkNewBadges(state) {
    const unlockedSet = new Set(state.unlockedBadges);
    return DEFINITIONS.filter((b) => !unlockedSet.has(b.id) && b.check(state));
  }

  function getAllWithStatus(state) {
    const unlockedSet = new Set(state.unlockedBadges);
    return DEFINITIONS.map((b) => ({ ...b, unlocked: unlockedSet.has(b.id) }));
  }

  return { DEFINITIONS, checkNewBadges, getAllWithStatus, hasConsecutiveDays };
})();
