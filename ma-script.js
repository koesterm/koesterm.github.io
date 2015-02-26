
var infowWindow;
var polypoint = [];
var polygons = [];
var cur_field = {};
var map;
var cur_source;
var latlng;
var cur_path = [];
var retrievedRecords = [];
var polyline = [];
 thisOne = [];
var retrievedFields = [];
var myGeolocation;
var length_in_km;
var length_in_ft;
var STOP = 0;
var START = 1;
var  status =  STOP;
var polyLength;
var spreadRate;




 // var samplePoly = new google.maps.Polygon({
     // paths: [
     	// new google.maps.LatLng(41.09885910447265 , -86.64110183715822),
    		// new google.maps.LatLng(41.09892378442908 , -86.62221908569336),
    		// new google.maps.LatLng( 41.08449857758279 , -86.62213325500488),
    		// new google.maps.LatLng(41.08449857758279 , -86.6411018371582)],
 	   	// fillColor: 'green',
 		// strokeColor: 'yellow',
 		// strokeOpacity: 0.7,
 		// strokeWeight: 4,
 		// fillOpacity: 0.35,
 		// visible: true			
// });
 // var fields = [{name :"Back 40", unit: "1000gal/ac", rate: "7", area: "9000" , polygon: samplePoly}];

fields = [];

function postPath(){
cur_record.path = google.maps.geometry.encoding.encodePath(cur_path);
console.log(google.maps.geometry.encoding.decodePath(cur_record.path));
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


function pauseLoad(){
	if (status==STOP){
		status = START; 
	}else {
		status =  STOP;
	}
updateStatus();
console.log("hello")
}

function updateStatus(){
	if(status == START){
		$("#spStatus").text("Paused");
		$("#startStop").text("Start");
		$("#facebookG").hide();
		killPathTimer();
	}else{
		$("#spStatus").text("Spreading");
		$("#startStop").text("Pause");
		$("#facebookG").show();
		 recordPath();
	}
}	

//Add back button to each header
$(document).on("mobileinit", function() {
	$.mobile.page.options.addBackBtn = true;
});

function overlay() {
	el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

// Record Table Style Function
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
    geoP = navigator.geolocation.watchPosition( 
        function ( position) {
		points = (new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
       	travelSpeed = position.coords.speed*2.2369;
		positionE = position.coords.accuracy;
		console.log(positionE);
		if(position.coords.accuracy < 15){
			cur_path.push(points)
		}
		
		document.getElementById('cur_speed').innerHTML = '<strong>'+travelSpeed.toFixed(2) +' (MPH)</strong>  '+ positionE.toFixed(2) + 'error meters'  ;
		console.log(travelSpeed);
        },
        function () { /*error*/ }, {
            maximumAge: 1000, //  1 seconds
            enableHighAccuracy: true
 			 
        }

	);

};


function killPathTimer(){
	navigator.geolocation.clearWatch(geoP);
	polyLength = google.maps.geometry.spherical.computeLength(cur_path);
	alert(polyLength);
	var spreadWidth = cur_spreader.width;
	var spreadAmount = cur_spreader.capacity
	var spreadArea = spreadWidth*polyLength;
	spreadArAc = spreadArea/43560;
	rate =  spreadAmount /spreadArAc;
}
	
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
            center: cur_path[i],
            mapTypeId: google.maps.MapTypeId.HYBRID
		};
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
		var latLngBounds = new google.maps.LatLngBounds();
		if(retrievedRecords != null){
			for(var i=0; i < retrievedRecords.length; i++){
				decoded = retrievedRecords[i].path;
				newPolyline = google.maps.geometry.encoding.decodePath(decoded);
				for(var j = 0; j < newPolyline.length; j++) {
					latLngBounds.extend(newPolyline[j]);
					// Place the marker
					var marker = new google.maps.Marker({
					map: map,
					position: newPolyline[j],
					title: "Point " + (j + 1)
					});
					marker.visible = false;
				}
				var polyline = new google.maps.Polyline({
				map: map,
				path: newPolyline,
				strokeColor: '#0000FF',
				strokeOpacity: 1.0,
				strokeWeight: 10
				});
			}
		}else{
			for(var i = 0; i < cur_path.length; i++) {
				latLngBounds.extend(cur_path[i]);
				// Place the marker
				new google.maps.Marker({
					map: map,
					position: cur_path[i],
					title: "Point " + (i + 1)
				});
				
				 // Creates the polyline object
				var polyline = new google.maps.Polyline({
					map: map,
					path: cur_path,
					strokeColor: '#0000FF',
					strokeOpacity: 0.7,
					strokeWeight: 10
				});
			}
		}
        map.fitBounds(latLngBounds);      
		map.setTilt(0);
		if(fields = null){
			return;
		}else{
			if(retrievedFields ==null){
				return;
			}
			if(retrievedFields != null){
				fields = retrievedFields;
			}	
			for(var i=0; i < fields.length; ++i){
				var polyPath = [];
				var vertices = google.maps.geometry.encoding.decodePath(fields[i].polygon);
				for (var j =0; j < vertices.length; j++) {
					lat = vertices[j].lat();
					lng = vertices[j].lng();
					point = new google.maps.LatLng(lat, lng);
					polyPath.push(point)
				}
				polyPath.name = fields[i].name;
				polyPath.area = fields[i].area;

				samsPolygon = new google.maps.Polygon({
					path: polyPath,
					fillColor: 'green',
					strokeColor: 'yellow',
					strokeOpacity: 0.7,
					strokeWeight: 4,
					fillOpacity: 0.2,
					visible: true
				});
				var infoWindow = new google.maps.InfoWindow();
				samsPolygon.set("name", polyPath.name);
				samsPolygon.set("area", polyPath.area);
				samsPolygon.setMap(map);
				var currentMark;
	 			google.maps.event.addListener(samsPolygon,'click', function(event) {
						infoWindow.setContent("<b> Field information </b><br>" + "Name : " + this.get("name") + "<br>"
						+ "Area : " + this.get("area") + "<br>");
	   					infoWindow.setPosition(event.latLng);
	   					infoWindow.open(map);
	   					currentMark = infoWindow;
			
				});
				google.maps.event.addListener(infoWindow,'closeclick',function(){
   					currentMark.setMap(null); //removes the marker
				});
		    }
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
            mapTypeId: google.maps.MapTypeId.HYBRID
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
			cur_field = polygon.getPath();
			encodePGon = google.maps.geometry.encoding.encodePath(cur_field);
			var fArea = google.maps.geometry.spherical.computeArea(polygon.getPath());

			areaAc = fArea * 0.000247105;
			areaAcres = areaAc.toFixed(2)
			$('#deleteField').on('click', function() {
			deleteMarkers();
			});
			function deleteMarkers () {
			polygon.setPath([]);
			addFieldMap();
			}	
		});
		
		if(fields = null){
			return;
		}else{
			if(retrievedFields ==null){
				return;
			}
			if(retrievedFields != null){
				var polyPath = [];
				fields = retrievedFields;
			}	
			console.log(fields);
			for(var i=0; i < fields.length; ++i){
				var polyPath = [];
				var vertices = google.maps.geometry.encoding.decodePath(fields[i].polygon);
				for (var j =0; j < vertices.length; j++) {
					lat = vertices[j].lat();
					lng = vertices[j].lng();
					point = new google.maps.LatLng(lat, lng);
					polyPath.push(point)
				}
				polyPath.name = fields[i].name;
				polyPath.area = fields[i].area;
				
				samsPolygon = new google.maps.Polygon({
				path: polyPath,
				fillColor: 'green',
				strokeColor: 'yellow',
				strokeOpacity: 0.7,
				strokeWeight: 4,
				fillOpacity: 0.35,
				visible: true,
				editable: true
				
				});
				infoWindow = new google.maps.InfoWindow();
				samsPolygon.set("name", polyPath.name);
				samsPolygon.set("area", polyPath.area);
				samsPolygon.setMap(map);			
				}	
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

function addFieldRerun(){
	addFieldMap();
}
 
 function calculateSpeed(){
			var  rtSelect = cur_field.unit;
				if(rtSelect =='gal/ac'){
				var rate =  cur_field.rate;
				var width = cur_spreader.width;
				d = 43560/ width;
				outPut = cur_spreader.capacity/cur_spreader.ut;
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
	

	

