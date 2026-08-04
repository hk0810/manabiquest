/**
 * answerChecker.js
 * ユーザーの入力と正解候補を「ゆるく」比較する。
 * ・前後および内部の空白を無視
 * ・全角英数字を半角に統一
 * ・句読点や記号（！？。、・「」など）を無視
 * ・ひらがな/カタカナの違いは区別する（歴史用語の同音異義を避けるため）
 */

const AnswerChecker = (() => {
  // 除去する記号類（日本語の一般的な区切り記号を中心に）
  const SYMBOL_REGEX = /[\s　!?！？。、,，．.・「」『』【】\[\]()（）\-ー~〜"'"'"]/g;

  function normalize(text) {
    if (typeof text !== "string") return "";
    let s = text.trim();
    // 全角英数字→半角
    s = s.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
    );
    // 記号・空白の除去
    s = s.replace(SYMBOL_REGEX, "");
    return s.toLowerCase();
  }

  /**
   * @param {string} userInput ユーザーの入力
   * @param {string[]} correctAnswers 正解候補の配列
   * @returns {boolean} 正解かどうか
   */
  function isCorrect(userInput, correctAnswers) {
    const normalizedInput = normalize(userInput);
    if (!normalizedInput) return false;
    return correctAnswers.some((ans) => normalize(ans) === normalizedInput);
  }

  return { isCorrect, normalize };
})();
