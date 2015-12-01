<?php 
$data = $_POST["data"];
$index = $_POST["index"];
$r = savefile($data,"map_{$index}.txt");
echo $r;
function savefile($data,$name){
	$hoge_fp = fopen($name, "w");
	$r=fwrite($hoge_fp,$data);
	fclose($hoge_fp);
	return $r;
}
?>