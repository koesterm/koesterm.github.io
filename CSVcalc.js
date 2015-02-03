
var csvArray = []
var retrievedRecords;
var record;
var data = csvArray;
function parseCSV(){
	var csvArray = []
	console.log(retrievedRecords);
	for (i = 0; i < retrievedRecords.length; i++){
		csvString = [];
		record = retrievedRecords[i];
		console.log(record);
		var csvString = { "Date" : record.date,  "Time" : record.Time, "Operator" : record.operator, "Source Name" : record.cSource.name, "N" : record.cSource.N, "P" : record.cSource.P, "K" : record.cSource.K, 
						"Nutrient Measure" : record.cSource.nutrientUnit, "Spreader" : record.cSpred.name, "Spreader Capacity" : record.cSpred.capacity +'(' + record.cSpred.unit +')', "Load Fill Level" : record.fillLevel,
						"Field" : record.field.name, "Area (acres)" : record.field.area, "Rate" : record.field.rate +'('+ record.field.unit + ')'};
		csvArray.push(csvString);
		console.log(csvArray);
		stCSVArray = JSON.stringify(csvArray);
	}
	JSONToCSVConvertor(stCSVArray, "Manure Record", true);
}

// $(document).ready(function(){
    // $('button').click(function(){
        // var data = $('#txt').val();
        // if(data == '')
            // return;
        
        // JSONToCSVConvertor(data, "Manure Record", true);
    // });
// });

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var csvArray = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in csvArray[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < csvArray.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in csvArray[i]) {
            row += '"' + csvArray[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
