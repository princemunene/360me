<?php include('db_fns.php'); 


  if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }
    

    echo'<div id="pages_maincontent">
      <h2 class="page_title">Select Company</h2>
      <div class="page_content"> ';

         $result =mysql_query("select * from companies order by companyid asc");
          $num_results = mysql_num_rows($result); 
          for ($i=0; $i <$num_results; $i++) {
                $row=mysql_fetch_array($result);

           echo '<div class="companydata">
                <div class="companylogo"><a href="main.html"><img src="images/icons/logos/'.stripslashes($row['companyimage']).'" alt="" title=""/></a> </div>
                 <div class="infocont ">
                 <div   id="com'.$i.'" onclick="showinfo();"  class="companyinfo">
                  <h5>'.stripslashes($row['companyname']).'</h5>
                  <p>'.stripslashes($row['companydesc']).'</p></div>
              </div>
            </div>';
           }
    echo '</div></div>';

?>
