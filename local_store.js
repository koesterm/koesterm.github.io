if(retrievedRecords != undefined){
	var last_element = retrievedRecords[retrievedRecords.length - 1];
	console.log(last_element);

}

// function downloadCSVFile(){
	// var csvContent = "data:text/csv;charset=utf-8,";
		// retrievedRecords.forEach(function(infoArray, index){
			// dataString = infoArray.join(",");
			// csvContent += index < infoArray.length ? dataString+ "\n" : dataString;
		// });

		// var encodedUri = encodeURI(csvContent);
		// window.open(encodedUri);
		// console.log("it's trying");
// }
