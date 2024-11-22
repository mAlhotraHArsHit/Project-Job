const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.SENDERID,
    appId: process.env.APPID
  };

  // Initialize Firebase
  const app=initializeApp(firebaseConfig);
  const auth=firebase.auth()
  const database=firebase.database()

//set up our register function


function register(){
    // get all input fields
    email=document.getElementById('email').value
    username=document.getElementById('username').value
    password=document.getElementById('password').value
    confirm=document.getElementById('confirm').value

    if(validate_email(email)==false || validate_password(password)==false){
        alert('Email or password out of bounds')
        return 
    }
    if(validate_confirm(password,confirm)==false){
        alert('Passwords do not match')
        return 
    }

    if(validate_field(username)==false){
        alert('Username out of bounds')
        return 
    }

    auth.createUserWithEmailAndPassword(email,password)
    .then(function(){
        var user=auth.currentUser
        var database_ref=database.ref()

        var user_data={
            email:email,
            username:username,
            password:password,
            last_login:Date.now()
        }

        database_ref.child('/users' + user.uid ).set(user_data)

        alert('User Created')

    })
    .catch(function(error){
        var error_code=error.code
        var error_message=error.message

        alert(error_message)
    })
}


function login(){
    email=document.getElementById('email').value
    password=document.getElementById('password').value

    if(validate_email(email)==false || validate_password(password)==false){
        alert('Email or password out of bounds')
        return 
    }

    auth.signInWithEmailAndPassword(email,password)
    .then(function(){
        var user=auth.currentUser
        var database_ref=database.ref()

        var user_data={
            last_login:Date.now()
        }

        database_ref.child('/users' + user.uid ).update(user_data)

        alert('User Logged In')
    })
    .catch(function(error){
        var error_code=error.code
        var error_message=error.message

        alert(error_message)
    })
}



function validate_email(email){
    expression=/^[^@]+@\w+(\.\w+)+\w$/
    if(expression.test(email)==true){
        return true;
    }
    else{
        return false;
    }
}

function validate_password(password){
    if(password<6){
        return false;
    }
    else{
        return true;
    }
}

function validate_confirm(password,confirm){
    if(password==confirm){
        return true
    }
    else{
        return false;
    }
}

function validate_field(field){
    if(field==null){
        return false;
    }
    if(field.length<=0){
        return false
    }
    else{
        return true;
    }
}
