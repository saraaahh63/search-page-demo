var jsonOut=localStorage.getItem("output");
var jsonArray=JSON.parse(jsonOut);
console.log(jsonArray[0].ID);



function clear(){
    document.getElementById("app").textContent= "";
  }
  
  function table_populate(){
    
      
      
     console.log("entered");
      var table=document.getElementById('table_results');
      if (table != null) console.log("something living");
      var i,j;
      var categ=8; //to be changed based on user
      for (i=0;i<jsonArray.length; i++){
        var table_row = document.createElement('tr');
        var data_row=jsonArray[i];
        var id=data_row.ID;
        var year=data_row.YR;
        var dir=data_row.DIR;
        var address=data_row.ADDY;
        var nation=data_row.NATIONALITY;
        var name=data_row.NAME;
        var data=[id, year, dir, nation, name,"unavailable","unavailable",address ];
        var arr=[];
        for (j=0;j<categ; j++){
          arr[j]=document.createElement('td');
          arr[j].innerHTML=data[j];
          table_row.appendChild(arr[j]);
        }
        table.appendChild(table_row);
      }
    
    }
  
  table_populate();
    var year=localStorage.getItem("year");
    console.log(year);
    //document.getElementById("oo").textContent= jsonOut;