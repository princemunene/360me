<?php session_start();
	 $server='192.168.0.100';
	 $db = mysql_connect('localhost', 'root', 'admin@123+',true) or die(mysql_error());
     mysql_select_db('chase',$db);
	 
	 

?>
