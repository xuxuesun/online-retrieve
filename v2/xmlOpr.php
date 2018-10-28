<?php
function processData($tmpStr)
{
	$xml = simplexml_load_string($tmpStr);
	$count_s = 0;
	if(@mysql_pconnect("localhost:3306","root","840123"))
	{
		mysql_select_db("mydb");
		$results = mysql_query("select * from myPapers");
		$rows = mysql_fetch_array($results);

		$t = time();
		$arr = $xml->document;
	
	if(gettype($arr) != "NULL"){
	foreach($arr as $doc)
	{
		$id_owner = "198401219";		//$id_owner = $_POST['user']
		$date_in = date("Y-m-d H:i:s",$t);
		$pubtype = $doc->pubtype;
		if(count($pubtype) == 0)
			$type = "error";
		else
			$type = $pubtype;
		$authors = $doc->authors;
		if(count($authors) == 0)
			$authors = "";
		else
			$authors = str_replace("'","\\'",$authors);
		$title = $doc->title;
		if(count($title) == 0)
			$title = "";
		else
			$title = str_replace("'","\\'",$title);
		$journal = $doc->pubtitle;
		if(count($journal) == 0)
			$journal = "";
		else
			$journal = str_replace("'","\\'",$journal);

		if($doc->py != "0-0  0")
		{
			$pubtime = split(" ",$doc->py);
			$day = 0;
			$month = "0";
			$year = "2010";
			
			if(count($pubtime) != 0)
			{
				$year = trim(end($pubtime));
				if(count($pubtime) <= 4)
				{
					if(count($pubtime) != 1)
					{
				if(preg_match("/[A-Za-z]+/i",$pubtime[0]) != 0)
				{
									$p1 = strpos($pubtime[0],".");
									if($p1 != FALSE)
										$month = substr($pubtime[0],0,$p1);
									else
										$month = $pubtime[0];
								}
								else if(preg_match("/[A-Za-z]+/i",$pubtime[1]) != 0)
								{
									$p2 = strpos($pubtime[1],".");
									if($p2 != FALSE)
										$month = substr($pubtime[1],0,$p2);
									else
										$month = $pubtime[1];
									$pos = strpos($pubtime[0],"-") ;
									if($pos != FALSE)
									{
										$day = intval(substr($pubtime[0],0,$pos));
									}
									else
										$day = intval($pubtime[0]);
								}
							}
					}
				}
			}
			
		
		$volume = $doc->volume;
		if(count($volume) == 0)
			$volume= "";
		$number = $doc->arnumber;
		if(count($number) == 0)
			$number =  "";
		if((count($doc->spage)>0) && (count($doc->epage)>0))
		$pages =  $doc->epage-$doc->spage+1;
		$abstract = $doc->abstract;
		if(count($abstract) == 0)
			$abstract = "";
		else
			$abstract = str_replace("'","\\'",$abstract);
		
		$keywords = "";
		$DOI = "";
		$weblink = $doc->pdf;
		if(count($weblink) ==0)
			$weblink = "localhost";
		
		$sql = "insert into myPapers(id_owner,date_in,type,authors,title,journal,year,month,"
					."day,volume,number,pages,abstr,keywords,DOI,weblink) values('".$id_owner."','".$date_in."','".$type."','".$authors."','".$title."','".$journal
					."','".$year."','".$month."',".$day.",'".$volume."','".$number."','".$pages."','"
					.$abstract."','".$keywords."','".$DOI."','".$weblink."')";
	
	mysql_query($sql);
	
		$count_s = $count_s +1;
	}
	}
	}
	echo 'create'.$count_s.' record to db<br>';
}

?>
