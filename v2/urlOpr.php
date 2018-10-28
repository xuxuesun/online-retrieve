<?php
include("HttpClient.php");

function httpRequest($url)
{
	$data = HttpClient::quickGet($url);
	$data = mb_convert_encoding($data,'UTF-8');	
	$data = trim($data);
	return $data;
}

function getTotalNum($baseurl,$postfield) {
$surl = $baseurl."?".$postfield."&hc=200&rs=1";
$dataStr = httpRequest($surl);
return $dataStr;
}

?>