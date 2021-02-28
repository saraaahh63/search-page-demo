/*
function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

*/
var checked_in, checked_out; 
var submit_in = document.getElementById("btn_ch");
if (submit_in){
  submit_in.addEventListener("click", function() {
    checked_in= getCheckBoxValues(".in");
    localStorage.setItem("checked_in",checked_in);
    console.log(checked_in);
  });
}

var submit_out = document.getElementById("btn_out");
if (submit_in){
  submit_out.addEventListener("click", function() {
   checked_out = getCheckBoxValues(".out");
    console.log(checked_out);
  });
}


function export2txt(originalData) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(originalData, null, 2)], {
    type: "text/plain"
  }));
  a.setAttribute("download", "data.json");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
function makeVisible()
 {
  checker('id_ch','id');
  checker('year_ch','year');
  checker('dir_ch','dir');
  checker('nation_ch','nation');
  checker('first_name_ch','fname');
  checker('last_name_ch','lname');
  checker('address_ch','address');
  
 }
 function checker(check,input){
  if(document.getElementById(check).checked){
    document.getElementById(input).style.visibility = 'visible';
}
else
{
    document.getElementById(input).style.visibility = 'hidden';
}
}
function getCheckBoxValues(target){
  console.log("inside getCheckBoxValues");
  var checkboxes = document.querySelectorAll(target);
  var checked = [];
  for (var i = 0; i < checkboxes.length; i++) {
    var checkbox = checkboxes[i];
    if (checkbox.checked) checked.push(checkbox.value);
  }
  return checked;
}

//var appD=   (document.getElementById("app")).value;

            function waitForCondition() {
  return new Promise(resolve => {
    
    function checkFlag() {
      if (appD!=null) {
        console.log('met');
        resolve();
      } else {
        window.setTimeout(checkFlag, 30000); 
      }
    }
    checkFlag();
  });
}

async function run() {
  console.log('before');
  await waitForCondition()
  console.log('after');
}


function testGS(){
  document.getElementById("announce").textContent= "Data is loading ^_^";

    const url="https://script.google.com/macros/s/AKfycbyVJ1atQPDr7J_SmlrveoZsI0nqXtxVnThOjrx165pUh-rnif9BablI/exec";
    fetch(url).then(d => d.json())
    .then(d => {
      var allData=d[0].data;
      console.log(checked_in);
      //var par = (document.getElementById("par")).value;
      var year=(document.getElementById("year")).value;
      var id=(document.getElementById("id")).value;
      var nation=(document.getElementById("nation")).value;
      var fname=(document.getElementById("fname")).value;
      //var lname=(document.getElementById("lname")).value;
      var address=(document.getElementById("address")).value;
      var data={"YR":0,"ID":0,"NATION":0,"FNAME":0,"ADDR":0};
      correctData=allData.filter(function (person) { return person.YR == year && person.NATIONALITY ==nation});

      if (checked_in.includes("YR")) data["YR"]=1;
      if (checked_in.includes("ID")) data["ID"]=1;
      if (checked_in.includes("NATION")) data["NATION"]=1;
      if (checked_in.includes("FNAME")) data["FNAME"]=1;
      if (checked_in.includes("ADDRESS")) data["ADDRESS"]=1;
      
      console.log(checked_in);

      /*
      //document.getElementById("parText").textContent= par;
      var correctData;
      if (par=="ALL"){
        console.log("all");
        correctData=d;
      }
      if (par=="YR"){
        console.log("year");
        correctData=allData.filter(function (person) { return person.YR == year });
      }
      if (par=="ID"){
        console.log("id");
        correctData=allData.filter(function (person) { return person.ID == id });
      }
      if (par=="NATION"){
        console.log("nation");
        correctData=allData.filter(function (person) { return person.NATIONALITY== nation });
      }
      if (par=="NAME"){
        console.log("name");
        correctData=allData.filter(function (person) { return person.NAME == name });
      }
      if (par=="ADDRESS"){
        console.log("address");
        correctData=allData.filter(function (person) { return person.ADDY == address });
      }
      
*/
      //console.log(allData.filter(function (person) { return person.parameter == "1920" }));
      var jsonOut = JSON.stringify(correctData);

      console.log(correctData);

      //export2txt(correctData);
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonOut);
      var dlAnchorElem = document.getElementById('downloadAnchorElem');
      dlAnchorElem.setAttribute("href",     dataStr     );
      dlAnchorElem.setAttribute("download", "out.json");
      dlAnchorElem.click();
      document.getElementById("app").textContent= jsonOut;
      //run();
      document.getElementById("announce").textContent= "Data is ready ^_^";
      document.getElementById("results_btn").style.visibility = 'visible';


      localStorage.setItem("output",jsonOut);
      localStorage.setItem("year",year);
    });
    
    //console.log(d);
    //fetch first name
    //fetch last name

}

function addGS(){
    const url="https://script.google.com/macros/s/AKfycbyVJ1atQPDr7J_SmlrveoZsI0nqXtxVnThOjrx165pUh-rnif9BablI/exec";
    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({name:"Olivia"}) // body data type must match "Content-Type" header
      });
}
function clear(){
  document.getElementById("app").textContent= "";
}

document.getElementById("btn2").addEventListener("click",addGS);
document.getElementById("btn").addEventListener("click",testGS);
document.getElementById("btn3").addEventListener("click",clear);
