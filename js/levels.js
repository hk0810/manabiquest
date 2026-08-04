/**
 * levels.js
 * 経験値からレベルを計算するロジック。
 * レベルが上がるごとに必要経験値が少しずつ増えていく。
 */

const Levels = (() => {
  const MAX_LEVEL = 100;

  /** レベルnからn+1に上がるために必要な経験値 */
  function expRequiredFor(level) {
    return 40 + level * 12;
  }

  /** 累計経験値からレベルと現在レベル内の経験値・次のレベルまでの必要量を求める */
  function computeFromTotalExp(totalExp) {
    let level = 1;
    let remaining = totalExp;
    while (level < MAX_LEVEL) {
      const need = expRequiredFor(level);
      if (remaining < need) break;
      remaining -= need;
      level += 1;
    }
    const need = level < MAX_LEVEL ? expRequiredFor(level) : 0;
    return {
      level,
      expIntoLevel: remaining,
      expToNextLevel: need,
      progressRatio: need > 0 ? remaining / need : 1,
      isMaxLevel: level >= MAX_LEVEL,
    };
  }

  return { MAX_LEVEL, expRequiredFor, computeFromTotalExp };
})();
