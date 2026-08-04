/**
 * character.js
 * 「もちキャラ」の見た目をレベルに応じて生成・更新するモジュール。
 * 線画ベースのシンプルなSVGをJSで組み立てる。
 * 別人に進化するのではなく、同じ土台のキャラクターにパーツが
 * 少しずつ追加されていく設計。
 */

const Character = (() => {
  // レベルごとの解放パーツ定義（しきい値レベルに達すると表示される）
  const MILESTONES = [
    { level: 1, part: "base", label: "白いもち" },
    { level: 5, part: "ears", label: "耳" },
    { level: 10, part: "tail", label: "しっぽ" },
    { level: 20, part: "cheeks", label: "ほっぺ" },
    { level: 30, part: "book", label: "本" },
    { level: 40, part: "pencil", label: "鉛筆" },
    { level: 50, part: "globe", label: "地球儀" },
    { level: 60, part: "backpack", label: "リュック" },
    { level: 70, part: "cape", label: "マント" },
    { level: 80, part: "crown", label: "王冠" },
    { level: 90, part: "wings", label: "羽" },
    { level: 100, part: "aura", label: "オーラ" },
  ];

  function unlockedParts(level) {
    return MILESTONES.filter((m) => level >= m.level).map((m) => m.part);
  }

  function nextMilestone(level) {
    return MILESTONES.find((m) => level < m.level) || null;
  }

  /** レベルに応じたキャラクターの拡大率（少しずつ大きくなる） */
  function scaleForLevel(level) {
    const t = Math.min(level, 100) / 100;
    return 1 + t * 0.35; // 1.0 〜 1.35倍
  }

  /**
   * SVGマークアップを生成する。
   * パーツはCSSクラス .part-XXX の表示/非表示で制御する。
   */
  function buildSVG() {
    return `
      <svg viewBox="0 0 200 200" class="mochi-svg" aria-hidden="true">
        <g class="part-aura part-optional">
          <circle cx="100" cy="105" r="88" class="aura-ring aura-ring-1" />
          <circle cx="100" cy="105" r="78" class="aura-ring aura-ring-2" />
        </g>

        <!-- 羽 -->
        <g class="part-wings part-optional">
          <path d="M45 100 Q10 80 15 130 Q35 125 45 115 Z" class="stroke-line wing" />
          <path d="M155 100 Q190 80 185 130 Q165 125 155 115 Z" class="stroke-line wing" />
        </g>

        <!-- しっぽ -->
        <g class="part-tail part-optional">
          <path d="M150 150 Q178 150 172 128 Q166 142 150 140 Z" class="stroke-line" />
        </g>

        <!-- マント -->
        <g class="part-cape part-optional">
          <path d="M62 95 Q100 130 138 95 L150 165 Q100 185 50 165 Z" class="cape-fill stroke-line" />
        </g>

        <!-- 本体（もち） -->
        <ellipse cx="100" cy="115" rx="62" ry="58" class="mochi-body stroke-line" />

        <!-- 耳 -->
        <g class="part-ears part-optional">
          <ellipse cx="70" cy="58" rx="14" ry="20" class="stroke-line ear" transform="rotate(-15 70 58)" />
          <ellipse cx="130" cy="58" rx="14" ry="20" class="stroke-line ear" transform="rotate(15 130 58)" />
        </g>

        <!-- 顔 -->
        <g class="face">
          <circle cx="80" cy="112" r="4.5" class="eye" />
          <circle cx="120" cy="112" r="4.5" class="eye" />
          <path d="M88 128 Q100 136 112 128" class="mouth" />
          <g class="part-cheeks part-optional">
            <ellipse cx="66" cy="122" rx="7" ry="4.5" class="cheek" />
            <ellipse cx="134" cy="122" rx="7" ry="4.5" class="cheek" />
          </g>
        </g>

        <!-- 王冠 -->
        <g class="part-crown part-optional">
          <path d="M74 62 L82 42 L94 58 L100 40 L106 58 L118 42 L126 62 Z" class="crown-fill stroke-line" />
        </g>

        <!-- リュック（背中側、控えめに横から見える形） -->
        <g class="part-backpack part-optional">
          <rect x="140" y="98" width="22" height="30" rx="6" class="backpack-fill stroke-line" />
        </g>

        <!-- 本（左下でかかえる） -->
        <g class="part-book part-optional">
          <g transform="translate(38 152) rotate(-10)">
            <rect x="0" y="0" width="26" height="19" rx="2" class="item-fill stroke-line" />
            <line x1="13" y1="2" x2="13" y2="17" class="stroke-line thin" />
          </g>
        </g>

        <!-- 鉛筆（右下でにぎる） -->
        <g class="part-pencil part-optional">
          <g transform="translate(152 150) rotate(28)">
            <rect x="0" y="0" width="7" height="28" rx="2" class="item-fill stroke-line" />
            <path d="M0 28 L3.5 36 L7 28 Z" class="item-fill stroke-line" />
          </g>
        </g>

        <!-- 地球儀（足もとに置く） -->
        <g class="part-globe part-optional">
          <g transform="translate(100 183)">
            <circle cx="0" cy="0" r="11" class="item-fill stroke-line" />
            <ellipse cx="0" cy="0" rx="11" ry="4.5" class="stroke-line thin no-fill" />
            <line x1="-11" y1="0" x2="11" y2="0" class="stroke-line thin" />
          </g>
        </g>
      </svg>
    `;
  }

  /** キャラクター要素にレベルに応じたクラス・スケールを適用する */
  function render(containerEl, level) {
    if (!containerEl.querySelector(".mochi-svg")) {
      containerEl.innerHTML = buildSVG();
    }
    const unlocked = new Set(unlockedParts(level));
    containerEl.querySelectorAll(".part-optional").forEach((el) => {
      const partClass = Array.from(el.classList).find(
        (c) => c.startsWith("part-") && c !== "part-optional"
      );
      const partName = partClass ? partClass.replace("part-", "") : null;
      el.classList.toggle("is-visible", unlocked.has(partName));
    });
    const scale = scaleForLevel(level);
    containerEl.style.setProperty("--mochi-scale", scale.toFixed(3));
  }

  /** 正解時のジャンプ＋ぷるぷる演出をトリガーする */
  function playCorrectAnimation(containerEl) {
    const svg = containerEl.querySelector(".mochi-svg");
    if (!svg) return;
    svg.classList.remove("anim-correct");
    // reflowで再トリガー
    void svg.offsetWidth;
    svg.classList.add("anim-correct");
  }

  function playIncorrectAnimation(containerEl) {
    const svg = containerEl.querySelector(".mochi-svg");
    if (!svg) return;
    svg.classList.remove("anim-incorrect");
    void svg.offsetWidth;
    svg.classList.add("anim-incorrect");
  }

  return {
    MILESTONES,
    unlockedParts,
    nextMilestone,
    render,
    playCorrectAnimation,
    playIncorrectAnimation,
  };
})();
