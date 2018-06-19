
//Firebase events:
// get elements
var uploader = document.getElementById("uploader");
var fileButton = document.getElementById("fileButton");

var uploadsMetadata = { cacheControl: "max-age=" + (60 * 60 * 24 * 365) };



/*listen for file selection. Adding event lisnter*/
fileButton.addEventListener("change", function (e) {

    //get file
    var file = e.target.files[0]; //create storage ref //manage Firebase Storage 
    var storageRef = firebase.storage().ref("medicine/" + file.name);/*firebase.storage.ref("folder_name/file_name")*/ //upload file tofirebase
    var task = storageRef.child(file.name).put(file, uploadsMetadata); //put method upload file to firebase 
    //update progress bar thod allow us to find out state change

    // someAsynchronousThingLikeCallingAWebApi
    // .then(nextThingToDoIfItSuceeded)
    // .then(callSomeOtherApiIfThePreviousSuceeded)
    // .then(nextThing)
    // .catch(oops)

    //firebase snapshot to get image url
    task
        .then(function (snapshot) {
            var imageUrl = snapshot.a.downloadURLs[0];
            //after retrieving url, putting it into customvision ai of microsoft
            $.ajax({
                url: "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/c84c89ea-cb6b-44c2-a381-95a7f6cc80a4/url",
                beforeSend: function (xhrObj) {
                    // Request headers
                    xhrObj.setRequestHeader("Prediction-key", "");
                    xhrObj.setRequestHeader("Content-Type", "application/json");
                    xhrObj.setRequestHeader("Prediction-Key", "6be698b13a364fcfb97fbc3884c9d061");
                },
                type: "POST",
                // Request body
                data: JSON.stringify({ "Url": imageUrl })
            })
                .done(function (data) {
                    // alert("success" + JSON.stringify(data));
                    // console.log(data);

                    // Get what you want from `data`
                    // return it

                    //var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
                    //var med = med.splice(1);

                })
                .then(function (data) {
                    var med = data.predictions;

                    var medname = med[0];
                    console.log(medname)

                    //getting the probability and name together
                    var medID = medname.tagName;
                    console.log(medID);

                    //  console.log(medname.probability);
                    var medprob = medname.probability;
                    console.log(medprob);


                    //return the data back based on mediciens
                    if (medID == "Enalapril maleate") {
                        //testing redirection 
                        window.location.href = "#pagetwo";
                        //.replace / .href try both.

                        (function (medID) {
                            //https://api.fda.gov/drug/label.json?search=%22lisinopril%22&limit=5
                            $.getJSON("https://api.fda.gov/drug/label.json?search=%22Enalapril%20maleate%22&limit=5",
                                function (obj) {


                                    /*var x = obj.results[3];
                                    var y = x.indications_and_usage
                                    console.log(JSON.stringify(y));
                                    */

                                   var x = obj.result[3];
                                   //var description = x.description;
                                    var indications_and_usage = x.indications_and_usage;
                                    var dosage = x.dosage_and_administration_table;
                                    var interaction = x.drug_interaction;

                                    
                                },
                            )

                        }());

                    }
                    else if (medID == "furosemide") // remove furosemide T.T
                    {


                    } else if (medID == "lisinopril") {


                        window.location.href = "#pagefour";
                        //getting information from database api
                        $.getJSON("https://api.fda.gov/drug/label.json?search=" + medID,
                            function (obj) {
                                console.log(JSON.stringify(obj));
                                
                                var x = obj.result[3];
                                var description = x.description;
                                 var indications_and_usage = x.indications_and_usage;
                                 var dosage = x.dosage_and_administration_table;
                                 var interaction = x.drug_interaction;




                            },
                        )
                    }
                    else if (medID == "Losartan") {
                        window.location.href = "#pagefive";
                        (function (medID) {
                            $.getJSON("https://api.fda.gov/drug/label.json?search=%22Enalapril%20maleate%22&limit=5",
                                function (obj) {

                                  
                                    console.log(JSON.stringify(x));
                                    
                                   var x = obj.result[3];
                                   var description = x.description;
                                    var indications_and_usage = x.indications_and_usage;
                                    var dosage = x.dosage_and_administration_table;
                                    var interaction = x.drug_interaction;

                                },
                            )

                        }());


                    }




                })


                .fail(function (error) {
                    // alert("error" + JSON.stringify(error));
                });
        })


    task.on("state_change", //on meploader.value = percentage;

        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage;
        },
        function error(err) { console.log("Upload error", err); },
        function complete() {
            console.log("ok"); var metadata = task.snapshot.metadata;





        })
});

        // Create a reference to the file whose metadata we want to retrieve var forestRef = storageRef.child('images/forest.jpg'); // Get metadata properties
       /* forestRef.getMetadata().then(function (metadata) { // Metadata now contains the metadata for 'images/forest.jpg' }).catch(function(error)
            { // Uh-oh, an error occurred! }); */

            function openNav() {
                document.getElementById("leftsidenav").style.width = "250px";
            }
            
            function closeNav() {
                document.getElementById("leftsidenav").style.width = "0";
            }