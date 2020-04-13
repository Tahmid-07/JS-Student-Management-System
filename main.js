document.getElementById('inputForm').addEventListener('submit', saveDetails);

function saveDetails(e){

  let id = chance.guid();
  let nameDetails = document.getElementById('nameInput').value;
  let classesDetails = document.getElementById('classInput').value;
  let sectionDetails = document.getElementById('sectionInput').value;
  let rollDetails = document.getElementById('rollInput').value;
  let status = 'Open';

  let description = {

    id: id,
    name: nameDetails,
    classes: classesDetails,
    section: sectionDetails,
    roll: rollDetails,
    status: status

    }

    if(localStorage.getItem('student') == null){
      
      let details = [];
      details.push(description);
      localStorage.setItem('student', JSON.stringify(details));

    } else {

      let details = JSON.parse(localStorage.getItem('student'));
      details.push(description);
      localStorage.setItem('student', JSON.stringify(details));
           
    }

    document.getElementById('inputForm').reset();

    fetchDetails();

    e.preventDefault();
  
}

// close button

function setStatusClosed(name){

  let details = JSON.parse(localStorage.getItem('student'));
  
  for(let i = 0; i < details.length; i++){

   if(details[i].name == name){

      details[i].status = 'Closed';

     }    
   }

   localStorage.setItem('student', JSON.stringify(details));
  

   fetchDetails();
}


// delete button

function deleteDetails(name){

  let details = JSON.parse(localStorage.getItem('student'));
  
  for(let i = 0; i < details.length; i++){

   if(details[i].name == name){

      details.splice(i, 1);

     }    
   }

   localStorage.setItem('student', JSON.stringify(details));
  

   fetchDetails();
}


function fetchDetails(){

  let details = JSON.parse(localStorage.getItem('student')); // getting value from localstorage
  let lists = document.getElementById('list'); // setting values to output div list

  lists.innerHTML = '';  // output div is empty


  for(let i = 0; i < details.length; i++){

    let id = details[i].id;
    let name = details[i].name;
    let classes = details[i].classes;
    let section = details[i].section;
    let roll = details[i].roll;
    let status = details[i].status;


    lists.innerHTML += '<div class="well col-sm-4">' +
                       '<h6>Student ID: ' + id + '</h6>' +
                       '<p><span class="label label-info">' +
                       status + '</span></p>'+
                       '<h3>' + name + '</h3>'+
                       '<p><span class="glyphicon glyphicon-time"></span> '
                       + classes + '</p>'+
                       '<p><span class="glyphicon glyphicon-user"></span> '
                       + section + '</p>'+
                       '<p><span class="glyphicon glyphicon-user"></span> '
                       + roll + '</p>'+
                       '<a href="#" onclick="setStatusClosed(\''+name+'\')" class="btn btn-warning">Close</a> '+
                       '<a href="#" onclick="deleteDetails(\''+name+'\')" class="btn btn-danger">Delete</a>'+
                       '</div>';

  }
} 