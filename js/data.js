/**
 * data.js
 * 問題データ定義とデフォルト問題（日本史 一問一答 約100問）
 *
 * 問題オブジェクトの形式:
 * {
 *   id: 一意のID,
 *   question: "問題文",
 *   answers: ["正解1", "正解2", ...],  // 複数回答対応
 *   category: "歴史" など,
 *   difficulty: 1〜3
 * }
 *
 * 新しい問題を追加したい場合はこの配列に要素を追加するだけでよい。
 * カテゴリを増やす場合は category に新しい文字列を指定すればアプリ側の
 * フィルタ機能（今後の拡張）でそのまま利用できる。
 */

const DEFAULT_QUESTIONS = [
  // ===== 旧石器・縄文時代 =====
  { id: 1, question: "土器を使わず、打製石器を主に使用していた時代を何という？", answers: ["旧石器時代", "旧石器"], category: "歴史", difficulty: 1 },
  { id: 2, question: "縄目の文様がついた土器が使われた時代を何という？", answers: ["縄文時代", "縄文"], category: "歴史", difficulty: 1 },
  { id: 3, question: "縄文時代の人々が食べた貝がらなどを捨てた場所を何という？", answers: ["貝塚"], category: "歴史", difficulty: 1 },
  { id: 4, question: "縄文時代に作られた、魔よけや豊かな収穫を祈るための土製の人形を何という？", answers: ["土偶"], category: "歴史", difficulty: 1 },
  { id: 5, question: "青森県にある、縄文時代を代表する大規模な集落跡を何という？", answers: ["三内丸山遺跡", "三内丸山"], category: "歴史", difficulty: 2 },

  // ===== 弥生時代 =====
  { id: 6, question: "稲作が広まり、金属器が使われ始めた時代を何という？", answers: ["弥生時代", "弥生"], category: "歴史", difficulty: 1 },
  { id: 7, question: "弥生時代に稲などを蓄えるために作られた建物を何という？", answers: ["高床倉庫", "高床式倉庫"], category: "歴史", difficulty: 1 },
  { id: 8, question: "弥生時代の代表的な青銅器で、祭りの道具とされるものは？", answers: ["銅鐸"], category: "歴史", difficulty: 2 },
  { id: 9, question: "邪馬台国の女王として中国の歴史書『魏志倭人伝』に記された人物は誰？", answers: ["卑弥呼"], category: "歴史", difficulty: 1 },
  { id: 10, question: "佐賀県にある弥生時代を代表する環濠集落の遺跡を何という？", answers: ["吉野ヶ里遺跡", "吉野ヶ里"], category: "歴史", difficulty: 2 },

  // ===== 古墳・飛鳥時代 =====
  { id: 11, question: "3世紀後半から作られた、王や豪族の墓を何という？", answers: ["古墳"], category: "歴史", difficulty: 1 },
  { id: 12, question: "日本最大の前方後円墳で、大阪府にあるものを何という？", answers: ["大仙古墳", "仁徳天皇陵", "大仙陵古墳"], category: "歴史", difficulty: 2 },
  { id: 13, question: "593年に摂政となり、冠位十二階や十七条の憲法を定めた人物は誰？", answers: ["聖徳太子", "厩戸皇子", "厩戸王"], category: "歴史", difficulty: 1 },
  { id: 14, question: "聖徳太子が家柄によらず能力で役人を登用するために定めた制度を何という？", answers: ["冠位十二階"], category: "歴史", difficulty: 1 },
  { id: 15, question: "聖徳太子が役人の心構えを示すために定めたきまりを何という？", answers: ["十七条の憲法"], category: "歴史", difficulty: 1 },
  { id: 16, question: "607年に聖徳太子が小野妹子を隋に派遣したことを何という？", answers: ["遣隋使"], category: "歴史", difficulty: 1 },
  { id: 17, question: "645年、中大兄皇子と中臣鎌足が蘇我氏を倒した政変を何という？", answers: ["乙巳の変"], category: "歴史", difficulty: 2 },
  { id: 18, question: "645年に始まった、天皇中心の中央集権国家を目指す一連の政治改革を何という？", answers: ["大化の改新"], category: "歴史", difficulty: 1 },
  { id: 19, question: "701年に制定された、律令国家の基本法典を何という？", answers: ["大宝律令"], category: "歴史", difficulty: 2 },

  // ===== 奈良時代 =====
  { id: 20, question: "710年に都が置かれた、現在の奈良県にある都を何という？", answers: ["平城京"], category: "歴史", difficulty: 1 },
  { id: 21, question: "743年に定められた、新しく開墾した土地の永久私有を認める法を何という？", answers: ["墾田永年私財法"], category: "歴史", difficulty: 2 },
  { id: 22, question: "奈良時代に聖武天皇が国ごとに建てさせた寺を何という？", answers: ["国分寺"], category: "歴史", difficulty: 2 },
  { id: 23, question: "聖武天皇が国家を守るために東大寺に建てさせた大仏を何という？", answers: ["東大寺の大仏", "奈良の大仏"], category: "歴史", difficulty: 1 },
  { id: 24, question: "現存する日本最古の歌集を何という？", answers: ["万葉集"], category: "歴史", difficulty: 1 },
  { id: 25, question: "712年に完成した、日本最古の歴史書を何という？", answers: ["古事記"], category: "歴史", difficulty: 2 },

  // ===== 平安時代 =====
  { id: 26, question: "794年に桓武天皇が都を移した、現在の京都にある都を何という？", answers: ["平安京"], category: "歴史", difficulty: 1 },
  { id: 27, question: "唐から日本へ天台宗を伝えた僧は誰？", answers: ["最澄"], category: "歴史", difficulty: 2 },
  { id: 28, question: "唐から日本へ真言宗を伝えた僧は誰？", answers: ["空海"], category: "歴史", difficulty: 2 },
  { id: 29, question: "藤原氏が娘を天皇のきさきにし、権力をにぎった政治の形を何という？", answers: ["摂関政治"], category: "歴史", difficulty: 2 },
  { id: 30, question: "『源氏物語』を書いた平安時代の女性作家は誰？", answers: ["紫式部"], category: "歴史", difficulty: 1 },
  { id: 31, question: "『枕草子』を書いた平安時代の女性作家は誰？", answers: ["清少納言"], category: "歴史", difficulty: 1 },
  { id: 32, question: "漢字をくずして作られた、日本独自の文字を何という？", answers: ["かな文字", "仮名文字", "かな"], category: "歴史", difficulty: 2 },
  { id: 33, question: "1016年に摂政となり、藤原氏の全盛期を築いた人物は誰？", answers: ["藤原道長"], category: "歴史", difficulty: 2 },
  { id: 34, question: "平治の乱に勝利し、武士として初めて太政大臣となった人物は誰？", answers: ["平清盛"], category: "歴史", difficulty: 1 },
  { id: 35, question: "1185年、源義経が平氏を滅ぼした戦いを何という？", answers: ["壇ノ浦の戦い"], category: "歴史", difficulty: 2 },

  // ===== 鎌倉時代 =====
  { id: 36, question: "1192年（諸説あり）に征夷大将軍に任じられ、鎌倉幕府を開いた人物は誰？", answers: ["源頼朝"], category: "歴史", difficulty: 1 },
  { id: 37, question: "将軍の家来である武士を何という？", answers: ["御家人"], category: "歴史", difficulty: 2 },
  { id: 38, question: "将軍が御家人の以前からの領地を保護したり、新しい領地を与えたりすることを何という？", answers: ["御恩"], category: "歴史", difficulty: 2 },
  { id: 39, question: "御家人が将軍のために戦いに参加する義務を何という？", answers: ["奉公"], category: "歴史", difficulty: 2 },
  { id: 40, question: "源頼朝の妻で、頼朝の死後に幕府の実権をにぎった人物は誰？", answers: ["北条政子"], category: "歴史", difficulty: 2 },
  { id: 41, question: "将軍を補佐する鎌倉幕府の役職を何という？", answers: ["執権"], category: "歴史", difficulty: 2 },
  { id: 42, question: "1221年、後鳥羽上皇が幕府打倒を目指して起こした戦いを何という？", answers: ["承久の乱"], category: "歴史", difficulty: 2 },
  { id: 43, question: "1274年と1281年の2度にわたる、元（モンゴル）の日本襲来を何という？", answers: ["元寇"], category: "歴史", difficulty: 1 },
  { id: 44, question: "1274年の元寇（1回目の襲来）を何という？", answers: ["文永の役"], category: "歴史", difficulty: 3 },
  { id: 45, question: "1281年の元寇（2回目の襲来）を何という？", answers: ["弘安の役"], category: "歴史", difficulty: 3 },
  { id: 46, question: "浄土宗を開いた鎌倉時代の僧は誰？", answers: ["法然"], category: "歴史", difficulty: 2 },
  { id: 47, question: "浄土真宗を開いた鎌倉時代の僧は誰？", answers: ["親鸞"], category: "歴史", difficulty: 2 },
  { id: 48, question: "日蓮宗（法華宗）を開いた鎌倉時代の僧は誰？", answers: ["日蓮"], category: "歴史", difficulty: 2 },
  { id: 49, question: "座禅によってさとりを開く禅宗のうち、臨済宗を伝えた僧は誰？", answers: ["栄西"], category: "歴史", difficulty: 3 },
  { id: 50, question: "1333年に鎌倉幕府を滅ぼした天皇は誰？", answers: ["後醍醐天皇"], category: "歴史", difficulty: 2 },

  // ===== 室町時代 =====
  { id: 51, question: "1338年に征夷大将軍となり、室町幕府を開いた人物は誰？", answers: ["足利尊氏"], category: "歴史", difficulty: 1 },
  { id: 52, question: "室町幕府の3代将軍で、京都に金閣を建てた人物は誰？", answers: ["足利義満"], category: "歴史", difficulty: 1 },
  { id: 53, question: "室町幕府の8代将軍で、京都に銀閣を建てた人物は誰？", answers: ["足利義政"], category: "歴史", difficulty: 1 },
  { id: 54, question: "1467年、将軍のあとつぎ争いなどが原因で始まった、京都を中心とした戦乱を何という？", answers: ["応仁の乱"], category: "歴史", difficulty: 1 },
  { id: 55, question: "応仁の乱以降、実力のある者が上の身分の者に打ち勝つ風潮を何という？", answers: ["下剋上"], category: "歴史", difficulty: 2 },
  { id: 56, question: "室町時代に日明貿易で用いられた、正式な貿易船であることを示す証明書を何という？", answers: ["勘合"], category: "歴史", difficulty: 2 },
  { id: 57, question: "室町時代に大成された、猿楽や田楽をもとにした舞台芸能を何という？", answers: ["能"], category: "歴史", difficulty: 2 },
  { id: 58, question: "足利義満の保護を受け、父の観阿弥とともに能を大成した人物は誰？", answers: ["世阿弥"], category: "歴史", difficulty: 2 },

  // ===== 戦国・安土桃山時代 =====
  { id: 59, question: "1543年に鉄砲が伝えられた鹿児島県の島を何という？", answers: ["種子島"], category: "歴史", difficulty: 2 },
  { id: 60, question: "1549年にキリスト教を日本に伝えた宣教師は誰？", answers: ["フランシスコ・ザビエル", "ザビエル"], category: "歴史", difficulty: 1 },
  { id: 61, question: "1560年の桶狭間の戦いで今川義元を破った戦国大名は誰？", answers: ["織田信長"], category: "歴史", difficulty: 1 },
  { id: 62, question: "1575年、織田信長・徳川家康の連合軍が武田軍を鉄砲で破った戦いを何という？", answers: ["長篠の戦い"], category: "歴史", difficulty: 2 },
  { id: 63, question: "1582年に本能寺の変で織田信長を討った家臣は誰？", answers: ["明智光秀"], category: "歴史", difficulty: 1 },
  { id: 64, question: "本能寺の変の後、信長の後継者として天下統一を果たした人物は誰？", answers: ["豊臣秀吉"], category: "歴史", difficulty: 1 },
  { id: 65, question: "豊臣秀吉が行った、田畑の面積や収穫量を調べた政策を何という？", answers: ["太閤検地"], category: "歴史", difficulty: 1 },
  { id: 66, question: "豊臣秀吉が行った、百姓から武器を取り上げた政策を何という？", answers: ["刀狩"], category: "歴史", difficulty: 1 },
  { id: 67, question: "1600年、徳川家康が石田三成らを破り天下の実権をにぎった戦いを何という？", answers: ["関ヶ原の戦い"], category: "歴史", difficulty: 1 },

  // ===== 江戸時代 =====
  { id: 68, question: "1603年に征夷大将軍となり、江戸幕府を開いた人物は誰？", answers: ["徳川家康"], category: "歴史", difficulty: 1 },
  { id: 69, question: "江戸幕府が大名を統制するために定めた法律を何という？", answers: ["武家諸法度"], category: "歴史", difficulty: 1 },
  { id: 70, question: "3代将軍徳川家光が武家諸法度に追加した、大名を1年おきに江戸と領地に住まわせる制度を何という？", answers: ["参勤交代"], category: "歴史", difficulty: 1 },
  { id: 71, question: "江戸幕府が実施した、キリスト教禁止と貿易統制を目的とした対外政策を何という？", answers: ["鎖国"], category: "歴史", difficulty: 1 },
  { id: 72, question: "鎖国の中で、江戸時代を通じて西洋との貿易が許された長崎の人工島を何という？", answers: ["出島"], category: "歴史", difficulty: 2 },
  { id: 73, question: "1637年、キリシタンや百姓が重税などに反対して起こした一揆を何という？", answers: ["島原の乱", "島原・天草一揆"], category: "歴史", difficulty: 2 },
  { id: 74, question: "5代将軍徳川綱吉が出した、生き物の殺生を禁じる法令を何という？", answers: ["生類憐みの令"], category: "歴史", difficulty: 2 },
  { id: 75, question: "江戸時代に発達した、五街道のうち江戸と京都を結ぶ道を何という？", answers: ["東海道"], category: "歴史", difficulty: 2 },
  { id: 76, question: "『東海道中膝栗毛』を書いた江戸時代後期の作家は誰？", answers: ["十返舎一九"], category: "歴史", difficulty: 3 },
  { id: 77, question: "浮世絵『富嶽三十六景』を描いた江戸時代の画家は誰？", answers: ["葛飾北斎"], category: "歴史", difficulty: 1 },
  { id: 78, question: "浮世絵『東海道五十三次』を描いた江戸時代の画家は誰？", answers: ["歌川広重", "安藤広重"], category: "歴史", difficulty: 2 },
  { id: 79, question: "杉田玄白らが翻訳した、日本初の西洋医学の解剖書を何という？", answers: ["解体新書"], category: "歴史", difficulty: 2 },
  { id: 80, question: "江戸時代に蘭学を学び、正確な日本地図を作成した人物は誰？", answers: ["伊能忠敬"], category: "歴史", difficulty: 2 },
  { id: 81, question: "1837年、幕府の元役人が大阪で貧しい人々を救おうと起こした反乱を何という？", answers: ["大塩平八郎の乱"], category: "歴史", difficulty: 3 },
  { id: 82, question: "1853年、浦賀に来航し日本に開国を求めたアメリカの人物は誰？", answers: ["ペリー"], category: "歴史", difficulty: 1 },
  { id: 83, question: "1854年にアメリカと結び、日本が開国するきっかけとなった条約を何という？", answers: ["日米和親条約"], category: "歴史", difficulty: 2 },
  { id: 84, question: "1858年に結ばれた、日本に不利な内容を含むアメリカとの通商条約を何という？", answers: ["日米修好通商条約"], category: "歴史", difficulty: 2 },
  { id: 85, question: "江戸幕府の大老で、日米修好通商条約を結び、反対派を弾圧した人物は誰？", answers: ["井伊直弼"], category: "歴史", difficulty: 3 },
  { id: 86, question: "1867年、15代将軍徳川慶喜が政権を朝廷に返したできごとを何という？", answers: ["大政奉還"], category: "歴史", difficulty: 1 },

  // ===== 明治時代 =====
  { id: 87, question: "明治新政府が示した、政治の基本方針を何という？", answers: ["五箇条の御誓文"], category: "歴史", difficulty: 2 },
  { id: 88, question: "1871年、藩を廃止して府と県を置いた改革を何という？", answers: ["廃藩置県"], category: "歴史", difficulty: 1 },
  { id: 89, question: "明治政府が土地の所有者に地価の3％を現金で納めさせた税制改革を何という？", answers: ["地租改正"], category: "歴史", difficulty: 2 },
  { id: 90, question: "1877年、西郷隆盛を中心に鹿児島の士族が起こした反乱を何という？", answers: ["西南戦争"], category: "歴史", difficulty: 2 },
  { id: 91, question: "自由民権運動を進め、自由党を結成した人物は誰？", answers: ["板垣退助"], category: "歴史", difficulty: 2 },
  { id: 92, question: "1885年に初代内閣総理大臣となった人物は誰？", answers: ["伊藤博文"], category: "歴史", difficulty: 1 },
  { id: 93, question: "1889年に発布された、天皇が国の元首と定められた憲法を何という？", answers: ["大日本帝国憲法"], category: "歴史", difficulty: 1 },
  { id: 94, question: "1894年から1895年にかけて日本と清の間で行われた戦争を何という？", answers: ["日清戦争"], category: "歴史", difficulty: 1 },
  { id: 95, question: "1904年から1905年にかけて日本とロシアの間で行われた戦争を何という？", answers: ["日露戦争"], category: "歴史", difficulty: 1 },
  { id: 96, question: "1911年に関税自主権の回復に成功した外務大臣は誰？", answers: ["小村寿太郎"], category: "歴史", difficulty: 3 },

  // ===== 大正・昭和時代 =====
  { id: 97, question: "1914年から1918年にかけて世界規模で行われた戦争を何という？", answers: ["第一次世界大戦"], category: "歴史", difficulty: 1 },
  { id: 98, question: "1923年に関東地方を襲った大地震を何という？", answers: ["関東大震災"], category: "歴史", difficulty: 1 },
  { id: 99, question: "1925年に満25歳以上のすべての男子に選挙権を与えた法律を何という？", answers: ["普通選挙法"], category: "歴史", difficulty: 2 },
  { id: 100, question: "1941年、日本軍がハワイの真珠湾を攻撃したことをきっかけに始まった戦争を何という？", answers: ["太平洋戦争"], category: "歴史", difficulty: 1 },
  { id: 101, question: "1945年8月、広島と長崎に投下された兵器を何という？", answers: ["原子爆弾", "原爆"], category: "歴史", difficulty: 1 },
  { id: 102, question: "1945年8月15日、天皇がラジオで国民に知らせた、日本の戦争終結を何という？", answers: ["終戦", "ポツダム宣言受諾"], category: "歴史", difficulty: 2 },
  { id: 103, question: "1946年に公布された、国民主権・基本的人権の尊重・平和主義を三大原則とする憲法を何という？", answers: ["日本国憲法"], category: "歴史", difficulty: 1 },
  { id: 104, question: "1951年に日本が独立を回復した講和条約を何という？", answers: ["サンフランシスコ平和条約"], category: "歴史", difficulty: 2 },
  { id: 105, question: "1964年に開催された、アジア初の夏季オリンピックの開催都市は？", answers: ["東京"], category: "歴史", difficulty: 1 },
];

