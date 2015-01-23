
//div change color with the press of Start/Stop button
var STOP = 0;
var START = 1;
var  status =  STOP;
var currentlyDrewField;
var polygons = [];
var cur_field = {};
var map;
var cur_source;
var latlng;
var cur_path = [];
 
var samplePoly = new google.maps.Polygon({
    paths: [
    	new google.maps.LatLng(41.09885910447265 , -86.64110183715822),
   		new google.maps.LatLng(41.09892378442908 , -86.62221908569336),
   		new google.maps.LatLng( 41.08449857758279 , -86.62213325500488),
   		new google.maps.LatLng(41.08449857758279 , -86.6411018371582)],
	   	fillColor: 'green',
		strokeColor: 'yellow',
		strokeOpacity: 0.7,
		strokeWeight: 4,
		fillOpacity: 0.35,
		visible: true			
});
fields = [{name :"Back 40", unit: "1000gal/ac", rate: "7", area: "9000" , polygon: samplePoly}];


function postPath(){
cur_record.path = cur_path;
console.log(cur_path);
clearInterval(pathTimer);
}


// shows and hides unloading operation buttons
function startDiv(){
document.getElementById("unloading").style.display = 'none';
document.getElementById("notUnloading").style.display = 'block';
//hideUnload.style.backgroundColor = '	#CC0000';
}
startDiv();
function unloadingDiv(){
document.getElementById("unloading").style.display = 'block';
document.getElementById("notUnloading").style.display = 'none';
//hideUnload.style.backgroundColor = '#009900';
}
startDiv();
//Add back button to each header
$(document).on("mobileinit", function() {
	$.mobile.page.options.addBackBtn = true;
	});

	function altRows(recordTable){
	if(document.getElementsByTagName){  
		
		var table = document.getElementById('recordTable');  
		var rows = table.getElementsByTagName("tr"); 
		 
		for(i = 0; i < rows.length; i++){          
			if(i % 2 == 0){
				rows[i].className = "evenrowcolor";
			}else{
				rows[i].className = "oddrowcolor";
			}      
		}
	}
}

window.onload=function(){
	altRows('recordTable');
}
	
function recordPath() {
    var geolocation = navigator.geolocation.watchPosition( 
    	
        function ( position) {
		cur_path.push(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
       	travelSpeed = position.coords.speed*2.2369;
		document.getElementById('cur_speed').innerHTML = '<strong>'+travelSpeed +' (MPH)</strong>';
		console.log(travelSpeed);
        },
        function () { /*error*/ }, {
            maximumAge: 250, // 2.5 seconds
            enableHighAccuracy: true
 			 
        }

	);
	

    window.setTimeout( function () {
           navigator.geolocation.clearWatch( geolocation ) 
        }, 
        3500 //stop checking after 3.5 seconds
    );
};

var pathTimer = window.setInterval( function () {
        recordPath();
    }, 
    10000 //check every 10 seconds
);	
	

	//Map
function createMap(){
    var defaultLatLng = new google.maps.LatLng(40.4240,-86.9290);  // Default to Purdue Universitywhen no geolocation support
    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
        function fail(error) {
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }
    function drawMap() {
        var myOptions = {
            zoom: 16,
            center: cur_path[0],
            mapTypeId: google.maps.MapTypeId.SATELLITE
			};

        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
		
		var latLngBounds = new google.maps.LatLngBounds();
          for(var i = 0; i < cur_path.length; i++) {
            latLngBounds.extend(cur_path[i]);
            // Place the marker
            new google.maps.Marker({
              map: map,
              position: cur_path[i],
              title: "Point " + (i + 1)
            });
          }
          // Creates the polyline object
          var polyline = new google.maps.Polyline({
            map: map,
            path: cur_path,
            strokeColor: '#0000FF',
            strokeOpacity: 0.7,
            strokeWeight: 3
          });
        map.fitBounds(latLngBounds);      
		map.setTilt(0);
	}	
	if(retrievedRecords != null){
		fields = retrievedRecords;
	}else{
		for(var i=0; i < fields.length; ++i){
			fields[i].polygon.setMap(map);
     	}
	}
}

	

$( document ).on( "pageinit", "#add_field", function() {
	addFieldMap();
});
	
//Add Field Map
function addFieldMap(){
    var defaultLatLng = new google.maps.LatLng(40.4240,-86.9290);  // Default to Purdue University when no geolocation support
    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
        function fail(error) {
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }
    function drawMap(latlng) {
        var myOptions = {
            zoom: 16,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.SATELLITE
        };
		var map = new google.maps.Map(document.getElementById("addFieldMap"), myOptions);
		
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Greetings!"
        });
		google.maps.event.addListenerOnce(map, 'idle', function() {
		google.maps.event.trigger(map, 'resize');
		});
		map = new google.maps.Map($('#addFieldMap') [0], myOptions);
		var dm = new google.maps.drawing.DrawingManager({
			drawingMode: google.maps.drawing.OverlayType.POLYGON,
			drawingControl: false,
			map: map,
			polygonOptions: {
			editable: true,
			fillColor: 'green',
			strokeColor: 'yellow',
			strokeWeight: 4
			}
		});
		map.setTilt(0);
		dm.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);	
		google.maps.event.addListener(dm, 'polygoncomplete', function(polygon) {
			dm.setDrawingMode(null);
			cur_field = polygon;
			
			var fArea = google.maps.geometry.spherical.computeArea(polygon.getPath());

			areaAc = fArea * 0.000247105;
			areaAcres = areaAc.toFixed(2)
			$('#deleteField').on('click', function() {
			deleteMarkers();
			});
			function deleteMarkers () {
			polygon.setPath([]);
			}	
		});
		for(vari=0; i< records.length; ++I){
			records[i].path.setMap(map);
			}
			
		for(var i=0; i < fields.length; ++i){
				fields[i].polygon.setMap(map);
		}
	}
}

$("#addNewField").click(function(){
	addFieldMap();
});


	// If field name is empty reminds enter field name
$('#saveField').click(function () {
    if ($('#fieldName').val().length == '') {
    	alert('Please add field name.');
	}else if($('#rateUnit').val() ==""){
		alert('Please select desired rate.');
	}else if($('#rateValue').val().length == ''){
		alert('Please select desired rate.');
	}else{
		saveField();
	}	
		$("#fieldName").val("");
		$("#rateValue").val("");
		console.log(areaAcres);
    });

	// Save Field name and Polygon to array 
function saveField(){
	var tIName = $("#fieldName").val();
	for(var i = 0; i < fields.length; i++) {
		if(fields[i].name == tIName) {
			alert("Name Already Saved");
			return true;			
		}
	}
	
	var field = {name: tIName, unit: "", rate: "", area: "" , polygon: cur_field}; 
	field.unit = $("#rateUnit").val();
	field.rate = $("#rateValue").val();
	field.area = areaAcres;
	
	fields.push(field);
	addFieldMap();
	window.location.href = "#field-list";
	fieldsTableFunc();
	fieldTableClickListener();
}

function addFieldRerun(){
	addFieldMap();
}

// Saves and pushes source information to array
function saveSource(){
	cur_source = { name: $("#sourceName").val(), nutrientUnit: $("#sourceUnit").val(), N:$("#nUnits").val(), P: $("#pUnits").val(), K: $("#kUnits").val()}; 
	sources.push(cur_source);
	console.log(retrievedSources);
	sourceTableFunc();
	sourceTableClickListener();
	$('#sourceName').val("");
	$('#sourceUnit').val("");
	$('#nUnits').val("");
	$('#kUnits').val("");
	$('#pUnits').val("");
	// $( "#add_source" ).collapsible( "option", "collapsed", true );
	
	
	if(retrievedSources == null){
			window.localStorage.setItem('retrievedSources', JSON.stringify(sources));
			console.log(sources);
	}else{  
			retrievedSources.push(cur_source);
			window.localStorage.setItem('retrievedSources', JSON.stringify(retrievedSources));
			console.log('what it is.')
	}

	
	
	//Changes rate label to display selected unit of measure
		$(document).ready(
			function() {
				$("select[id = rateUnit").change(
				function(){
				var newText = $('option:selected',this).text();
				$("label[for = number]").text(newText);
				newText.bold();
				});
			});
  }
  
  function calculateSpeed(){
  
			var  rtSelect = cur_field.unit;
				if(rtSelect =='gal/ac'){
				var rate =  cur_field.rate;
				var width = cur_spreader.width;
				d = 43560/ width;
				outPut = 4800/7;
				x = 0.0113636364;	// 1 ft/min MPH
				s = (d/(rate/outPut))*x;	
				document.getElementById('speedReturn').innerHTML = '<strong>'+s.toFixed(1) +' (MPH)</strong>';
	
			}else if (rtSelect == '1000gal/ac') {
				var rate = 1000 * cur_field.rate;
				var width = cur_spreader.width;
				d = 43560/ width;
				outPut = 4800/7;
				x = 0.0113636364;	// 1 ft/min MPH
				s = (d/(rate/outPut))*x;	
				document.getElementById('speedReturn').innerHTML = '<strong>'+s.toFixed(1) +' (MPH)</strong>';
	 
			} else if (rtSelect == 'tons/ac') {
				console.log(rtSelect);
				var rate = cur_field.rate;
				var width = cur_spreader.width;
				d = 43560/ width;
				outPut = 15/7;
				x = 0.0113636364; //1 ft/ min to MPH
				s = (d/(rate/outPut))*x;
				console.log(s);
			document.getElementById('speedReturn').innerHTML ='<strong>'+s.toFixed(1) +' (MPH)</strong>';
			}
			
	}

