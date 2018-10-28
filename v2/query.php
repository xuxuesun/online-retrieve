<?php
include("urlOpr.php");
include("xmlOpr.php");

function timer_start(){
	global $timestart;
	$mtime = explode(' ', microtime());
	$mtime = $mtime[1] + $mtime[0];
	$timestart = $mtime;
	return $timestart;
}

function genQueryAllflds($str)
{
		$txt = '(Author:'.$str.' OR "Document Title":'.$str.' OR Abstract:';
		$txt = $txt.$str.' OR "Publication Title":'.$str.' OR "Publication Year":';
		$txt = $txt.$str.')';
		
		return $txt;
}

function genQueryDefault()
{
		//return genQueryAllflds($_POST['intxt']);
		return $_POST['intxt'];
}

function genQueryExpand()
{
		$txt = "(".genQueryAllflds($_POST['intxt1']).")";
		if($_POST['intxt2'] != "")
			$txt = $txt." AND (".genQueryAllflds($_POST['intxt2']).")";
		if($_POST['intxt3'] != "")
		$txt = $txt." AND (".genQueryAllflds($_POST['intxt3']).")";
		
		return $txt;
}

function genAdvQueryStr($s,$fld)
{
	$exp = "";
	if(strpos($s," ") == FALSE)
	{
			$exp = $fld.':'.$s;
	}
	else{
		$arr_tit = split(" ",$s);
			for($i=0; $i < sizeof($arr_tit); $i++)
			{
				if(($arr_tit[$i] != "AND") && ($arr_tit[$i] != "OR"))
				{
					if($i==0)
						$exp = $exp.$fld.':'.$arr_tit[$i];
					else
						$exp = $exp.' '.$fld.':'.$arr_tit[$i];
				}
				else{
					$exp = $exp." ".$arr_tit[$i];
				}
			}
	}
	$exp = '('.$exp.')';
	return $exp;
}

function genQueryAdvanced()
{
		$exp = "";
		$first = true;
		if($_POST['title'] != "  ")
		{
			$exp = $exp.genAdvQueryStr(rtrim($_POST['title']),'"Document Title"');
			$first = false;
			//str_replace(" ",urldecode(" "),$exp);
		}
		if($_POST['authors'] != "  ")
		{
			if($first == true)
			{
				$exp = $exp.genAdvQueryStr(rtrim($_POST['authors']),'Author');
				$first = false;
			}
			else
			{
			  $exp = $exp.' AND '.genAdvQueryStr(rtrim($_POST['authors']),'Author');
			}
		}
		if($_POST['pubname'] != "  ")
		{
			if($first == true)
			{
				$exp = $exp.genAdvQueryStr(rtrim($_POST['pubname']),'"Publication Title"');
				$first = false;
			}
			else
			{
			$exp = $exp.' AND '.genAdvQueryStr(rtrim($_POST['pubname']),'"Publication Title"');
			}
		}
		if($_POST['abstract'] != "  ")
		{
			if($first == true)
			{
				$exp = $exp.genAdvQueryStr(rtrim($_POST['abstract']),'Abstract');
				$first = false;
			}
			else
			{
				$exp = $exp.' AND '.genAdvQueryStr(rtrim($_POST['abstract']),'Abstract');
			}
		}		
		if($_POST['pubyear'] != "")
		{
			if($first == true)
			{
				$exp = $exp.'("Publication Year":'.$_POST['pubyear'].')';
				$first = false;
			}
			else
			{
				$exp = $exp.' AND ("Publication Year":'.$_POST['pubyear'].')';
			}
		}
		if($_POST['doinum'] != "")
		{
			if($first == true)
			{
				$exp = $exp.'(DOI:'.$_POST['doinum'] .')';
				$first = false;
			}
			else
			{
				$exp = $exp.' AND (DOI:'.$_POST['doinum'] .")";
			}
		}
		return $exp;
}

function genQuery()
{
		if($_POST['flag'] == "1")
			return genQueryDefault();
		else if($_POST['flag'] == "2")
			return genQueryExpand();
		else if($_POST['flag'] == "3")
			return genQueryAdvanced();
		else
			return "error";
}

function processQuery()
{
	$s_time = timer_start();
	$baseurl="http://ieeexplore.ieee.org/gateway/ipsSearch.jsp";
	
	$postfield = "querytext=(".genQuery().")";
	
	$postfield = str_replace(" ",urlencode(" "),$postfield);
	$postfield = str_replace('"',urlencode('"'),$postfield);
	
	$s_time_request = timer_start();
	$data = getTotalNum($baseurl,$postfield);
	$e_time_request = timer_start();
	echo "request time:".(($e_time_request-$s_time_request)*1000).'ms<br>';
	$s_time_todb = timer_start();
	processData($data);
	$e_time_todb = timer_start();
	echo "DB time:".(($e_time_todb-$s_time_todb)*1000).'ms<br>';
	$e_time = timer_start();
	echo "all time:".(($e_time-$s_time)*1000).'ms<br>';
}

processQuery();
?>