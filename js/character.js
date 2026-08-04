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
          <path d="M32 108 Q -8 88 -3 138 Q22 132 34 122 Z" class="stroke-line wing" />
          <path d="M168 108 Q208 88 203 138 Q178 132 166 122 Z" class="stroke-line wing" />
        </g>

        <!-- しっぽ -->
        <g class="part-tail part-optional">
          <path d="M158 152 Q186 150 180 128 Q173 143 156 142 Z" class="stroke-line" />
        </g>

        <!-- マント -->
        <g class="part-cape part-optional">
          <path d="M55 100 Q100 132 145 100 L158 168 Q100 188 42 168 Z" class="cape-fill stroke-line" />
        </g>

        <!-- 本体（もち・添付スケッチのゆるい輪郭を再現） -->
        <path class="mochi-body stroke-line" d="
          M 62 62
          C 50 50, 34 46, 27 54
          C 22 60, 26 66, 34 64
          C 40 63, 44 66, 40 72
          C 20 82, 12 105, 13 130
          C 14 155, 22 168, 40 174
          C 65 180, 135 180, 160 174
          C 178 168, 186 155, 187 130
          C 188 105, 180 82, 160 72
          C 156 66, 160 63, 166 64
          C 174 66, 178 60, 173 54
          C 166 46, 150 50, 138 62
          C 128 70, 72 70, 62 62
          Z" />

        <!-- お腹の窓もよう（土台の目印として常時表示） -->
        <g class="belly-window">
          <path d="M70 178 L70 144 Q70 112 100 112 Q130 112 130 144 L130 178" class="stroke-line thin no-fill" />
          <rect x="141" y="148" width="7" height="4" rx="2" class="belly-dot" />
          <rect x="141" y="160" width="7" height="4" rx="2" class="belly-dot" />
        </g>

        <!-- 耳とひげ（Lv5でぐっと立ち上がる） -->
        <g class="part-ears part-optional">
          <path d="M33 52 Q18 20 42 12 Q58 8 52 40" class="stroke-line thin no-fill" />
          <path d="M167 52 Q182 20 158 12 Q142 8 148 40" class="stroke-line thin no-fill" />
          <path d="M18 100 L-4 96" class="stroke-line thin" />
          <path d="M20 110 L-2 110" class="stroke-line thin" />
          <path d="M182 100 L204 96" class="stroke-line thin" />
          <path d="M180 110 L202 110" class="stroke-line thin" />
        </g>

        <!-- 顔 -->
        <g class="face">
          <path d="M78 88 Q100 82 122 88" class="stroke-line thin eyebrow" />
          <rect x="82" y="100" width="4" height="10" rx="2" class="eye" />
          <rect x="114" y="100" width="4" height="10" rx="2" class="eye" />
          <path d="M88 122 L100 132 L106 124 L112 132" class="mouth" />
          <g class="part-cheeks part-optional">
            <ellipse cx="68" cy="116" rx="7" ry="4.5" class="cheek" />
            <ellipse cx="132" cy="116" rx="7" ry="4.5" class="cheek" />
          </g>
        </g>

        <!-- 王冠 -->
        <g class="part-crown part-optional">
          <path d="M76 46 L83 28 L94 42 L100 24 L106 42 L117 28 L124 46 Z" class="crown-fill stroke-line" />
        </g>

        <!-- リュック（背中側、控えめに横から見える形） -->
        <g class="part-backpack part-optional">
          <rect x="155" y="98" width="24" height="32" rx="7" class="backpack-fill stroke-line" />
        </g>

        <!-- 本（左下でかかえる） -->
        <g class="part-book part-optional">
          <g transform="translate(32 154) rotate(-10)">
            <rect x="0" y="0" width="26" height="19" rx="2" class="item-fill stroke-line" />
            <line x1="13" y1="2" x2="13" y2="17" class="stroke-line thin" />
          </g>
        </g>

        <!-- 鉛筆（右下でにぎる） -->
        <g class="part-pencil part-optional">
          <g transform="translate(160 152) rotate(28)">
            <rect x="0" y="0" width="7" height="28" rx="2" class="item-fill stroke-line" />
            <path d="M0 28 L3.5 36 L7 28 Z" class="item-fill stroke-line" />
          </g>
        </g>

        <!-- 地球儀（軌道の輪といっしょに掲げ持つ） -->
        <g class="part-globe part-optional">
          <path d="M178 108 Q192 96 190 82" class="stroke-line thin no-fill" />
          <g transform="translate(190 74)">
            <ellipse cx="0" cy="0" rx="21" ry="9" class="stroke-line thin no-fill" transform="rotate(-18)" />
            <circle cx="0" cy="0" r="13" class="item-fill stroke-line" />
            <path d="M-6 -9 Q0 -4 -3 2 Q-6 6 0 9" class="stroke-line thin no-fill" />
            <path d="M6 -8 Q9 -2 4 4" class="stroke-line thin no-fill" />
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
