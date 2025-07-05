function GetContactUsMsgs(){
    var n= document.getElementById("name").value;
    var e= document.getElementById("email").value;
    var p = document.getElementById("phone").value;
    var m= document.getElementById("msg").value;
    var msgs = "Name: " + n + "\n" +
               "Email: " + e + "\n" +
               "Phone: " + p + "\n" +
               "Message: " + m;
    console.log(msgs);
}
function ClearContactUsMsgs(){
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("msg").value = "";
    console.log("Contact Us form cleared.");
}
function saveContactUsMsg() {
    var n = document.getElementById("name").value;
    var e = document.getElementById("email").value;
    var p = document.getElementById("phone").value;
    var m = document.getElementById("msg").value;

    if (!n || !p || !e || !m) {
        alert("Please fill in all fields.");
        return;
    }
    const contactData = { n, p, e, m };
    let contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    contacts.push(contactData);
    localStorage.setItem("contacts", JSON.stringify(contacts));

    alert("Message Sent successfully!");
}

function getAllContactUsMsgs() {
    saveContactUsMsg();
    const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    console.log(contacts);
}


