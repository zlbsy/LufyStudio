<?php 
$data = $_POST["data"];
$r = savefile($data,"map.txt");
echo $r;
function savefile($data,$name){
	$hoge_fp = fopen($name, "w");
	$r=fwrite($hoge_fp,$data);
	fclose($hoge_fp);
	return $r;
}
?>