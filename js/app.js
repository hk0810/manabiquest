/**
 * app.js
 * 画面遷移とゲームロジックを統括するメインコントローラー。
 * ホーム／学習／成績／バッジの4画面を切り替えながら
 * state（進行状況）を更新し、Storageへ保存する。
 */

(() => {
  let state = Storage.loadState();
  let questions = Storage.loadQuestions();
  let currentQuestion = null;
  let recentQuestionIds = []; // 直近出題した問題（連続で同じ問題を避ける）
  let sessionStartTime = null;
  let awaitingNext = false; // 不正解後、次へ進むのを待っている状態

  const $ = (sel) => document.querySelector(sel);
  const screens = {
    home: $("#screen-home"),
    quiz: $("#screen-quiz"),
    result: $("#screen-result"),
    badges: $("#screen-badges"),
  };

  function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function currentLevelInfo() {
    return Levels.computeFromTotalExp(state.exp);
  }

  function syncDerivedLevel() {
    state.level = currentLevelInfo().level;
  }

  function save() {
    syncDerivedLevel();
    Storage.saveState(state);
  }

  function showScreen(name) {
    Object.entries(screens).forEach(([key, el]) => {
      el.classList.toggle("is-active", key === name);
    });
  }

  // ===== ホーム画面 =====
  function renderHome() {
    const info = currentLevelInfo();
    $("#home-level").textContent = info.level;
    $("#home-power").textContent = state.power;
    $("#home-exp-bar-fill").style.width = `${Math.round(info.progressRatio * 100)}%`;
    $("#home-exp-label").textContent = info.isMaxLevel
      ? "MAX LEVEL"
      : `${info.expIntoLevel} / ${info.expToNextLevel} EXP`;
    $("#home-streak").textContent = `${currentConsecutiveDays()} 日`;
    $("#home-total-correct").textContent = state.totalCorrect;
    const accuracy = state.totalAnswered > 0
      ? Math.round((state.totalCorrect / state.totalAnswered) * 100)
      : 0;
    $("#home-accuracy").textContent = `${accuracy}%`;
    Character.render($("#home-character"), info.level);

    const next = Character.nextMilestone(info.level);
    $("#home-next-milestone").textContent = next
      ? `つぎの変化まで Lv.${next.level}（あと ${next.level - info.level}）`
      : "すべての変化が解放されました！";
  }

  function currentConsecutiveDays() {
    const sorted = Array.from(new Set(state.studyDays)).sort();
    if (sorted.length === 0) return 0;
    let count = 1;
    for (let i = sorted.length - 1; i > 0; i--) {
      const curr = new Date(sorted[i]);
      const prev = new Date(sorted[i - 1]);
      const diff = Math.round((curr - prev) / 86400000);
      if (diff === 1) count += 1;
      else break;
    }
    // 最後の学習日が今日か昨日でなければ連続記録は途切れている
    const last = sorted[sorted.length - 1];
    const diffFromToday = Math.round((new Date(todayStr()) - new Date(last)) / 86400000);
    return diffFromToday <= 1 ? count : 0;
  }

  // ===== 学習画面 =====
  function pickNextQuestion() {
    const pool = questions.filter((q) => !recentQuestionIds.includes(q.id));
    const source = pool.length > 0 ? pool : questions;
    const q = source[Math.floor(Math.random() * source.length)];
    recentQuestionIds.push(q.id);
    if (recentQuestionIds.length > Math.min(10, questions.length - 1)) recentQuestionIds.shift();
    return q;
  }

  function startQuiz() {
    sessionStartTime = Date.now();
    awaitingNext = false;
    nextQuestion();
    showScreen("quiz");
  }

  function endQuizSession() {
    if (sessionStartTime) {
      state.totalStudySeconds += Math.round((Date.now() - sessionStartTime) / 1000);
      sessionStartTime = null;
      save();
    }
  }

  function nextQuestion() {
    currentQuestion = pickNextQuestion();
    awaitingNext = false;
    $("#quiz-question").textContent = currentQuestion.question;
    $("#quiz-input").value = "";
    $("#quiz-feedback").className = "quiz-feedback";
    $("#quiz-feedback").textContent = "";
    $("#quiz-answer-btn").textContent = "答える";
    $("#quiz-combo").textContent = `コンボ ${state.currentStreak}`;
    Character.render($("#quiz-character"), currentLevelInfo().level);
    $("#quiz-input").focus();
  }

  function handleAnswerSubmit() {
    if (awaitingNext) {
      nextQuestion();
      return;
    }
    const input = $("#quiz-input").value;
    const correct = AnswerChecker.isCorrect(input, currentQuestion.answers);
    state.totalAnswered += 1;

    if (correct) {
      handleCorrect();
    } else {
      handleIncorrect();
    }
    save();
  }

  function handleCorrect() {
    const levelBefore = currentLevelInfo().level;
    state.power += 10;
    state.exp += 20;
    state.totalCorrect += 1;
    state.currentStreak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.currentStreak);
    if (!state.studyDays.includes(todayStr())) state.studyDays.push(todayStr());

    const feedback = $("#quiz-feedback");
    feedback.className = "quiz-feedback is-correct";
    feedback.textContent = "正解！ Power +10 / EXP +20";
    $("#quiz-answer-btn").textContent = "つぎへ";
    $("#quiz-combo").textContent = `コンボ ${state.currentStreak}`;
    awaitingNext = true;

    Character.render($("#quiz-character"), currentLevelInfo().level);
    Character.playCorrectAnimation($("#quiz-character"));
    launchConfetti();
    playCorrectOverlay();

    const levelAfter = currentLevelInfo().level;
    if (levelAfter > levelBefore) {
      showLevelUpToast(levelAfter);
    }
    checkAndShowBadges();
  }

  function handleIncorrect() {
    state.currentStreak = 0;
    const feedback = $("#quiz-feedback");
    feedback.className = "quiz-feedback is-incorrect";
    feedback.textContent = `おしい！正解は「${currentQuestion.answers[0]}」`;
    $("#quiz-answer-btn").textContent = "つぎへ";
    $("#quiz-combo").textContent = `コンボ ${state.currentStreak}`;
    awaitingNext = true;
    Character.playIncorrectAnimation($("#quiz-character"));
  }

  function playCorrectOverlay() {
    const overlay = $("#correct-overlay");
    overlay.classList.remove("is-showing");
    void overlay.offsetWidth;
    overlay.classList.add("is-showing");
    setTimeout(() => overlay.classList.remove("is-showing"), 900);
  }

  function showLevelUpToast(newLevel) {
    const toast = $("#levelup-toast");
    toast.textContent = `🎉 レベルアップ！ Lv.${newLevel}`;
    toast.classList.add("is-showing");
    setTimeout(() => toast.classList.remove("is-showing"), 2200);
  }

  function launchConfetti() {
    const layer = $("#confetti-layer");
    const colors = ["#ff9fb2", "#ffd166", "#8ecae6", "#b8f2c9", "#c6b8f2"];
    for (let i = 0; i < 24; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[i % colors.length];
      piece.style.animationDelay = `${Math.random() * 0.2}s`;
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      layer.appendChild(piece);
      setTimeout(() => piece.remove(), 1200);
    }
  }

  function checkAndShowBadges() {
    const newBadges = Badges.checkNewBadges(state);
    if (newBadges.length === 0) return;
    state.unlockedBadges = state.unlockedBadges.concat(newBadges.map((b) => b.id));
    newBadges.forEach((b, i) => {
      setTimeout(() => showBadgeToast(b), 1200 + i * 1400);
    });
  }

  function showBadgeToast(badge) {
    const toast = $("#badge-toast");
    toast.innerHTML = `<span class="badge-toast-icon">${badge.icon}</span><span>新しいバッジ「${badge.label}」を獲得！</span>`;
    toast.classList.add("is-showing");
    setTimeout(() => toast.classList.remove("is-showing"), 2400);
  }

  // ===== 成績画面 =====
  function renderResult() {
    const info = currentLevelInfo();
    $("#result-level").textContent = info.level;
    $("#result-power").textContent = state.power;
    $("#result-total-correct").textContent = state.totalCorrect;
    $("#result-total-answered").textContent = state.totalAnswered;
    const accuracy = state.totalAnswered > 0
      ? Math.round((state.totalCorrect / state.totalAnswered) * 100)
      : 0;
    $("#result-accuracy").textContent = `${accuracy}%`;
    $("#result-current-streak").textContent = state.currentStreak;
    $("#result-best-streak").textContent = state.bestStreak;
    const hours = Math.floor(state.totalStudySeconds / 3600);
    const minutes = Math.floor((state.totalStudySeconds % 3600) / 60);
    $("#result-study-time").textContent = hours > 0 ? `${hours}時間${minutes}分` : `${minutes}分`;
  }

  // ===== バッジ画面 =====
  function renderBadges() {
    const grid = $("#badges-grid");
    grid.innerHTML = "";
    Badges.getAllWithStatus(state).forEach((b) => {
      const card = document.createElement("div");
      card.className = `badge-card ${b.unlocked ? "is-unlocked" : "is-locked"}`;
      card.innerHTML = `
        <div class="badge-icon">${b.unlocked ? b.icon : "❔"}</div>
        <div class="badge-label">${b.label}</div>
        <div class="badge-desc">${b.desc}</div>
      `;
      grid.appendChild(card);
    });
  }

  // ===== ナビゲーション =====
  function goHome() {
    if (screens.quiz.classList.contains("is-active")) endQuizSession();
    save();
    renderHome();
    showScreen("home");
  }

  function bindEvents() {
    $("#start-quiz-btn").addEventListener("click", startQuiz);
    $("#quiz-home-btn").addEventListener("click", goHome);
    $("#quiz-form").addEventListener("submit", (e) => {
      e.preventDefault();
      handleAnswerSubmit();
    });
    $("#home-result-btn").addEventListener("click", () => {
      renderResult();
      showScreen("result");
    });
    $("#result-home-btn").addEventListener("click", goHome);
    $("#home-badges-btn").addEventListener("click", () => {
      renderBadges();
      showScreen("badges");
    });
    $("#badges-home-btn").addEventListener("click", goHome);
  }

  function init() {
    syncDerivedLevel();
    save();
    bindEvents();
    renderHome();
    showScreen("home");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
