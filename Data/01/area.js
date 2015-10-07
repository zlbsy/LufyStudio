function getIdentity(value){
	var identitis = ["在野","一般","太守"];
}
LMvc.areaData = {
	title : "黄巾之乱",
	icon : 1,
	seigniors : [{
		chara_id : 1,
		generals_count : 6,
		color : "red",
		areas : [{
			area_id : 2,
			prefecture : 1,
			money : 300000,
			level : 1,
			food : 2000,
			population : 40000,
			business : 300,
			agriculture : 200,
			technology : 100,
			police : 70,
			city_defense : 1000,
			troops : 14000,
			items_farmland:[
				{item_id:4,proportion:10,quantity:1000},
			],
			items_market:[
				{item_id:5,proportion:10,quantity:1000},
			],
			items : [
				{item_id:4,lv:1},
				{item_id:5,lv:2},
				{item_id:6,lv:2},
				{item_id:7,lv:3},
				{item_id:8,lv:4},
				{item_id:5,lv:5}
			],
			generals:[
				{chara_id:1,lv:3,feat:817,loyalty:100,equipments:[{item_id:4}]},
				{chara_id:2,lv:3,feat:166,loyalty:50,equipments:[{item_id:5}]},
				{chara_id:3,lv:3,feat:166,loyalty:50,equipments:[{item_id:6}]},
				{chara_id:13,lv:3,feat:166,loyalty:50},
				{chara_id:14,lv:3,feat:166,loyalty:50},
				{chara_id:15,lv:3,feat:166,loyalty:50},
				{chara_id:16,lv:3,feat:166,loyalty:50},
				{chara_id:17,lv:3,feat:166,loyalty:50},
				{chara_id:18,lv:3,feat:166,loyalty:50},
				{chara_id:19,lv:3,feat:166,loyalty:50},
				{chara_id:20,lv:3,feat:166,loyalty:50},
				{chara_id:21,lv:3,feat:166,loyalty:50},
				{chara_id:22,lv:3,feat:166,loyalty:50},
				//{chara_id:23,lv:3,feat:166,loyalty:50}
			],
			out_of_offices:[
				{chara_id:8,lv:1,feat:0},
				{chara_id:29,lv:1,feat:0}
			],
			not_debut:[
				{chara_id:9,lv:1,feat:0,year:184,month:1}
			],
			captives:[
				{chara_id:23,seignior_id:2,feat:166,loyalty:50},
			]
		},{
			area_id : 1,
			prefecture : 16,
			money : 3000,
			food : 2000,
			population : 40000,
			business : 300,
			agriculture : 200,
			technology : 100,
			police : 70,
			city_defense : 1000,
			troops : 9000,
			generals:[
				{chara_id:4,lv:3,feat:166,loyalty:50},
				{chara_id:5,lv:3,feat:166,loyalty:50},
				{chara_id:10,lv:3,feat:817,loyalty:100},
				{chara_id:11,lv:3,feat:166,loyalty:50}
			],
			out_of_offices:[
			],
			not_debut:[
			],
			captives:[
			]
		}]
	}, {
		chara_id : 2,
		generals_count : 16,
		city_count : 3,
		color : "black",
		areas : [{
			area_id : 12,
			money : 2000,
			troops : 8000,
			generals:[
				{chara_id:6,lv:3,feat:166,loyalty:50},
				{chara_id:7,lv:3,feat:166,loyalty:50}
			],
			out_of_offices:[
			],
			not_debut:[
			]
		}]
	}, {
		chara_id : 3,
		generals_count : 2,
		city_count : 1,
		color : "blue",
		areas : [{
			area_id : 3,
			money : 3300,
			troops : 7000,
			generals:[
				//{chara_id:24,lv:3,feat:166,loyalty:50},
				{chara_id:25,lv:3,feat:166,loyalty:50},
				{chara_id:26,lv:3,feat:166,loyalty:50},
				{chara_id:27,lv:3,feat:166,loyalty:50},
				{chara_id:28,lv:3,feat:166,loyalty:50}
			],
			out_of_offices:[
			],
			not_debut:[
			],
			captives:[
				{chara_id:24,seignior_id:1,feat:166,loyalty:50},
			]
		}]
	}, {
		chara_id : 4,
		generals_count : 11,
		city_count : 2,
		color : "brown",
		areas : [{
			area_id : 4,
			money : 3200,
			troops : 4300
		}]
	}, {
		chara_id : 5,
		generals_count : 18,
		city_count : 4,
		color : "darkgoldenrod",
		areas : [{
			area_id : 5,
			money : 3040,
			troops : 4200
		}]
	}, {
		chara_id : 6,
		generals_count : 3,
		city_count : 1,
		color : "darkviolet",
		areas : [{
			area_id : 6,
			money : 3100,
			troops : 4100
		}]
	}]
}; 