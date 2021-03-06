const firebaseConfig = {
    
};


firebase.initializeApp(firebaseConfig);
firebase.analytics();

//++ グローバル
let db = firebase.database();
let authUid = null;
//--

const addSample = () => { 
    
}

const setSample = () => { 
    
}

const getSample = () => {
    
}

function writeUserData(authId, name) {
    console.log("write: ", name);
    firebase.database().ref('all/users/' + authId).set({
        username: name,
    });
}

firebase.auth().onAuthStateChanged( (user) => {
    if(user) {
        let isAnonymous = user.isAnonymous;
        authUid = user.uid;
        console.log("onAuth", isAnonymous, authUid);
    }
    else {

    }
    
} );

const setUserName = () => { 
    let inputName = document.name_form.name.value;
    writeUserData(authId = authUid, name = inputName);
}


//↑↑↑関数宣言、コールバック登録↑↑↑
//↓↓↓main処理↓↓↓

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function () {
        firebase.auth().signInAnonymously()
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
            });
    })
    .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });



// addSample();
// setSample();
// getSample();


