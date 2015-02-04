
var cur_operator;
var newOperator = {};
var operators = ["Matt", "Luke", "Sam", "Ray"];
// var operators = [];
var cur_field;
var cur_source;
var cur_spreader;
var cur_record;
var tableRecord = [];
var spreaders = [       
        {"name":"Kuhn1" , capacity: 12, unit: "Tons" , width: 40, type : "Right Discharge"},
        {"name":"Balzer" , capacity: 4800, unit: "Gallons", width: 50, type : "Right Discharge"}
];
// var spreaders = [];
var fields = [];

var pathTimer;

var sources = [
    {"name":"Pit one", nutrientUnit :"Lbs/1000Gallon", N: 20, P : 22, K: 13},
    {"name": "Pit two", nutrientUnit :"Lbs/Ton", N:18, P:26, K: 26}
]; 

// var sources = [];

var records = [];

function lStorage(){
    if(retrievedRecords = null) {
        window.localStorage.setItem('records', JSON.stringify(records));
        var retrievedObject = window.localStorage.getItem('records');
        retrievedRecords = JSON.parse(retrievedObject);
        console.log(retrievedRecords);
    }else{
        retrievedObject = window.localStorage.getItem('retrievedRecords');
        retrievedRecords = JSON.parse(retrievedObject);
        console.log(retrievedRecords);
        recordTableFunc();
    }
}
lStorage();
console.log(fields);
console.log(spreaders)

// Local storage for operators.
function opStored(){
    if(retrievedOp = null){
    window.localStorage.setItem('operators',JSON.stringify(operators));
    retrievedOpObject = window.localStorage.getItem('operators');
    retrievedOp = JSON.parse(retrievedOpObject);
    
    }else{
    retrievedOpObject = window.localStorage.getItem('retrievedOp');
    retrievedOp = JSON.parse(retrievedOpObject);
    }
}
opStored();

// Local Storage for spreaders
function  sourceStored(){
    if(retrievedSources = null){
    window.localStorage.setItem('sources',JSON.stringify(sources));
    retrievedSourceObject = window.localStorage.getItem('sources');
    retrievedSources = JSON.parse(retrievedSourceObject);
    
    }else{
    retrievedSourceObject = window.localStorage.getItem('retrievedSources');
    retrievedSources = JSON.parse(retrievedSourceObject);
    sourceTableFunc;
    
    }
}
sourceStored();

retrievedSpreaders = [];
function spreaderStored(){
    if(retrievedSpreaders == null){
    window.localStorage.setItem('spreaders',JSON.stringify(spreaders));
    retrievedSpreaderObject = window.localStorage.getItem('spreaders');
    retrievedSpreaders = JSON.parse(retrievedSpreaderObject);
    console.log(retrievedSpreaders);
    }else{
    retrievedSpreaderObject = window.localStorage.getItem('retrievedSpreaders');
    retrievedSpreaders = JSON.parse(retrievedSpreaderObject);
    }
}
spreaderStored();

$(document).ready(function(){
fieldsStored();
});

function fieldsStored(){
    if(retrievedFields == null){
    window.localStorage.setItem('fields',JSON.stringify(fields));
    retrievedFieldsObject = window.localStorage.getItem('fields');
    retrievedFields = JSON.parse(retrievedFieldsObject);
	console.log("fieldStored rf is null")
    }else{
    retrievedFieldsObject = window.localStorage.getItem('retrievedFields');
    retrievedFields = JSON.parse(retrievedFieldsObject);
    console.log('fieldStored - rf is not null');
    }
}
fieldsStored();

function saveField(){
    console.log(fields);
	var field = { name: $("#fieldName").val(), unit: $("#rateUnit").val(), rate: $("#rateValue").val(), area: areaAcres, polygon: encodePGon }; 
	if(fields == null){
		fields = [field];
		console.log('fields = field');
		window.localStorage.setItem('retrievedFields', JSON.stringify(fields));
	}else{
		fields.push(field);
		window.localStorage.setItem('retrievedFields', JSON.stringify(fields));
		field = {};
	}
	
	console.log(fields);
	console.log(retrievedFields);
	fieldsTableFunc();
	fieldTableClickListener();
	addFieldMap();
	fieldsStored(); 
	field = {};
	window.location.href = "#field-list";
}


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

function spreaderTableFunc (){
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
if(retrievedSpreaders != null){
    spreaders = retrievedSpreaders;
    }
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
	var a  = {"name": $("#spName").val(), "capacity": $("#spCapacity").val(), "unit": $("#spUnit").val(), "width": $("#spWidth").val(), "type": $("#spType").val() };

    // $( "#add-spreader" ).collapsible( "option", "collapsed", true );
	if(retrievedSpreaders == null){
		spreaders.push(a);
		window.localStorage.setItem('retrievedSpreaders', JSON.stringify(spreaders));
		console.log(spreaders);
	}else{  
		retrievedSpreaders.push(a);
		window.localStorage.setItem('retrievedSpreaders', JSON.stringify(retrievedSpreaders));
		console.log('what it is.')
	}	
	 spreaderTableFunc();
    spTableClickListener();
	spreaderStored();
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
// spreader table click listener and highlights last selected spreader.
function spTableClickListener(){
    if(retrievedRecords != undefined){
        last_element = retrievedRecords[retrievedRecords.length - 1];
        $('spTable, td').filter(function(){
            return $(this).text() == last_element.cSpred.name;
        }).parent('spTable, tr').toggleClass('highlighted');
           var cur_spreader_name = $("#spTable tr.highlighted td")[0].innerHTML;
            for(i =0; i< spreaders.length; i++)
                if (spreaders[i].name === cur_spreader_name){
                    cur_spreader = spreaders[i];
                    break;
                }
                $("#spreaderBtn").text("Spreader : " + cur_spreader.name);
            console.log(cur_spreader);

        $('#spTable').find('tr').click(function(){
            $(this).siblings().removeClass("highlighted");
            $(this).toggleClass("highlighted");
           var cur_spreader_name = $("#spTable tr.highlighted td")[0].innerHTML;
            for(i =0; i< spreaders.length; i++)
                if (spreaders[i].name === cur_spreader_name){
                    cur_spreader = spreaders[i];
                    break;
                }
                $("#spreaderBtn").text("Spreader : " + cur_spreader.name);
            console.log(spreaders[i]);
            });
            
    }else{
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
    calculateSpeed();
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
    if(retrievedSources !== null){
    sources= retrievedSources;
    }
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

var cur_record = {"date": "", "Time": "","field": "", "operator": "", "cSpred": "", "cSource": "","path":{}, "fillLevel": ""}


function startUnload(){
console.log(cur_field);
console.log(cur_spreader);
	if(cur_spreader == undefined){
		alert('Please select a spreader');
	}else if(JSON.stringify(cur_field).length == 2 ){
		alert('Please select a field');
	}else if(cur_source == undefined){
		alert('Please select a source');
	}else if(cur_operator == undefined){
		alert('Please select an operator');
	}else{	
		recordPath();
		unloadingDiv()
		getDateTime();
		cur_record.cSpred = cur_spreader;
		cur_record.cSource = cur_source;
		cur_record.date = spreadDate;
		cur_record.Time = spreadTime;
		cur_record.field = cur_field;
		cur_record.operator = cur_operator; 
		cur_record.fillLevel = $("#spFill").val();
		timerFunc();
		overlay();
	}
}
    


function loadComplete(){
    postPath();
    records.push(cur_record);
	console.log(records);
    if(retrievedRecords == null){
    window.localStorage.setItem('retrievedRecords', JSON.stringify(records));
    lStorage();
    numberLoadsOnField();
    numberLoadsFromSource();   
    }else{  
    retrievedRecords.push(cur_record);
    window.localStorage.setItem('retrievedRecords', JSON.stringify(retrievedRecords));
    numberLoadsOnField();
    numberLoadsFromSource();
    }
    recordTableFunc();
    cur_record = {};
    // appendSpreadsheet();
    cur_path = [];
    killPathTimer();
    console.log(retrievedRecords);
	console.log(fields);
	console.log(retrievedFields); 
	overlay();
}


function sourceTableClickListener(){
    if(retrievedRecords != undefined){
        last_element = retrievedRecords[retrievedRecords.length - 1];
        $('sourceTable, td').filter(function(){
        return $(this).text() == last_element.cSource.name;
        }).parent('sourceTable, tr').toggleClass('highlighted');
        var cur_source_name = $("#sourceTable tr.highlighted td")[0].innerHTML;
        for(i =0; i< sources.length; i++)
            if (sources[i].name === cur_source_name){
                cur_source = sources[i];
                break;
            }
            $("#sourceBtn").text("Source : " +cur_source.name);
            

    $('#sourceTable').find('tr').click(function(){
        $(this).siblings().removeClass("highlighted");
        $(this).toggleClass("highlighted");
       var cur_source_name = $("#sourceTable tr.highlighted td")[0].innerHTML;
        for(i =0; i< sources.length; i++)
            if (sources[i].name === cur_source_name){
                cur_source = sources[i];
                break;
            }
            $("#sourceBtn").text("Source : " + cur_source.name);
        });
    }else{
     $('#sourceTable').find('tr').click(function(){
        $(this).siblings().removeClass("highlighted");
        $(this).toggleClass("highlighted");

		cur_source_name = $("#sourceTable tr.highlighted td")[0].innerHTML;
			for(i =0; i< sources.length; i++){
				if (sources[i].name === cur_source_name){
					cur_source = sources[i];
                break;
				}
				$("#sourceBtn").text("Source : " +cur_source.name);
			}
		});
    }
	
}

//counts the number of loads from source

$(document).ready(function(){
   numberLoadsFromSource();
});

function numberLoadsFromSource(){
    if(retrievedRecords != null){
        var count = 1;
        var currentSN = $("#sourceTable tr.highlighted td")[0].innerHTML;
            for(i =0; i< retrievedRecords.length; i++){
                if (retrievedRecords[i].cSource.name === currentSN){
                numberOfLoadsS = count++;
                document.getElementById('numberLFS').innerHTML ='<strong>'+numberOfLoadsS+'</strong>';
                }
        }
    }
}

// $(document).ready(function(){
//     var myselect = $("#spFill");
//     myselect[0].selectedIndex = 3;
//     myselect.selectmenu("refresh");
// });


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
    

    bTbl.style.width = '85%';
    bTbl.style.align = 'center';
    bTbl.setAttribute('border','1');
    bTbl.style.marginLeft = '7.5%';
    var tbdy = document.createElement('tbody');

    var tr = document.createElement('tr');
    tr.style.textAlign = 'center'
    
    th = document.createElement('th');
    th.innerHTML = "Date";
    th.width = '10%';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Time";
    th.width = '10%';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Operator";
    th.width = '10%';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Field";
    th.width = '10%';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Source";
    th.width = '10%';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Spreader";
    th.width = '10%';
    tr.appendChild(th);
    
    th = document.createElement('th');
    th.innerHTML = "Amount";
    th.width = '10%';
    tr.appendChild(th);
    tbdy.appendChild(tr);
    
    th = document.createElement('th');
     th.innerHTML = "Load Fill Level";
     th.width = '10%';
     tr.appendChild(th);
    tbdy.appendChild(tr);
    
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
     $('#recordTable').find('tbdy').click(function(){
            $(this).siblings().removeClass("highlighted");
    });
}   

function appendRecordTableRows(){ 

    if(retrievedRecords == null){
        var aName = records;
    }else{
        var aName = retrievedRecords;
    } 
    var recordTab = document.getElementById('recordTable');
    for (var i = 0; i < aName.length; i++) {
     var row = recordTab.insertRow(-1);
      recordTab.style.textAlign = 'center';
     
     var recordDate = row.insertCell(-1);
     recordDate.textAlign = 'right';
     recordDate.appendChild(document.createTextNode(aName[i].date));
     
     var recordTime = row.insertCell(-1);
     recordTime.textAlign = 'center';
     recordTime.appendChild(document.createTextNode(aName[i].Time));

    var recordOp = row.insertCell(-1);
     recordOp.textAlign = 'center';
     recordOp.appendChild(document.createTextNode(aName[i].operator));

     var recordField = row.insertCell(-1);
     recordField.textAlign = 'center';
     recordField.appendChild(document.createTextNode(aName[i].field.name));
     
     var recordSource = row.insertCell(-1);
     recordSource.textAlign = 'center';
     recordSource.appendChild(document.createTextNode(aName[i].cSource.name));
     
     var recordSpreader = row.insertCell(-1);
     recordSpreader.textAlign = 'center';
     recordSpreader.appendChild(document.createTextNode(aName[i].cSpred.name));
     
     var recordAmount = row.insertCell(-1);
     recordAmount.textAlign = 'center';
     recordAmount.appendChild(document.createTextNode(aName[i].cSpred.capacity+"("+ aName[i].cSpred.unit +")" ));
     
     var SpreaderFillLevel = row.insertCell(-1);
     SpreaderFillLevel.textAlign = 'center';
     SpreaderFillLevel.appendChild(document.createTextNode(aName[i].fillLevel));
     

     recordTab.children[0].appendChild(row);
     
     
    }
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
    if(retrievedFields != null){
            fields = retrievedFields;
            console.log(retrievedFields);
        }
    var tableB = document.getElementById('fieldsTable');
    for (var i = 0; i < fields.length; i++) {
     var row = tableB.insertRow(-1);
     tableB.style.textAlign = 'center';
     console.log(fields.length);

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
if(retrievedFields != null){
var fields = retrievedFields;
    if(retrievedRecords != undefined){
         last_element = retrievedRecords[retrievedRecords.length - 1];
            $('fieldsTable, td').filter(function(){
            return $(this).text() == last_element.field.name;
            }).parent('fieldsTable, tr').toggleClass('highlighted');
            var cur_field_name = $("#fieldsTable tr.highlighted td")[0].innerHTML;
                for(i =0; i< fields.length; i++)
                if (fields[i].name === cur_field_name){
                    cur_field = fields[i];
                    break;
                }
                
            $('#fieldsTable').find('tr').click(function(){
                $(this).siblings().removeClass("highlighted");
                $(this).toggleClass("highlighted");
               var cur_field_name = $("#fieldsTable tr.highlighted td")[0].innerHTML;
                for(i =0; i< fields.length; i++)
                    if (fields[i].name === cur_field_name){
                        cur_field = fields[i];
                        break;
                    }
                    $("#fieldBtn").text("Field : " + cur_field.name);
                });
            }else{
             $('#fieldsTable').find('tr').click(function(){
                $(this).siblings().removeClass("highlighted");
                $(this).toggleClass("highlighted");
                cur_field_name = $("#fieldsTable tr.highlighted td")[0].innerHTML;
                
                for(i =0; i< fields.length; i++){
                    if (fields[i].name === cur_field_name){
                        cur_field = fields[i];
                        break;
                    }
                    	$("#fieldBtn").text("Field : " + cur_field.name);
				}
           });
		} 
    }
    calculateSpeed();  
}

// Counts number of loads spread on field
$(document).ready(function(){
    numberLoadsOnField();
});

function numberLoadsOnField(){
    if(retrievedRecords != null){
    var count = 1;
    var currentFN= $("#fieldsTable tr.highlighted td")[0].innerHTML;
        for(i =0; i< retrievedRecords.length; i++){
            if (retrievedRecords[i].field.name === currentFN){
                numberOfLoadsF = count++;
                document.getElementById('numberLonF').innerHTML ='<strong>'+numberOfLoadsF+'</strong>';
            }
        }
    }
}

// var count = 0;
// for(var i = 0; i < array.length; ++i){
//     if(array[i] == 2)
//         count++;
// }




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
	if($("#opName").val().length ==''){
		alert("Please enter operator's name");
    }else{
	var opname = $("#opName").val();
	newOperator = opname;
	
	if(retrievedOp == null){
		operators.push(newOperator);
		window.localStorage.setItem('retrievedOp', JSON.stringify(operators));
		console.log("Saying it's null");   
    }else{  
		retrievedOp.push(newOperator)
		window.localStorage.setItem('retrievedOp', JSON.stringify(retrievedOp));
		console.log("it exists");
    }
	
	console.log(operators);
	operatorsTableFunc();
	$("#opName").val('');
	// $("#add_operator").trigger( "collapse");
	opTableClickListener(); 
	opStored(); 
	}
}


function cancelOperator(){
    $("#opName").val("");
    $("#add_operator").collapsible("collapse");
}


function appendOpTableRows(){ 
if(retrievedOp !== null){
    operators= retrievedOp;
        
    } 
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


$(document).ready(function(){
   opTableClickListener();
});


function opTableClickListener(){
    if(retrievedRecords != undefined){
         last_element = retrievedRecords[retrievedRecords.length - 1];
            $('operator_table, td').filter(function(){
            return $(this).text() == last_element.operator;
            }).parent('operator_table, tr').toggleClass('highlighted');
            var cur_op_name = $("#operator_table tr.highlighted td")[0].innerHTML;
                for(i =0; i< operators.length; i++)
                if (operators[i] === cur_op_name){
                    cur_operator = operators[i];
                    break;
                }
                $("#operatorBtn").text("Operator : " + cur_operator);

        $('#operator_table').find('tr').click(function(){
            $(this).siblings().removeClass("highlighted");
            $(this).toggleClass("highlighted");
           var cur_op_name = $("#operator_table tr.highlighted td")[0].innerHTML;
            for(i =0; i< operators.length; i++)
                if (operators[i] === cur_op_name){
                    cur_operator = operators[i];
                    break;
                }
                $("#operatorBtn").text("Operator : " + cur_operator);
            });
                calculateSpeed();
    }else{      
     $('#operator_table').find('tr').click(function(){
        $(this).siblings().removeClass("highlighted");
        $(this).toggleClass("highlighted");

        cur_op_name = $("#operator_table tr.highlighted td")[0].innerHTML;
			for(i =0; i< operators.length; i++){
				if (operators[i] === cur_op_name){
					cur_operator = operators[i];
					break;
				}
				 $("#operatorBtn").text("Operator : " +cur_operator);
			}	  
        });
    }
	
}    


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

    // var coordinates = []; Saving this for later

// for(var i = 0 ; i < polygonBounds.length ; i++)
// {
//     coordinates.push(polygonBounds.getAt(i).lat(), polygonBounds.getAt(i).lng());
// } 
