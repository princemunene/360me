document.addEventListener("deviceready", onDeviceReady, false);
var allcontacts=[];

function onDeviceReady() {
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');

    if ($("#contactsList").length == 1) {
        $("body").addClass('ui-disabled').css("background", "#000");
        $.mobile.loading("show");
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        var filter = ["displayName", "phoneNumbers"];
        navigator.contacts.find(filter, onSuccess, onError, options);
    } 

    $('#SearchContacts').keyup(function() {

        filtercontacts($(this).val());
    });


}


function filtercontacts(key){

if (allcontacts.length>0) {
        var results=[];
          allcontacts.forEach(function(element, index){
            if (element.name.toLowerCase().indexOf(key.toLowerCase()) >= 0) {
              results.push(element);
            }
          });
     sortResults(results, 'name', true);
}else{
alert('no contacts available');
}
}

function onSuccess(contacts) {
    //alert("Success: "+contacts.length);
    //sort array

    /*var html = "";
    for (var i = 0; i < contacts.length; i++) {
        if ($.trim(contacts[i].displayName).length != 0 || $.trim(contacts[i].nickName).length != 0) {
            var name=contacts[i].displayName;
            if (contacts[i].phoneNumbers) {
                   html += "<li>Name: " + name + "<br/>" +
                            "Phone: " + contacts[i].phoneNumbers[0].value + "<br/></li>";
                }
        }
    }*/
    var conts = [];
    for (var i = 0; i < contacts.length; i++) {
            var cont = {};
            cont.name = '';
            if ($.trim(contacts[i].displayName).length != 0) {
                cont.name = contacts[i].displayName ? contacts[i].displayName : contacts[i].nickName;
                if (contacts[i].phoneNumbers) {
                    cont.phone = ''; cont.img = '';
                    for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
                        cont.phone = contacts[i].phoneNumbers[j].value;
                        cont.img = contacts[i].photos  != null ? contacts[i].photos[0].value : "images/author.jpg";
                        cont.img = "images/author.jpg";
                    }
                }
                cont.email = '';
                if (contacts[i].emails) {
                  for (var j = 0; j < contacts[i].emails.length; j++) {
                    cont.email = contacts[i].emails[j].value;
                  }
                }
              }
            if (cont.name != undefined && cont.phone != undefined) {
              conts.push(cont);
            }
    }

    allcontacts=conts;

    sortResults(conts, 'name', true);

    
}

function getUrlVars() {
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
vars[key] = value;
});
return vars;
}




function sortResults (result, prop, asc) {
    //alert("Sort: "+result.length);
          result = result.sort(function(a, b) {
            if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
          });
          listContacts(result);
}

 function listContacts (contacts){
   // alert("List: "+contacts.length);

            var b=0;
            var a = getUrlVars()["cid"];
            var c = getUrlVars()["bid"];
            var d = getUrlVars()["categ"];
            var e = getUrlVars()["pid"];


    var html = "";
    contacts.forEach(function(element, index){
        var f=element.name;
        var g= element.phone;
        html += "<li  class='contactli'><a href='leads.html?id=6&next=" + b + "&" + "\ncid=" + a + "&" + "\nbid=" + c + "&" + "\ncateg=" + d + "&" + "\npid=" + e + "&" + "\nname=" + f + "&" + "\nphone=" + g + "'><img src='" + element.img + "'/><span>Name: " + element.name + "<br/>Phone: " + element.phone + "<br/></span></a></li>";
    });

    if (contacts.length === 0) {
        html = '<li data-role="collapsible" data-iconpos="right" data-shadow="false" data-corners="false">';
        html += '<h2>No Contacts</h2>';
        html += '<label>No Contacts Listed</label>';
        html += '</li>';
    }

    $("#contactsList").html(html);
    $("#contactsList").listview().listview('refresh');
    $(".innerlsv").listview().listview('refresh');
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');

}

function onError(contactError) {
    //alert('Oops Something went wrong!');
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');
}

