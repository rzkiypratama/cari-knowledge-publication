
/* ----------------- Start Document ----------------- */
$(document).ready(function(){
	// if( $(window).width() < 800 ) {
 //        $('#map-container').height(300);
 //        $('#map').height( $(window).height());
 //    }
 //    else {
 //        $('#map-container').height( $(window).height());
 //        $('#map').height( $(window).height());
 //    }
	getLayers();
});

var baseURL = $('meta[name="base-url"]').attr('content');
var geoJsonData = [];
var popup_layers = [];
var publications_layer;
var list_of_layers = {};
var layers_url = {"knowledge" : $('meta[name="asset-url"]').attr('content')+"/layers/Knowledge_Density.geojson" ,"cds" : $('meta[name="asset-url"]').attr('content')+"/layers/sebaran_psba_indonesia.geojson","prodi" : $('meta[name="asset-url"]').attr('content')+"/layers/sebaran_prodi_bencana_indonesia.geojson"};
var basemap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',subdomains: 'abcd'});

//default baselayer
var ina_bahaya;
var InaDefLayer = "https://inarisk1.bnpb.go.id:6443/arcgis/rest/services/inaRISK/layer_bahaya_multi/ImageServer";
var urlSmall =  InaDefLayer.toLowerCase();
if (urlSmall.includes("arcgis")) {
    if (urlSmall.includes("imageserver")){
        ina_bahaya = L.esri.imageMapLayer({ url: InaDefLayer, useCors: false, opacity: 0.7 });
    }else if(urlSmall.includes("mapserver")){
    	ina_bahaya = L.esri.dynamicMapLayer({ url: InaDefLayer, layers: [0], useCors: false, opacity: 0.7 });
    }
}

var total=0;
var getLayersResponse;

var grayscale = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',subdomains: 'abcd'}),
	carto = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>', subdomains: 'abcd'});


$('input[name=basemap]').change(function () {
	var value = $('input[name=basemap]:checked').val();
	
	if(value == 1){
		basemap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',subdomains: 'abcd'});
	}
	else if(value == 2){
		basemap =  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>', subdomains: 'abcd'});
	}else if( value == 3){
		basemap = L.tileLayer(
			'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
				attribution: '&copy; Esri'
			});
	}
	try {
	  map.removeLayer(basemap);
	}
	catch(err) {
	  
	}
	map.addLayer(basemap);
});



var inarisk_layer;
$('input[name=bahaya]').change(function () {
	var value = $('input[name=bahaya]:checked').val();
	if (ina_bahaya != '') {
		map.removeLayer(ina_bahaya);
	}
	if (value == '') {
		map.removeLayer(ina_bahaya);
		return;
	}
	// ina_bahaya = L.esri.dynamicMapLayer({ url: 'https://siaga.bnpb.go.id/arcgis/rest/services/inaRISK/Peta_Bahaya/MapServer', layers: [value], useCors: false, opacity: 0.7 });
	var urlSmall =  value.toLowerCase();
    if (urlSmall.includes("arcgis")) {
        if (urlSmall.includes("imageserver")){
            ina_bahaya = L.esri.imageMapLayer({ url: value, useCors: false, opacity: 0.7 });
        }else if(urlSmall.includes("mapserver")){
        	ina_bahaya = L.esri.dynamicMapLayer({ url: value, layers: [0], useCors: false, opacity: 0.7 });
        }
    }
	
	map.addLayer(ina_bahaya);
	//layer.addTo(map);
});

var baseMaps = {
	"<span style='width:100%, display:inline-block;'>Grayscale</span>" : grayscale,
	"Carto"		: carto 
}

var overlayMaps = {
	"Bahaya"	: ina_bahaya
}
var map = L.map('map',{
	center :[-1.8360518,119.7129801],
	zoom : 5,
	scrollWheelZoom: false,
	zoomControl: false,
	layers:[basemap, ina_bahaya]
});


L.control.zoom({
    position: 'bottomright'
}).addTo(map);

// var controlLayers = L.control.layers(baseMaps, overlayMaps,{position: 'topleft'}).addTo(map);

function set(obj, prop, value) {
  obj[prop] = value;
}



function getRadius(total, totalPub) {
  // var data = total > 1500 ? 16 : total >= 1000 ? 14 : total >= 500 ? 12 :  total >= 300 ? 10 :  total >= 200 ? 8 :  total >= 100 ? 6 :  total >= 50 ? 4 : 4;
  // return data;

  var data = (total/totalPub)*200;
  // return data;
//   console.log(data);
  if(data == 0 ){
  	return 0.00001;
  }else if(data < 0.9){
  	return 2;
  }else if (data >= 0.9 && data < 5){
  	return 5;
  }else if(data >20){
  	return 20;
  }else{
  	return data;
  }
}

  

function popup(feature, layer) {
	var url_add='';
	var props = feature.properties;
	var popupText =
		'POPUP INFORMATION';
	layer.bindTooltip('<b>' + props.name + '</b><br> Publications : ' + props.total);
	// layer.bindPopup(popupText);
	layer.on('click', function () {
		// console.log(props.code);
		areaBrief(props.code);
		code_len = props.code.toString();
		var urlParam = window.location.href; 
		var url = $('meta[name="base-url"]').attr('content')+'/datas/publication' ;
		var policyurl = $('meta[name="base-url"]').attr('content')+'/repository/policy';
	    urlParam = urlParam.split('?')[1];

		if(code_len.length == 2){
			if (typeof urlParam !== 'undefined'){
		    	url = url+'?'+urlParam+"&provincy[]="+props.code;
		    	policyurl = policyurl+'?'+urlParam+"&provincy[]="+props.code;
		    }else{
		    	url = url+"?provincy[]="+props.code;
		    	policyurl = policyurl+"?provincy[]="+props.code;
		    }
			// if( document.location.href.includes('?')) {
		 //        var url = document.location.href+"&provincy[]="+props.code;
		 //    }else{
		 //        var url = document.location.href+"?provincy[]="+props.code;
		 //    }
		}else if(code_len.length == 4){
			if (typeof urlParam !== 'undefined'){
		    	url = url+'?'+urlParam+"&cities[]="+props.code;
		    	policyurl = policyurl+'?'+urlParam+"&cities[]="+props.code;
		    }else{
		    	url = url+"?cities[]="+props.code;
		    	policyurl = policyurl+"?cities[]="+props.code;
		    }
			// if( document.location.href.includes('?')) {
		 //        var url = document.location.href+"&cities[]="+props.code;
		 //    }else{
		 //        var url = document.location.href+"?cities[]="+props.code;
		 //    }
		}else if(code_len.length == 7){
			if (typeof urlParam !== 'undefined'){
		    	url = url+'?'+urlParam+"&district="+props.code;
		    	policyurl = policyurl+'?'+urlParam+"&cities[]="+props.code.substring(0, 4);
		    }else{
		    	url = url+"?district="+props.code;
		    	policyurl = policyurl+"?cities[]="+props.code.substring(0, 4);
		    }
			// if( document.location.href.includes('?')) {
		 //        var url = document.location.href+"&district="+props.code;
		 //    }else{
		 //        var url = document.location.href+"?district="+props.code;
		 //    }
		}
		$('#load a').css('color', '#dfecf6');
		getArticles(url);
		getPolicy(policyurl);

	});
}


$( "input[type=checkbox]" ).on( "click", checkboxChecked );
function checkboxChecked(){
	var layers_active = [];
	var layers_not_active = [];
	// console.log($(this).val());
    $.each($("input[name='layers']:checked"), function(){
        layers_active.push($(this).val());
    });
    $.each($("input[name='layers']:not(:checked)"), function(){
        layers_not_active.push($(this).val());
    });

    for (var i = layers_not_active.length - 1; i >= 0; i--) {
		var layer_name = layers_not_active[i];
		map.removeLayer(list_of_layers[layer_name]);
	}
	for (var i = layers_active.length - 1; i >= 0; i--) {
		var layer_name = layers_active[i];
		map.addLayer(list_of_layers[layer_name]);
	}
}

async function getLayers(){
	var cariLayers = '';
	var othLayersHead = '<div class="toggle-wrap">\
						<span class="trigger "><a href="#">All Layers!<i class="sl sl-icon-plus"></i></a></span>\
						<div class="toggle-container">';
	var othLayersItems = ''; 
	var othLayersFooter = '</div>\
						</div>';
	$.ajax({
        url: baseURL+'/information/layers',
        method: 'GET',
        success: function (data) {
        	$.each(data, function(key, obj) {
        		// console.log(obj);
				if(obj.section == 'cari'){
					cariLayers += '<div class="checkboxes in-row	">\
									<input id="for-'+obj.id+'-'+obj.category+'" type="checkbox" name="layers" value="'+obj.id+obj.category+'" onclick="checkboxChecked();">\
									<label for="for-'+obj.id+'-'+obj.category+'">'+obj.name+'</label>\
								   </div>';
				}else{
					othLayersItems += '<div class="checkboxes in-row	">\
									<input id="for-'+obj.id+'-'+obj.category+'" type="checkbox" name="layers" value="'+obj.id+obj.category+'" onclick="checkboxChecked();">\
									<label for="for-'+obj.id+'-'+obj.category+'">'+obj.name+'</label>\
								   </div>';
				}

				// getDetailLayers(obj.id, obj.category);
			});
        	getLayersResponse = data;
			$("#carilayers").html(cariLayers);
			$("#forLayers").html(othLayersItems);
        },
        error: function (error) {
            alert("Failed to load map data!");
        }
    });
}

async function getDetailLayers(id, category = ''){
	$.ajax({
        url: baseURL+'/information/layers/'+id+'?category='+category,
        method: 'GET',
        crossDomain: true,
		xhrFields: {
		    withCredentials: true,
		},
        success: function (result) {
        	// console.log(result);
        	var index = popup_layers.length;
        	// console.log(index);
        	if(result.code == 200){
        		renderLayers(result.data.id+result.data.category, result.data.data, index, result.data.type, result.data.category);
        	}
        	// console.log(data);
        	
        },
        error: function (error) {
            alert("Failed to load map data!");
        }
    });
}

async function fetchMapData(url){
	// console.log(url);
	$.ajax({
        url: url,
        method: 'GET',
        success: function (data) {
        	render(data);
        	$.each(getLayersResponse, function(key, obj) {
				getDetailLayers(obj.id, obj.category);
			});
        },
        error: function (error) {
            alert("Failed to load map data!");
        }
    });
}

async function render(datas){
	
	var geoJsonData = [];
    for (var i = 0; i < datas.length; i++) {
    	total = total + datas[i].total;
    	geoJsonData.push(
    			{ 	"type": "Feature",
    				"properties": { "code": datas[i].code, "name":  datas[i].name, "total" : datas[i].total}, 
    				"geometry": {"type": "Point", "coordinates": [datas[i].longitude, datas[i].latitude]} 
    			})
    }
    publications_layer = L.geoJson(geoJsonData, {
        style: function(feature) {
	        return {
                radius: getRadius(feature.properties.total,total),
                stroke: true,
                color: "black",
                fill: true,
                fillColor: '#FFFFFF',//"#f57133",
                weight: 1,
                opacity: 2,
                fillOpacity: 1
            };
	    },
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        onEachFeature: popup
    });
    // controlLayers.addOverlay(publications_layer, 'Publications');
    set(list_of_layers, "publications", publications_layer);
    map.addLayer(list_of_layers["publications"]);
    map.flyToBounds(list_of_layers["publications"].getBounds());
    legendCreate();
}


function legendCreate () {

var div = L.DomUtil.create('div', 'legend test');
var grades = [50,100,300,500,1000,1501],
labels = ['<strong>Publications</strong>'],
categories = ['<50','50-100','101-300', '301-500' , '501-1000' ,'>1000'];
var radiusLegend = '', colorLegend = '';
for (var i = 0; i < grades.length; i++) {
      var grade = grades[i];//*0.5;
      // console.log(grade);
      radiusLegend = radiusLegend + '<i style="background-color: #f57133; width: '+getRadius(grade)*2+'px; height: '+getRadius(grade)*2+'px; border-radius: 50%; margin-left: '+Math.max(0,(20-getRadius(grade)))+'px; display: inline-block;"></i> <span>'+categories[i]+'</span><br>'
 
 }
 labels.push(radiusLegend);
 // depth <= 20 ? '#f54242' : depth <= 50 ? '#f57842' : depth <= 80 ? '#f5b042' : depth <= 150 ? '#f5dd42' : '#57f542' ;
div.innerHTML = labels.join('<br>');
$('#legend-layers').html(div);
};


function getColor(total) {
	var data = total > 1500 ? "#f75802" : total >= 1000 ? "#ff6a19" : total >= 500 ? "#ff7930" :  total >= 300 ? "#ff8340" :  total >= 200 ? "#f7894d" :  total >= 100 ? "#f29461" :  total >= 50 ? "#f29d6f" : "#f5b08c";
 	return data;
}

function style(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: getColor(feature.properties.total),
		dashArray: '3',
		fillOpacity: 0.5,
		fillColor: getColor(feature.properties.total)
	};
}



function checkLayerType(type, url, index, category = ''){
    if( type == 1){
        var extension = url.split(/[#?]/)[0].split('.').pop().trim();
        switch(extension) {
        case 'csv':
            return omnivore.csv(url,null,popup_layers[index]);
        case 'kml':
            return omnivore.kml(url);
        case 'geojson':
            return omnivore.geojson(url, null, popup_layers[index]);
        }
    }
    if( type == 2){
        var urlSmall =  url.toLowerCase();
        if (urlSmall.includes("arcgis")) {
            if (urlSmall.includes("mapserver")){
                 return L.esri.dynamicMapLayer(url,{opacity: 1});
            }
        }else{
            return omnivore.geojson(url, null, popup_layers[index]);
        }
        return false;
    }

    if( type == 3){
    	// console.log(url.features)
    	$.each(url.features, function(key,obj){
    		obj.geometry = JSON.parse(obj.geometry);
    	});
    	if(category != 'idku'){
	    	return L.geoJSON(url,{
				style: function(feature) {
			        return { color: getColor(feature.properties.total) };
			    },
			    onEachFeature: function (feature, layer) {
			    	var properties = feature.properties;
			        var content = [];
			        for (var key in properties) {
			            content.push(key + ': ' + properties[key]);
			        }
			        layer.on('click', function(e){
			            var contenDisplay = '<div class="tile"><div class="wrapper" style="padding: 10px 10px 10px 10px; overflow: auto;">' + content.join('<br>') +'</div></div>';
			            layer.bindPopup(contenDisplay);
			        });
			    },
			    
			    pointToLayer: function(feature, latlng){
			        var markerContent =
			            '<div class="map-marker featured color_2">' +
			                    '<div class="icon">' +
			                    '</div>' +
			                '</div>';

			        var _icon = L.divIcon({
			            html: markerContent,
			            iconSize:     [36, 46],
			            iconAnchor:   [18, 32],
			            popupAnchor:  [0, -28],
			            className: 'leaflet-marker-icon leaflet-zoom-animated leaflet-clickable marker-loaded'
			        });
			        return L.marker(latlng)
			    },
			});
		}else{
			// console.log(getRadius(feature.properties.total,total));
			return L.geoJson(url, {
		        style: function(feature) {
			        return {
		                radius: getRadius(feature.properties.total,total),
		                stroke: true,
		                color: "black",
		                fill: true,
		                fillColor: '#F57133',//"#f57133",
		                weight: 1,
		                opacity: 2,
		                fillOpacity: 1
		            };
			    },
		        pointToLayer: function (feature, latlng) {
		            return L.circleMarker(latlng);
		        },
		        onEachFeature: function (feature, layer) {
		        	var props = feature.properties;
					var popupText = 'POPUP INFORMATION';
					layer.bindTooltip('<b>' + props.name + '</b><br> Publications : ' + props.total);
		        }
		    });
		}
    }
}


var index_i = popup_layers.length;
$.each(layers_url, function(key, obj){
   	renderLayers(key, obj, index_i);
	index_i = index_i + 1;
});

function renderLayers(key, data, index, type = 1 , category = ''){
	// console.log(category);
	if(category != 'idku'){
		popup_layers[index] = L.geoJson(null, {
			style: function(feature) {
		        return { color: getColor(feature.properties.total) };
		    },
		    onEachFeature: function (feature, layer) {
		    	var properties = feature.properties;
		        var content = [];
		        for (var key in properties) {
		            content.push(key + ': ' + properties[key]);
		        }
		        layer.on('click', function(e){
		            var contenDisplay = '<div class="tile"><div class="wrapper" style="padding: 10px 10px 10px 10px; overflow: auto;">' + content.join('<br>') +'</div></div>';
		            layer.bindPopup(contenDisplay);
		        });
		    },
		    
		    pointToLayer: function(feature, latlng){
		        var markerContent =
		            '<div class="map-marker featured color_2">' +
		                    '<div class="icon">' +
		                    '</div>' +
		                '</div>';

		        var _icon = L.divIcon({
		            html: markerContent,
		            iconSize:     [36, 46],
		            iconAnchor:   [18, 32],
		            popupAnchor:  [0, -28],
		            className: 'leaflet-marker-icon leaflet-zoom-animated leaflet-clickable marker-loaded'
		        });
		        return L.marker(latlng)
		    },
		});
	}else{
		popup_layers[index] = L.geoJson(null, {
	        style: function(feature) {
		        return {
	                radius: getRadius(feature.properties.total,total),
	                stroke: true,
	                color: "black",
	                fill: true,
	                fillColor: '#F57133',//"#f57133",
	                weight: 1,
	                opacity: 2,
	                fillOpacity: 1
	            };
		    },
	        pointToLayer: function (feature, latlng) {
	            return L.circleMarker(latlng);
	        },
	        onEachFeature: function (feature, layer) {
	        	var props = feature.properties;
				var popupText = 'POPUP INFORMATION';
				layer.bindTooltip('<b>' + props.name + '</b><br> Publications : ' + props.total);
	        }
	    });
	}
	
	set(list_of_layers, key, checkLayerType(type,data,index,category) );
}