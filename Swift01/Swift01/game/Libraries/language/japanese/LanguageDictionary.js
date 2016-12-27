Language.getDictionary = function(key){
	return Language.dictionaryData[key] || key;
};
Language.dictionaryData = {
	"business":"商業はお金の収入に影響する、武将の知力と敏捷は高ければ高いほど、商業の実効率が高くなります。そして、商業を実行したら、武将が運気の経験をもらうことができる。",
	"agriculture":"農業はの収入に影響する、武将の知力と武力は高ければ高いほど、農業の実効率が高くなります。そして、農業を実行したら、武将が敏捷の経験をもらうことができる。",
	"technology":"技術は兵科の練習に影響する、武将の知力と统率は高ければ高いほど、技術の実効率が高くなります。そして、技術を実行したら、武将が知力の経験をもらうことができる。",
	"police":"治安は人口の成長に影響する、武将の武力と敏捷は高ければ高いほど、治安の実効率が高くなります。そして、治安を実行したら、武将が武力の経験をもらうことができる。",
	"city_defense":"城防は高ければ高いほど、防守戦の時、防御建築物が多くなります。",
	"repair":"修補は城防を高めることができる、武将の武力と统率は高ければ高いほど、修補の実効率が高くなります。そして、修補を実行したら、武将が武力の経験をもらうことができる。",
	"spy":"諜報は敵の都市の情報を取得することができる。",
	"transport":"物資の輸送は都市の資源を他の都市に移動することができる。",
	"training":"練習は兵科の熟練度を高めることができる、練習の上限は500です。武将の総合能力は高ければ高いほど、練習の実効率が高くなります。そして、練習を実行したら、武将が统率の経験をもらうことができる。",
	"population":"人口は兵士の募集に多少影響する。",
	"explore":"探索を実行したら、装備を探すことができる。市場の探索は馬、头盔及び兵法書を探すことができる、武将の知力、敏捷と運気は高ければ高いほど、市場の探索の成功率が高くなる。農地の探索は武器と铠甲を探すことができる、武将の知力、武力と運気は高ければ高いほど、農地の探索の成功率が高くなる。",
	"generals_move":"武将移動は武将を移動することができる。",
	"money":"お金の収入は三ヶ月に一回になります。都市の商業が高ければ高いほど、お金の収入が多くなります。",
	"food":"食糧の収入は每年の7月になります。都市の農業が高ければ高いほど、食糧の収入が多くなります。",
	"prefecture":"君主がいない都市は太守を任命することができる、太守は毎月に少量の功績がもらえる、そして、防守戦が出戦しなければなりません。",
	"appoint":"委任は内政重視、探索重視、軍事重視とランダムの4種類があります、委任した後、AIが委任した内容により自動的に進めることができる。",
	"loyalty":"武将の忠誠度が低い時、他の勢力に投降する可能性があります。褒賞か装備の分配は武将の忠誠度を高めることができる。",
	"exp":"戦闘が終わったら、戦闘中にもらった経験値は功績に変わります。",
	"feat":"功績は武将のレベルを決める、内政や戦闘は功績をもらうことができる。",
	"generals_lv":"武将のレベルは武将の兵力、MP及び使える策略を決める。",
	"seignior_lv":"勢力レベルは武将の平均レベルになります。勢力レベルは武将の攻撃、防御、精神、爆発及び士气を決める。",
	"life":"武将の寿命になった後、武将が亡くなります、武将の寿命を延長したい場合、「延寿符」を装備しなければなりません。",
	"proficiency":"兵科の熟練度が高ければ高いほど、この兵科を使う時、武将の攻撃、防御、精神、爆発及び士气が高くなります。熟練度が500までには練習することができる、500以上の場合、戦闘にしなければなりません。",
	"treat":"治療は予備兵を消費しないですが、傷兵しか治療できません、傷兵がなければ、治療を使っても、何も発生しないです。",
	"single_command_heal":"回復は予備兵を使って、兵力を回復することができる。予備兵がないと、回復を使うことができません。",
	"wounded":"戦闘中に武将が攻撃を受けると、傷兵が増えます、傷兵は治療することができます。武将の属性画面に傷兵はどのぐらいあるか確認することができる。",
	"growing":"能力の成長は部隊能力の上昇ということです。部隊能力は、攻撃力・精神力・防御力・瞬発力・士気の５つである。この５つの能力は、それぞれ武将の基本能力である武力・知力・統率力・素早さ・運気に関連している。部隊能力は、レベルが１アップする度に上昇するが、その上昇値は、部隊特性（Ｓ→Ａ→Ｂ→Ｃ）と武将の基本能力により決定される。次の表はその関係を纏めたものである。\n武将の基本能力・部隊特性	Ｓ	A	B	C\n９０以上　　　　　　　　 	4	3	3	2\n７０以上８9以下　　　　　	3	3	2	2\n５０以上６9以下　　　　　	3	2	2	1\n４9以下　　　　　	　　　　2	2	1	1\n部隊能力は、レベル０の時、［関連能力÷２］となる。例えば部隊の攻撃能力の場合、［その武将の武力÷２］がレベル０の時の数値となるわけである。以後、レベルが１アップする度に、上記の表の法則に従って能力が上昇するわけである。故に、レベルＰの時の自軍部隊の能力を数式にすると、［関連する基本能力÷２］＋［Ｐ×上昇数値］となる。従って、例えば基本能力の武力が８８の武将は、武力+2の武器を装備して武力を９０以上にするまでは、レベルをアップさせるのを控えておいた方がよいということになる。",
	"breakthrough":"初級部隊の成長は（Ｓ→Ａ→Ｂ→Ｃ）で、成長の数値は固定の（4→3→2→1）となっています。高級部隊はこの限界を突破することができる。例えば、武将の武力は98の場合、数値はS成長の必要な90より高いですが、初級部隊は4の成長しかできません、成長限界突破した高級部隊は4+の成長ができます、能力は高ければ高いほど、成長がより高くなる。",
};
