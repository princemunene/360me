<?php include('db_fns.php'); 
$userid='PM001';


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

$id=$_GET['id'];
switch($id){
 case 1:
              
              $cid=$_GET['cid'];
              $pid=$_GET['pid'];
              $bid=$_GET['bid'];
              $categid=$_GET['categid'];
              $company=$_GET['company'];
              $branch=$_GET['branch'];
              $category=$_GET['category'];
              $product=$_GET['product'];
              $name=$_GET['name'];
              $phone=$_GET['phone'];
              $email=$_GET['email'];
              $comment=$_GET['comment'];
             

            $stamp=date('Ymd');
            $date=date('d/m/Y');
              
              
              
        
        $username='Prince Munene';

        $resulta = mysql_query("insert into leads values('0','".$cid."','".$company."','".$bid."','".$branch."','".$categid."','".$category."','".$pid."','".$product."','".$userid."','".$username."','".$name."','".$phone."','".$email."','".$comment."','".$date."','".$stamp."',1)");
         if($resulta){
          $resulta = mysql_query("insert into log values('0','".$username." adds new lead .Lead Name:".$name."','".$username."','".date('YmdHi')."','".date('H:i')."','".date('d/m/Y')."','1')"); 
             echo"<script>alert('Lead Created')</script>";
                echo"<script>setTimeout(function() {window.location.href='http://192.168.0.100/chase/www/main.html'},1000);</script>";  
                }
              else { echo"<script>alert('Lead not Created') </script>";}
              
              break;

              case 2:

              $result =mysql_query("select * from leads where userid='".$userid."'");
              $total=$num_results = mysql_num_rows($result); 
              $open=0;$closed=0;$stalled=0;
              for ($i=0; $i <$num_results; $i++) {
              $row=mysql_fetch_array($result);
                if(stripslashes($row['status'])=='0'){
                  $stalled+=1;
                }
                if(stripslashes($row['status'])=='1'){
                  $open+=1;
                }
                if(stripslashes($row['status'])=='2'){
                  $closed+=1;
                }

              }
              echo"<script>$('#totalleads').html('".$total."');</script>";
               echo"<script>$('#stalledleads').html('".$stalled."');</script>";
                echo"<script>$('#openleads').html('".$open."');</script>";
                echo"<script>$('#closedleads').html('".$closed."');</script>";
              
             break;
              


  

}


?>
