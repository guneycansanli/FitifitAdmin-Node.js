
var firebaseConfig = {
    apiKey: "AIzaSyB5ZY45YF5RzZ-eP_GgA-Eswyule7frVFg",
    authDomain: "fitifitapp.firebaseapp.com",
    databaseURL: "https://fitifitapp-default-rtdb.firebaseio.com",
    projectId: "fitifitapp",
    storageBucket: "fitifitapp.appspot.com",
    messagingSenderId: "443712603898",
    appId: "1:443712603898:web:b5f92196349bc4a0002b43",
    measurementId: "G-5CKQ6K87C4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  


//TABLE REFERENCE
var usrRef = firebase.database().ref().child("Users");
//$('#emp-table').find('tbody').html('');
var new_html = '';

window.onload = function () {
    initApp();
    displayUsrData();
};
//BUTTONS OR ACTIONS
function initApp() {
    document.getElementById('add_usr').addEventListener('click', addNewUsr, false);

}


// INSERT DATA
function addNewUsr() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var phone = document.getElementById('phone').value;
    var timeStamp = new Date().getTime();
    var usrID = 'USR_' + timeStamp;
    
    window.alert("Deneme");

    usrRef.child(usrID).set({
        name: name,
        email: email,
        image:"default",
        //address: address,
       // phone: phone,
        uid: usrID
    });
    $('#name').val('');
    $('#email').val('');
    $('#address').val('');
    $('#phone').val('');
}

//Display Employee Data 


function displayUsrData() {

    usrRef.on('child_added', function (usrData) {
        console.log(usrData.val());

        new_html += '<tr id="'+usrData.val().usrID+'">';
        new_html += '<td id="name_'+usrData.val().usrID+'">' + usrData.val().name + '</td>';
        new_html += '<td id="email_'+usrData.val().usrID+'">' + usrData.val().email + '</td>';
        new_html += '<td id="address_'+usrData.val().usrID+'">' + usrData.val().address + '</td>';
        new_html += '<td id="phone_'+usrData.val().usrID+'">' + usrData.val().phone + '</td>';
        new_html += '<td><a  class="edit" data-toggle="modal"><i class="material-icons editEmp"';
        new_html += 'data-toggle="tooltip" data-emp-id="' + usrData.val().uid + '" title="Edit">&#xE254;</i></a>';
        new_html += '<a class="" data-toggle="modal"><i class="material-icons delete"';
        new_html += 'data-toggle="tooltip"  data-emp-id="' + usrData.val().uid + '" title="Delete">&#xE872;</i></a>';
        new_html += '</td>';
        new_html += '</tr>';

        $("#usr-table").html(new_html);
       
    });

    

     $('#usr-table').find('tbody').append(new_html);

}

$(document).on('click', '.delete', function () {
    var usr_id = $(this).attr('data-emp-id');
    



    usrRef.child(usr_id).once('value', function (usr) {
        var modal_header = '';

        modal_header += '<h4 class="modal-title">Delete ' + usr.val().name + '</h4>';
        modal_header += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';

        var modal_body = '';
        modal_body += '<p>Are you sure you want to delete these Records?</p>';
        modal_body += '<p class="text-warning"><small>This action cannot be undone.</small></p>';
        var modal_footer = '';
        modal_footer += '<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">';
        modal_footer += '<input type="submit" data-dismiss="modal" data-emp-id="'+usr_id+'" class="btn btn-danger deleteEmpData" value="Delete">';
        $("#deleteEmployeeModal").find('.modal-header').html(modal_header);
        $("#deleteEmployeeModal").find('.modal-body').html(modal_body);
        $("#deleteEmployeeModal").find('.modal-footer').html(modal_footer);
        $("#deleteEmployeeModal").modal();
    })
});

$(document).on('click', '.editEmp', function () {
    var usr_id = $(this).attr('data-emp-id');
    



    usrRef.child(usr_id).once('value', function (emp) {
        var modal_header = '';

        modal_header += '<h4 class="modal-title">Add ' + emp.val().name + '</h4>';
        modal_header += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';

        var modal_body = '';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Name</label>';
        modal_body += '<input id="edit-name" type="text" value="'+emp.val().name+'" class="form-control" required>';
        modal_body += '</div>';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Email</label>';
        modal_body += '<input type="email" id="edit-email" value="'+emp.val().email+'" class="form-control" required>';
        modal_body += '</div>';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Address</label>';
        modal_body += '<textarea id="edit-address"  class="form-control" required>'+emp.val().address+'</textarea>';
        modal_body += '</div>';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Phone</label>';
        modal_body += '<input id="edit-phone" type="text" value="'+emp.val().phone+'" class="form-control" required>';
        modal_body += '</div>';
        

        var modal_footer = '';
        modal_footer += '<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">';
        modal_footer += '<input type="submit" data-dismiss="modal" data-emp-id="'+usr_id+'"  class="btn btn-danger updateEmpData" value="Save">';
        $("#editEmployeeModal").find('.modal-header').html(modal_header);
        $("#editEmployeeModal").find('.modal-body').html(modal_body);
        $("#editEmployeeModal").find('.modal-footer').html(modal_footer);
        $("#editEmployeeModal").modal();
    })
});


$(document).on('click', '.deleteEmpData', function () {
    var usr_id = $(this).attr('data-emp-id');
     
    usrRef.child(usr_id).remove();
  
    $('#'+usr_id).remove();
       
});


$(document).on('click', '.updateEmpData', function () {
    var usr_id = $(this).attr('data-emp-id');
     
    var name = document.getElementById('edit-name').value;
    var email = document.getElementById('edit-email').value;
    var address = document.getElementById('edit-address').value;
    var phone = document.getElementById('edit-phone').value;
    
   
    usrRef.child(usr_id).update({
        name: name,
        email: email,
        image:"default",
        //address: address,
       // phone: phone,
        uid: usr_id
    });
    
    $('#name_'+usr_id).html(name);
    $('#email_'+usr_id).html(email);
    $('#address_'+usr_id).html(address);
    $('#phone_'+usr_id).html(phone);


    
});



$(document).on('click', '.dltAllData', function () {
    var emp_id = $(this).attr('data-emp-id');
     
    usrRef.remove();
  
    $('#usr-table').remove();

    
});