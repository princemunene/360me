// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
	swipeBackPage: false,
	swipeBackPageThreshold: 1,
	swipePanel: "left",
	swipePanelCloseOpposite: true,
	pushState: true,
	pushStateRoot: undefined,
	pushStateNoAnimation: false,
	pushStateSeparator: '#!/',
    template7Pages: true
});


$(document).ready(function(){
getleads();
});


// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: false
});

$$(document).on('ajaxStart',function(e){myApp.showIndicator();});
$$(document).on('ajaxComplete',function(){myApp.hideIndicator();});																																																																		

$$(document).on('pageInit', function (e) {
		
  		$(".swipebox").swipebox();
		$("#ContactForm").validate({
		submitHandler: function(form) {
		ajaxContact(form);
		return false;
		}
		});
		
		$("#RegisterForm").validate();
		$("#LoginForm").validate();
		$("#ForgotForm").validate();
		
		$('a.backbutton').click(function(){
			parent.history.back();
			return false;
		});
		

		$(".posts li").hide();	
		size_li = $(".posts li").size();
		x=4;
		$('.posts li:lt('+x+')').show();
		$('#loadMore').click(function () {
			x= (x+1 <= size_li) ? x+1 : size_li;
			$('.posts li:lt('+x+')').show();
			if(x == size_li){
				$('#loadMore').hide();
				$('#showLess').show();
			}
		});

		getip();

		jQuery(function($) {
		  $('#companies').show(1000, function() {openmenu();})
		});

		jQuery(function($) {
		  $('#branches').show(1000, function() {openbranch();});
		});

		jQuery(function($) {
		  $('#categories').show(1000, function() {opencateg();});
		});

		jQuery(function($) {
		  $('#products').show(1000, function() {openproduct();});
		});


		jQuery(function($) {
		  $('#newphone').show(1000, function() {opencontact();});
		});

		jQuery(function($) {
		  $('#newlead').show(1000, function() {openlead();});
		});

		


	 	 
        

	$("a.switcher").bind("click", function(e){
		e.preventDefault();
		
		var theid = $(this).attr("id");
		var theproducts = $("ul#photoslist");
		var classNames = $(this).attr('class').split(' ');
		
		
		if($(this).hasClass("active")) {
			// if currently clicked button has the active class
			// then we do nothing!
			return false;
		} else {
			// otherwise we are clicking on the inactive button
			// and in the process of switching views!

  			if(theid == "view13") {
				$(this).addClass("active");
				$("#view11").removeClass("active");
				$("#view11").children("img").attr("src","images/switch_11.png");
				
				$("#view12").removeClass("active");
				$("#view12").children("img").attr("src","images/switch_12.png");
			
				var theimg = $(this).children("img");
				theimg.attr("src","images/switch_13_active.png");
			
				// remove the list class and change to grid
				theproducts.removeClass("photo_gallery_11");
				theproducts.removeClass("photo_gallery_12");
				theproducts.addClass("photo_gallery_13");

			}
			
			else if(theid == "view12") {
				$(this).addClass("active");
				$("#view11").removeClass("active");
				$("#view11").children("img").attr("src","images/switch_11.png");
				
				$("#view13").removeClass("active");
				$("#view13").children("img").attr("src","images/switch_13.png");
			
				var theimg = $(this).children("img");
				theimg.attr("src","images/switch_12_active.png");
			
				// remove the list class and change to grid
				theproducts.removeClass("photo_gallery_11");
				theproducts.removeClass("photo_gallery_13");
				theproducts.addClass("photo_gallery_12");

			} 
			else if(theid == "view11") {
				$("#view12").removeClass("active");
				$("#view12").children("img").attr("src","images/switch_12.png");
				
				$("#view13").removeClass("active");
				$("#view13").children("img").attr("src","images/switch_13.png");
			
				var theimg = $(this).children("img");
				theimg.attr("src","images/switch_11_active.png");
			
				// remove the list class and change to grid
				theproducts.removeClass("photo_gallery_12");
				theproducts.removeClass("photo_gallery_13");
				theproducts.addClass("photo_gallery_11");

			} 
			
		}

	});	
	
	document.addEventListener('touchmove', function(event) {
	   if(event.target.parentNode.className.indexOf('navbarpages') != -1 || event.target.className.indexOf('navbarpages') != -1 ) {
		event.preventDefault(); }
	}, false);
	
	// Add ScrollFix
	var scrollingContent = document.getElementById("pages_maincontent");
	new ScrollFix(scrollingContent);
	
	
	var ScrollFix = function(elem) {
		// Variables to track inputs
		var startY = startTopScroll = deltaY = undefined,
	
		elem = elem || elem.querySelector(elem);
	
		// If there is no element, then do nothing	
		if(!elem)
			return;
	
		// Handle the start of interactions
		elem.addEventListener('touchstart', function(event){
			startY = event.touches[0].pageY;
			startTopScroll = elem.scrollTop;
	
			if(startTopScroll <= 0)
				elem.scrollTop = 1;
	
			if(startTopScroll + elem.offsetHeight >= elem.scrollHeight)
				elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
		}, false);
	};
	
		
		
})



//start of code

function getip(){

	// NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
var RTCPeerConnection = /*window.RTCPeerConnection ||*/ window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

if (RTCPeerConnection) (function () {
    var rtc = new RTCPeerConnection({iceServers:[]});
    if (1 || window.mozRTCPeerConnection) {      // FF [and now Chrome!] needs a channel/stream to proceed
        rtc.createDataChannel('', {reliable:false});
    };
    
    rtc.onicecandidate = function (evt) {
        // convert the candidate to SDP so we can run it through our general parser
        // see https://twitter.com/lancestout/status/525796175425720320 for details
        if (evt.candidate) grepSDP("a="+evt.candidate.candidate);
    };
    rtc.createOffer(function (offerDesc) {
        grepSDP(offerDesc.sdp);
        rtc.setLocalDescription(offerDesc);
    }, function (e) { console.warn("offer failed", e); });
    
    
    var addrs = Object.create(null);
    addrs["0.0.0.0"] = false;
    function updateDisplay(newAddr) {
        if (newAddr in addrs) return;
        else addrs[newAddr] = true;
        var displayAddrs = Object.keys(addrs).filter(function (k) { return addrs[k]; });
        document.getElementById('server').textContent = displayAddrs.join(" or perhaps ") || "n/a";
    }
    
    function grepSDP(sdp) {
        var hosts = [];
        sdp.split('\r\n').forEach(function (line) { // c.f. http://tools.ietf.org/html/rfc4566#page-39
            if (~line.indexOf("a=candidate")) {     // http://tools.ietf.org/html/rfc4566#section-5.13
                var parts = line.split(' '),        // http://tools.ietf.org/html/rfc5245#section-15.1
                    addr = parts[4],
                    type = parts[7];
                if (type === 'host') updateDisplay(addr);
            } else if (~line.indexOf("c=")) {       // http://tools.ietf.org/html/rfc4566#section-5.7
                var parts = line.split(' '),
                    addr = parts[2];
                updateDisplay(addr);
            }
        });
    }
})(); else {
    document.getElementById('server').innerHTML = "<code>ifconfig | grep inet | grep -v inet6 | cut -d\" \" -f2 | tail -n1</code>";
    document.getElementById('server').nextSibling.textContent = "In Chrome and Firefox your IP should display automatically, by the power of WebRTCskull.";
}
}

function getUrlVars() {
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
vars[key] = value;
});
return vars;
}
function showinfo(a){

			var theid = "com"+a;
			var tit= $("#"+theid).children("h5").text();
			var mess= $("#"+theid).children("p").text();
			$().customAlert();
			alert(''+tit, '<p></p>'+mess);
}

function openmenu(a,server){
			var server='192.168.0.100'
		 	$('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white"></span></div>');
	 	 	$.get('http://'+server +'/chase/www/bridge.php?id=1', function (data) {
	 	 	$('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
	 	 	$('#companies').html(data);
	 	 	});
		  	
}

function openbranch(){
			var b=0;
			var a = getUrlVars()["cid"];
			var server='192.168.0.100'
		 	$('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white"></span></div>');
	 	 	$.get('http://'+server +'/chase/www/bridge.php?id=2&next=' + b + '&' + "\ncid=" + a, function (data) {
	 	 	$('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
	 	 	$('#branches').html(data);
	 	 	});
		  	
}

function opencateg(){
			var b=0;
			var a = getUrlVars()["cid"];
			var c = getUrlVars()["bid"];
			var server='192.168.0.100'
		 	$('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white"></span></div>');
	 	 	$.get('http://'+server +'/chase/www/bridge.php?id=3&next=' + b + '&' + "\ncid=" + a + '&' + "\nbid=" + c, function (data) {
	 	 	$('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
	 	 	$('#categories').html(data);
	 	 	});
		  	
}

function openproduct(){
			var b=0;
			var a = getUrlVars()["cid"];
			var c = getUrlVars()["bid"];
			var d = getUrlVars()["categ"];
			var server='192.168.0.100'
		 	$('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white"></span></div>');
	 	 	$.get('http://'+server +'/chase/www/bridge.php?id=4&next=' + b + '&' + "\ncid=" + a + '&' + "\nbid=" + c + '&' + "\ncateg=" + d, function (data) {
	 	 	$('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
	 	 	$('#products').html(data);
	 	 	});
		  	
}
function opencontact(){

			var b=0;
			var a = getUrlVars()["cid"];
			var c = getUrlVars()["bid"];
			var d = getUrlVars()["categ"];
			var e = getUrlVars()["pid"];
			var server='192.168.0.100'
		 	$('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white"></span></div>');
	 	 	$.get('http://'+server +'/chase/www/bridge.php?id=5&next=' + b + '&' + "\ncid=" + a + '&' + "\nbid=" + c + '&' + "\ncateg=" + d + '&' + "\npid=" + e, function (data) {
	 	 	$('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
	 	 	$('#newphone').html(data);
	 	 	});
		  	
}

function openlead(){

			var b=0;
			var a = getUrlVars()["cid"];
			var c = getUrlVars()["bid"];
			var d = getUrlVars()["categ"];
			var e = getUrlVars()["pid"];
			var f=  getUrlVars()["name"];
			var g=  getUrlVars()["phone"];
			var server='192.168.0.100'
		 	$('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white"></span></div>');
	 	 	$.get('http://'+server +'/chase/www/bridge.php?id=6&next=' + b + '&' + "\ncid=" + a + '&' + "\nbid=" + c + '&' + "\ncateg=" + d + '&' + "\npid=" + e + '&' + "\nname=" + f + '&' + "\nphone=" + g, function (data) {
	 	 	$('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
	 	 	$('#newlead').html(data);
	 	 	});
		  	
}


function addlead(){
	

var cid =  $('#cid').val();
var pid =  $('#pid').val();
var bid =  $('#bid').val();
var categid =  $('#categid').val();
var company =  $('#comname').val();
var branch =  $('#branchname').val();
var category =  $('#categname').val();
var product =  $('#productname').val();
var name =  $('#ContactName').val();
var phone =  $('#ContactPhone').val();
var email =  $('#ContactEmail').val();
var comment =  $('#ContactComment').val();
var server='192.168.0.100';

if(name==''){
$().customAlert();
alert('Error!', '<p>Enter the Name of the Prospect!</p>');
$('#ContactName').focus();
e.preventDefault();
}	
else if(phone==''){
$().customAlert();
alert('Error!', '<p>Enter the Phone Number of the Prospect!</p>');
$('#ContactPhone').focus();
}
else{
	$('#loader').html('<img id="img-spinner" src="images/loader.gif" alt="Loading"/>');
	$.ajax({
	url:'http://'+server +'/chase/www/data.php',
	data:{id:1,cid:cid,pid:pid,bid:bid,categid:categid,company:company,branch:branch,category:category,product:product,name:name,phone:phone,email:email,comment:comment},
	success:function(data){
	$('#loader').html(data);
	}
	});	
	}	
}


function getleads(){
	var server='192.168.0.100';
	$.ajax({
	url:'http://'+server +'/chase/www/data.php',
	data:{id:2},
	success:function(data){
	$('#leadsdata').html(data);
	}
	});	
}
