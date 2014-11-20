
var cur_operator;
var newOperator = {};
var operators = ["Matt", "Luke", "Sam", "Ray"];
var cur_field;
var cur_source;
var cur_spreader;
var cur_record;
var tableRecord = [];
var spreaders = [       
        {"name":"Kuhn1" , capacity: 12, unit: "Tons" , width: 40, type : "Right Discharge"},
        {"name":"Balzer" , capacity: 4800, unit: "Gallons", width: 50, type : "Right Discharge"}
];


var sources = [
    {"name":"Pit one", nutrientUnit :"Lbs/1000Gallon", N: 20, P : 22, K: 13},
    {"name": "Pit two", nutrientUnit :"Lbs/Ton", N:18, P:26, K: 26}
]; 

var records = [];

function createSpreaderTable() {
    var cols = "4";
    var spBody = document.getElementById('spTable');
    
    var bTbl = document.createElement('table');

    bTbl.style.width = '100%';
	bTbl.style.align = 'center';
    bTbl.setAttribute('border','1');
    bTbl.fontsize ='13px';
    var tbdy = document.createElement('tbody');

    var tr = document.createElement('tr');
    tr.style.textAlign = 'center'
	
	th = document.createElement('th');
    th.innerHTML = "Name";
    th.width = '16.6%';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Capacity";
    th.width = '16.6%';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Unit";
    th.width = '16.6%';
    tr.appendChild(th);

	th = document.createElement('th');
    th.innerHTML = "Width (ft)";
    th.width = '16.6%';
    tr.appendChild(th);
	
	th = document.createElement('th');
    th.innerHTML = "Spreader Type";
    th.width = '16.6%';
    tr.appendChild(th);
    tbdy.appendChild(tr);
	
	/*th = document.createElement('th');
    th.innerHTML = "Delete";
    th.width = '16.6%';
    tr.appendChild(th);
    tbdy.appendChild(tr);
	*/

    gHeaderCreated = true;

    bTbl.appendChild(tbdy);
    spBody.appendChild(bTbl);

    $("#spTable").append($(bTbl));
}	
createSpreaderTable();

function tableFunc (){
    if(document.getElementById('spTable') == null){
        appendTableRows();
    }else{
        var Table = document.getElementById('spTable');
        Table.innerHTML = ""
        createSpreaderTable();
        appendTableRows();
        clearSpText();
    }
}    


function appendTableRows(){ 
    var tableB = document.getElementById('spTable');
    for (var i = 0; i < spreaders.length; i++) {
     var row = tableB.insertRow(-1);
     tableB.style.textAlign = 'center';
     
     var spName = row.insertCell(-1);
     spName.textAlign = 'center';
     spName.appendChild(document.createTextNode(spreaders[i].name));
     
     var spCapacity = row.insertCell(-1);
     spCapacity.textAlign = 'center';
     spCapacity.appendChild(document.createTextNode(spreaders[i].capacity));
     
     var spUnit = row.insertCell(-1);
     spUnit.textAlign = 'center';
     spUnit.appendChild(document.createTextNode(spreaders[i].unit));
     
     var spWidth = row.insertCell(-1);
     spWidth.textAlign = 'center';
     spWidth.appendChild(document.createTextNode(spreaders[i].width));
     
     var spType = row.insertCell(-1);
     spType.textAlign = 'center';
     spType.appendChild(document.createTextNode(spreaders[i].type));
     
     /*var spDel = row.insertCell(-1);
     spDel.textAlign = 'center';
     spDel.innerHTML = '<button id="deleteRow">Delete</button>';
     row.appendChild(spDel);
     */

     tableB.children[0].appendChild(row);
    }
}
appendTableRows();

function saveSpreader(){
    pushArray();
    tableFunc();
    spTableClickListener();
    $( "#add-spreader" ).collapsible( "option", "collapsed", true );

}

function pushArray (){
var a  = {"name": $("#spName").val(), "capacity": $("#spCapacity").val(), "unit": $("#spUnit").val(), "width": $("#spWidth").val(), "type": $("#spType").val() };
spreaders.push(a);
}

function clearSpText(){
	$('#spName').val("");
	$('#spCapacity').val("");
	$('#spUnit').val("");
	$('#spWidth').val("");
	$('#spType').val("");
    $('#unloadTime').val("");
}

$(document).ready(function(){
   spTableClickListener();

});

function spTableClickListener(){
     $('#spTable').find('tr').click(function(){
        $(this).siblings().removeClass("highlighted");
        $(this).toggleClass("highlighted");
       var cur_spreader_name = $("#spTable tr.highlighted td")[0].innerHTML;
        for(i =0; i< spreaders.length; i++)
            if (spreaders[i].name === cur_spreader_name){
                cur_spreader = spreaders[i];
                break;
            }
			$("#spreaderBtn").text(cur_spreader.name);
        console.log(spreaders[i]);

    });
}

/*Creates Source Table*/
function createSourceTable() {
    var cols = "4";
    var soBody = document.getElementById('sourceTable');
    
    var bTbl = document.createElement('table');
    

    bTbl.style.width = '90%';
    bTbl.style.align = 'center';
    bTbl.setAttribute('border','1');
    bTbl.style.marginLeft = '5%';
    var tbdy = document.createElement('tbody');
    tbdy.texAlign="center";
    var tr = document.createElement('tr');
    tr.style.textAlign = 'center'
    
    th = document.createElement('th');
    th.innerHTML = "Name";
    th.width = '16.6%';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Unit";
    th.width = '16.6%';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "N";
    th.width = '16.6%';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "P";
    th.width = '16.6%';
    tr.appendChild(th);
    
    th = document.createElement('th');
    th.innerHTML = "K";
    th.width = '16.6%';
    tr.appendChild(th);
    tbdy.appendChild(tr);
    
    /*th = document.createElement('th');
    th.innerHTML = "Delete";
    th.width = '16.6%';
    tr.appendChild(th);
    tbdy.appendChild(tr);
    */
    gHeaderCreated = true;

    bTbl.appendChild(tbdy);
    soBody.appendChild(bTbl);

    $("#sourceTable").append($(bTbl));
}   
createSourceTable();

function sourceTableFunc() {
    if(document.getElementById('sourceTable') == null) {
        appendSourceTableRows();
    }else{
        var Table = document.getElementById('sourceTable');
        Table.innerHTML = ""
        createSourceTable();
        appendSourceTableRows();
        clearSpText();
    }
}    


function appendSourceTableRows(){ 
    var tableB = document.getElementById('sourceTable');
    for (var i = 0; i < sources.length; i++) {
     var row = tableB.insertRow(-1);
     tableB.style.textAlign = 'center';
     
     var sourceName = row.insertCell(-1);
     sourceName.textAlign = 'center';
     sourceName.appendChild(document.createTextNode(sources[i].name));
     
     var sourceNutrientUnit = row.insertCell(-1);
     sourceNutrientUnit.textAlign = 'center';
     sourceNutrientUnit.appendChild(document.createTextNode(sources[i].nutrientUnit));
     
     var sourceN = row.insertCell(-1);
     sourceN.textAlign = 'center';
     sourceN.appendChild(document.createTextNode(sources[i].N));
     
     var sourceP = row.insertCell(-1);
     sourceP.textAlign = 'center';
     sourceP.appendChild(document.createTextNode(sources[i].P));
     
     var sourceK = row.insertCell(-1);
     sourceK.textAlign = 'center';
     sourceK.appendChild(document.createTextNode(sources[i].K));
     
     /*var spDel = row.insertCell(-1);
     spDel.textAlign = 'center';
     spDel.innerHTML = '<button id="deleteRow">Delete</button>';
     row.appendChild(spDel);
     */

     tableB.children[0].appendChild(row);
    }
}
appendSourceTableRows();

$(document).ready(function(){
   sourceTableClickListener();
});

var cur_record = {"date": "", "Time": "","field": "", "operator": "", "cSpred": "", "cSource": "","path":{}}

function sourceTableClickListener(){
     $('#sourceTable').find('tr').click(function(){
        $(this).siblings().removeClass("highlighted");
        $(this).toggleClass("highlighted");

        cur_source_name = $("#sourceTable tr.highlighted td")[0].innerHTML;
        for(i =0; i< sources.length; i++)
            if (sources[i].name === cur_source_name){
                cur_source = sources[i];
                break;
            }
			$("#sourceBtn").text(cur_source.name);
        console.log(sources[i]);
        console.log(cur_source.name);     
    });
}

function startUnload(){
	recordPath();
    unloadingDiv()
    getDateTime();
    cur_record.cSpred = cur_spreader;
    cur_record.cSource = cur_source;
    cur_record.date = spreadDate;
    cur_record.Time = spreadTime;
    cur_record.field = cur_field;
    cur_record.operator = cur_operator; 
    
}

/*Function returning Date and Time*/
function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    spreadDate = year+'/'+month+'/'+day;   
    spreadTime = hour+':'+minute;
}
getDateTime();


function createRecordTable() {
    var cols = "4";
    var reBody = document.getElementById('recordTable');
    
    var bTbl = document.createElement('table');
    

    bTbl.style.width = '90%';
    bTbl.style.align = 'center';
    bTbl.setAttribute('border','1');
    bTbl.style.marginLeft = '5%';
    var tbdy = document.createElement('tbody');

    var tr = document.createElement('tr');
    tr.style.textAlign = 'center'
    
    th = document.createElement('th');
    th.innerHTML = "Date";
    th.width = '16.6%';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Time";
    th.width = '16.6%';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Operator";
    th.width = '16.6%';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Field";
    th.width = '16.6%';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Source";
    th.width = '16.6%';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Spreader";
    th.width = '16.6%';
    tr.appendChild(th);
    
    th = document.createElement('th');
    th.innerHTML = "Amount";
    th.width = '16.6%';
    tr.appendChild(th);
    tbdy.appendChild(tr);
    
   /* th = document.createElement('th');
    th.innerHTML = "Delete";
    th.width = '16.6%';
    tr.appendChild(th);
    tbdy.appendChild(tr);*/
    
    gHeaderCreated = true;

    bTbl.appendChild(tbdy);
    reBody.appendChild(bTbl);

    $("#recordTable").append($(bTbl));

} 


function recordTableFunc() {
    if(document.getElementById('recordTable') == null) {
        appendRecordTableRows();
    }else{
        var Table = document.getElementById('recordTable');
        Table.innerHTML = ""
        createRecordTable();
        appendRecordTableRows();
    }
}   

function loadComplete(){
	postPath();
	records.push(cur_record);
    recordTableFunc();
    //appendSpreadsheet();
	// jsonData = JSON.stringify(records);
	// console.log(jsonData);
}

function appendRecordTableRows(){ 
    var tableB = document.getElementById('recordTable');
    for (var i = 0; i < records.length; i++) {
     var row = tableB.insertRow(-1);
      tableB.style.textAlign = 'center';
     
     var recordDate = row.insertCell(-1);
     recordDate.textAlign = 'right';
     recordDate.appendChild(document.createTextNode(records[i].date));
     
     var recordTime = row.insertCell(-1);
     recordTime.textAlign = 'center';
     recordTime.appendChild(document.createTextNode(records[i].Time));

    var recordOp = row.insertCell(-1);
     recordOp.textAlign = 'center';
     recordOp.appendChild(document.createTextNode(records[i].operator));

     var recordField = row.insertCell(-1);
     recordField.textAlign = 'center';
     recordField.appendChild(document.createTextNode(records[i].field.name));
     
     var recordSource = row.insertCell(-1);
     recordSource.textAlign = 'center';
     recordSource.appendChild(document.createTextNode(records[i].cSource.name));
     
     var recordSpreader = row.insertCell(-1);
     recordSpreader.textAlign = 'center';
     recordSpreader.appendChild(document.createTextNode(records[i].cSpred.name));
     
     var recordAmount = row.insertCell(-1);
     recordAmount.textAlign = 'center';
     recordAmount.appendChild(document.createTextNode(records[i].cSpred.capacity+"("+ records[i].cSpred.unit +")" ));
     
     /*var spDel = row.insertCell(-1);
     spDel.textAlign = 'center';
     spDel.innerHTML = '<button id="deleteRow">Delete</button>';
     row.appendChild(spDel);
     */

     tableB.children[0].appendChild(row);
	 
	 
    }
	// var tRec = {"date": records[i].date, "Time": records[i].Time,"field":  "", "operator": records[i].operator, "cSpred": records[i].cSpred.name, "cSource": records[i].cSource.name}
	// tableRecord.push(tRec);
	// console.log(tableRecord);
}

/*Creates Field Table*/
function createFieldsTable() {
    var cols = "4";
    var fBody = document.getElementById('fieldsTable');
    
    var bTbl = document.createElement('table');
    

    bTbl.style.width = '90%';
    bTbl.style.align = 'center';
    bTbl.setAttribute('border','1');
    bTbl.style.marginLeft = '5%';
    bTbl.fontsize ='13px';
    var tbdy = document.createElement('tbody');
    tbdy.texAlign="center";
    var tr = document.createElement('tr');
    tr.style.textAlign = 'center'
    
    th = document.createElement('th');
    th.innerHTML = "Name";
    th.width = '16.6%';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Unit";
    th.width = '16.6%';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Rate";
    th.width = '16.6%';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Area";
    th.width = '16.6%';
    tr.appendChild(th);
    tbdy.appendChild(tr);
    
    /*th = document.createElement('th');
    th.innerHTML = "Delete";
    th.width = '16.6%';
    tr.appendChild(th);
    tbdy.appendChild(tr);
    */

    bTbl.appendChild(tbdy);
    fBody.appendChild(bTbl);

    $("#fieldsTable").append($(bTbl));
}   
createFieldsTable();

function fieldsTableFunc() {
    if(document.getElementById('fieldsTable') == null) {
        appendFieldsTableRows();
    }else{
        var Table = document.getElementById('fieldsTable');
        Table.innerHTML = ""
        createFieldsTable();
        appendFieldsTableRows();
    }
}    

function appendFieldsTableRows(){ 
    var tableB = document.getElementById('fieldsTable');
    for (var i = 0; i < fields.length; i++) {
     var row = tableB.insertRow(-1);
     tableB.style.textAlign = 'center';

     var fieldName = row.insertCell(-1);
     fieldName.textAlign = 'center';
     fieldName.appendChild(document.createTextNode(fields[i].name));
     
     var rateUnit = row.insertCell(-1);
     rateUnit.textAlign = 'center';
     rateUnit.appendChild(document.createTextNode(fields[i].unit));
     
     var rateVal = row.insertCell(-1);
     rateVal.textAlign = 'center';
     rateVal.appendChild(document.createTextNode(fields[i].rate));
     
     var fieldArea = row.insertCell(-1);
     fieldArea.textAlign = 'center';
     fieldArea.appendChild(document.createTextNode(fields[i].area));
    
    tableB.children[0].appendChild(row);
    }
}
appendFieldsTableRows();

$(document).ready(function(){
   fieldTableClickListener();
});


function fieldTableClickListener(){
     $('#fieldsTable').find('tr').click(function(){
        $(this).siblings().removeClass("highlighted");
        $(this).toggleClass("highlighted");

        cur_field_name = $("#fieldsTable tr.highlighted td")[0].innerHTML;
        for(i =0; i< fields.length; i++)
            if (fields[i].name === cur_field_name){
                cur_field = fields[i];
                break;
            }
			$("#fieldBtn").text(cur_field.name);
        console.log(fields[i]);
        console.log(cur_field);
        console.log(records);
        calculateSpeed();     
    });
}

function createOpTable() {
    var cols = "4";
    var fBody = document.getElementById('operator_table');
    
    var bTbl = document.createElement('table');
    

    bTbl.style.width = '40%';
    bTbl.style.align = 'center';
    bTbl.setAttribute('border','1');
    bTbl.style.marginLeft = '5%';
    bTbl.fontsize ='13px';
    var tbdy = document.createElement('tbody');
    tbdy.texAlign="center";
    var tr = document.createElement('tr');
    tr.style.textAlign = 'center'
    

    th = document.createElement('th');
    th.innerHTML = "Operators";
    th.width = '16.6%';
    tr.appendChild(th);
    tbdy.appendChild(tr);
    
    /*th = document.createElement('th');
    th.innerHTML = "Delete";
    th.width = '16.6%';
    tr.appendChild(th);
    tbdy.appendChild(tr);
    */

    bTbl.appendChild(tbdy);
    fBody.appendChild(bTbl);

    $("#opearato_table").append($(bTbl));
}   
createOpTable();


function saveOperator(){
 var opname = $("#opName").val();
 newOperator = opname;
 operators.push(newOperator);
 console.log(operators);
 operatorsTableFunc();
 $("#opName").val('');
 $("#add_operator").collapsible( "option", "collapsed", true );
 OpTableClickListener();   
}

function appendOpTableRows(){ 
    var tableB = document.getElementById('operator_table');
    for (var i = 0; i < operators.length; i++) {
     var row = tableB.insertRow(-1);
     tableB.style.textAlign = 'center';

     var operatorName = row.insertCell(-1);
     operatorName.textAlign = 'center';
     operatorName.appendChild(document.createTextNode(operators[i]));
     
    
    tableB.children[0].appendChild(row);
    }
}
appendOpTableRows();

function OpTableClickListener(){
     $('#operator_table').find('tr').click(function(){
        $(this).siblings().removeClass("highlighted");
        $(this).toggleClass("highlighted");

        cur_op_name = $("#operator_table tr.highlighted td")[0].innerHTML;
        for(i =0; i< operators.length; i++)
            if (operators[i] === cur_op_name){
                cur_operator = operators[i];
                break;
            }
            $("#operatorBtn").text(cur_operator);
        console.log(cur_operator);     
    });
}
OpTableClickListener();

function operatorsTableFunc() {
    if(document.getElementById('operator_table') == null) {
        appendOpTableRows();
    }else{
        var Table = document.getElementById('operator_table');
        Table.innerHTML = ""
        createOpTable();
        appendOpTableRows();
    }
}    
