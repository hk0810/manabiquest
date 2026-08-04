/**
 * storage.js
 * LocalStorageへの読み書きを一手に引き受けるモジュール。
 * 他のモジュールは直接localStorageを触らず、必ずここを経由する。
 */

const Storage = (() => {
  const KEYS = {
    STATE: "manabiQuest.state.v1",
    QUESTIONS: "manabiQuest.questions.v1",
  };

  /** アプリの初期状態 */
  function createInitialState() {
    return {
      level: 1,
      power: 0,
      exp: 0,
      totalCorrect: 0,
      totalAnswered: 0,
      currentStreak: 0,    // 現在の連続正解数（コンボ）
      bestStreak: 0,       // 最高コンボ
      studyDays: [],        // 学習した日付（YYYY-MM-DD）の配列
      totalStudySeconds: 0, // 総学習時間（秒）
      unlockedBadges: [],   // 獲得済みバッジID
      lastSessionStart: null,
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(KEYS.STATE);
      if (!raw) return createInitialState();
      const parsed = JSON.parse(raw);
      // 将来のフィールド追加に備え、初期値とマージする
      return Object.assign(createInitialState(), parsed);
    } catch (e) {
      console.warn("状態の読み込みに失敗しました。初期状態を使用します。", e);
      return createInitialState();
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(KEYS.STATE, JSON.stringify(state));
      return true;
    } catch (e) {
      console.warn("状態の保存に失敗しました。", e);
      return false;
    }
  }

  function loadQuestions() {
    try {
      const raw = localStorage.getItem(KEYS.QUESTIONS);
      if (!raw) {
        saveQuestions(DEFAULT_QUESTIONS);
        return DEFAULT_QUESTIONS;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_QUESTIONS;
      return parsed;
    } catch (e) {
      console.warn("問題データの読み込みに失敗しました。デフォルト問題を使用します。", e);
      return DEFAULT_QUESTIONS;
    }
  }

  function saveQuestions(questions) {
    try {
      localStorage.setItem(KEYS.QUESTIONS, JSON.stringify(questions));
      return true;
    } catch (e) {
      console.warn("問題データの保存に失敗しました。", e);
      return false;
    }
  }

  /** 問題データを外部JSONで追加・置き換えするための入口（将来の拡張用） */
  function addQuestions(newQuestions) {
    const current = loadQuestions();
    const maxId = current.reduce((m, q) => Math.max(m, q.id), 0);
    const withIds = newQuestions.map((q, i) => ({ id: q.id || maxId + i + 1, ...q }));
    const merged = current.concat(withIds);
    saveQuestions(merged);
    return merged;
  }

  function resetAll() {
    localStorage.removeItem(KEYS.STATE);
    localStorage.removeItem(KEYS.QUESTIONS);
  }

  return { loadState, saveState, loadQuestions, saveQuestions, addQuestions, resetAll, createInitialState };
})();
