LMvc.startEvent = {
	script:"Data/Event/{0}/chapter05.txt",
	result:[
	{type:"stopBattle", seigniors:[21,446], month:24},
	{type:"stopBattle", seigniors:[446,501,594,605,615], month:24},
	{type:"stopBattle", condition:{noSeignior:[17, 446]},seigniors:[446,17], month:15},
	{type:"stopBattle", condition:{noSeignior:[17, 594]},seigniors:[594,17], month:24},
		{type:"marry",general:548,target:2},//周瑜小乔
		{type:"marry",general:2,target:548},
		{type:"marry",general:524,target:35},//曹丕甄氏
		{type:"marry",general:35,target:524},
		{type:"marry",general:336,target:241},//孟获祝融
		{type:"marry",general:241,target:336},
		{type:"marry",general:10,target:139},//诸葛亮黄月英
		{type:"marry",general:139,target:10}
	]
};
