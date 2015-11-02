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

$id=$_GET['id'];

function getcompany($xx){
$resultx =mysql_query("select * from companies where companyid='".$xx."'");
$rowx=mysql_fetch_array($resultx);
return stripslashes($rowx['companyname']);

}
function getbranch($xx){
$resultx =mysql_query("select * from branches where id='".$xx."'");
$rowx=mysql_fetch_array($resultx);
return stripslashes($rowx['branchname']);

}
function getcateg($xx){
$resultx =mysql_query("select * from categories where id='".$xx."'");
$rowx=mysql_fetch_array($resultx);
return stripslashes($rowx['category']);

}
function getproduct($xx){
$resultx =mysql_query("select * from products where id='".$xx."'");
$rowx=mysql_fetch_array($resultx);
return stripslashes($rowx['productname']);

}
switch($id){
  case 1:

    echo ' <div id="pages_maincontent">';
          echo" <h2 class=\"page_title\">Select Company</h2>";
          $result =mysql_query("select * from companies order by companyid asc");
          $num_results = mysql_num_rows($result); 
          for ($i=0; $i <$num_results; $i++) {
                $row=mysql_fetch_array($result);
                $next=stripslashes($row['next']);
              if($next==2){
                $link='branches.html?id=2&cid='.stripslashes($row['companyid']).'';
              }else if($next==3){
                 $link='categories.html?id=2&cid='.stripslashes($row['companyid']).'&bid=0';
              }
              else if($next==4){
                 $link='products.html?id=2&cid='.stripslashes($row['companyid']).'&bid=0&categ=0';
              }
              echo'<div class="companydata">
                <div class="companylogo"><a href="'.$link.'"><img src="images/icons/logos/'.stripslashes($row['companyimage']).'" alt="" title=""/></a> </div>
                 <div class="infocont ">
                 <div   id="com'.$i.'" onclick="showinfo('.$i.');"  class="companyinfo">
                  <h5>'.stripslashes($row['companyname']).'</h5>';
                  echo" <p>".stripslashes($row['companydesc'])."</p>";
                  echo'</div>
              </div>
            </div>';
           }
           echo '</div>';
  break;


   case 2:
   $next=$_GET['next'];
   $cid=$_GET['cid'];
    echo ' <div id="pages_maincontent">
           <h2 class="page_title">Select Branch</h2>';
    $result =mysql_query("select * from branches where companyid='".$cid."' order by id asc");
          $num_results = mysql_num_rows($result); 
          for ($i=0; $i <$num_results; $i++) {
                $row=mysql_fetch_array($result);

           echo '<div class="branchdata"><a href="categories.html?id=3&cid='.$cid.'&bid='.stripslashes($row['id']).'">
                 <p class="branchnamep">'.stripslashes($row['branchname']).'</p> 
              </a> </div>';
           }
           echo '</div>';
  break;


  case 3:
   $next=$_GET['next'];
   $cid=$_GET['cid'];
   $bid=$_GET['bid'];
    echo ' <div id="pages_maincontent">
           <h2 class="page_title">Select Product Category</h2>';
          $result =mysql_query("select * from categories where companyid='".$cid."' order by id asc");
          $num_results = mysql_num_rows($result); 
          for ($i=0; $i <$num_results; $i++) {
                $row=mysql_fetch_array($result);

           echo '<div class="branchdata"><a href="products.html?id=4&cid='.$cid.'&bid='.$bid.'&categ='.stripslashes($row['id']).'">
                 <p class="branchnamep">'.stripslashes($row['category']).'
                  </p> </a> 
              </div>';

            }
           
           echo '</div>';
  break;


  case 4:
   $next=$_GET['next'];
   $cid=$_GET['cid'];
  $bid=$_GET['bid'];
  $categ=$_GET['categ'];
     echo ' <div id="pages_maincontent">
           <h2 class="page_title">Select Product</h2>';
           if($categ==0){$result =mysql_query("select * from products where companyid='".$cid."' order by id asc");}
           else{$result =mysql_query("select * from products where categoryid='".$categ."' order by id asc");}
          $num_results = mysql_num_rows($result); 
          for ($i=0; $i <$num_results; $i++) {
                $row=mysql_fetch_array($result);

            echo '<div class="companydata">
                <div class="companylogo"><a href="phone.html?id=5&cid='.$cid.'&bid='.$bid.'&categ='.$categ.'&pid='.stripslashes($row['id']).'"><img src="images/icons/logos/19.png" alt="" title=""/></a> </div>
                 <div class="infocont ">
                 <div   id="com'.$i.'" onclick="showinfo('.$i.');"  class="companyinfo">
                  <h5>'.stripslashes($row['productname']).'</h5>
                  <p>'.stripslashes($row['productdescription']).'</p></div>
              </div>
            </div>';

           }
           
           echo '</div>';
  break;

  case 5:

   $next=$_GET['next'];
   $cid=$_GET['cid'];
   $bid=$_GET['bid'];
   $categ=$_GET['categ'];
   $pid=$_GET['pid'];
   $name='';
   $phone='';
  

 echo '<div id="pages_maincontent"><h2 class="page_title">Select Contact<a href="leads.html?id=6&cid='.$cid.'&bid='.$bid.'&categ='.$categ.'&pid='.$pid.'&name='.$name.'&phone='.$phone.'">
 <img src="images/load_posts.png" style="float:right;width:30px;height:30px;margin-right:30px;margin-bottom:0" alt="" title="" /></a></h2>
 <input type="text"  id="SearchContacts" value="" class="form_input required name" placeholder="Search Contacts..." />';
 echo'<div data-role="page">
     <div class="wrapper">

      <ul id="contactsList" class="contactsList" data-role="listview" data-filter="true" data-filter-placeholder="Search Contacts..." data-inset="true">

           <li>
                <h2>Loading Contacts..</h2>
            </li>
        </ul>
      </div>
    </div>
    </div> 
    <script type="text/javascript" src="js/index.js"></script>';


  break;



  case 6:
  $next=$_GET['next'];
  $cid=$_GET['cid'];
  $bid=$_GET['bid'];
  $categ=$_GET['categ'];
  $pid=$_GET['pid'];
  $name=$_GET['name'];
  $phone=$_GET['phone'];
  echo ' <div id="pages_maincontent">
           <h2 class="page_title">Add Leads</h2>
            <div class="cleaner_h10"></div>
            <p class="leadp">Counter check this information:</p>
             <div class="contactform">
            <form>
             <label>Product Details:</label>
             <input type="hidden" value="'.$cid.'" id="cid"/>
             <input type="hidden" value="'.$pid.'" id="pid"/>
             <input type="hidden" value="'.$categ.'" id="categid"/>
             <input type="hidden" value="'.$bid.'" id="bid"/>
             <input placeholder="Company Name" type="text" id="comname" value="'.getcompany($cid).'" class="form_input required" disabled="disabled" />
             <input placeholder="Branch Name" type="text" id="branchname" value="'.getbranch($bid).'" class="form_input required" disabled="disabled" />
             <input placeholder="Product Category" type="text" id="categname" value="'.getcateg($categ).'" class="form_input required" disabled="disabled" />
             <input placeholder="Product Name" type="text" id="productname" value="'.getproduct($pid).'" class="form_input required" disabled="disabled" />
            
            <label>Contact Details:</label>
            <input type="text"  id="ContactName" value="'.$name.'" class="form_input required name" placeholder="Name" />
            <input type="text"  id="ContactPhone" value="'.$phone.'" class="form_input required phone" placeholder="Phone" />
            <label>Additional Details:</label>
            <input type="text" name="ContactEmail" id="ContactEmail" value="" class="form_input required email" placeholder="Email" />
            <textarea name="ContactComment" id="ContactComment" class="form_textarea textarea required" rows="" cols="5" placeholder="Additional details/Comments"></textarea>
            <input type="button" name="submit" class="form_submit" id="submit" value="Add Lead" onclick="addlead()" />
            <label id="loader"></label>
            </form>
            </div>
             </div>';

  break;



}


?>
