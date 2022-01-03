// Extend Leafletjs to include a function that returns active layers
    L.Control.Layers.include({
      getOverlays: function() {
        // create hash to hold all layers
        var control, layers;
        layers = {};
        control = this;

        // loop thru all layers in control
        control._layers.forEach(function(obj) {
          var layerName;

          // check if layer is an overlay
          if (obj.overlay) {
            // get name of overlay
            layerName = obj.name;
            // store whether it's present on the map or not
            return layers[layerName] = control._map.hasLayer(obj.layer);
          }
        });

        return layers;
      }
    });


// CREATE MAP OBJECT
    var map = L.map('map', {
    center: [45.55733331588203, -122.53807067871094],
    zoom: 12
    });

//=================================================

    // CREATE MAP PANES
    map.createPane('lirr');
        map.getPane('lirr').style.zIndex = 640;

    map.createPane('stops');
        map.getPane('stops').style.zIndex = 660;

    map.createPane('bus');
        map.getPane('bus').style.zIndex = 650;

    // This pane is above markers but below popups
    map.createPane('labels');
    map.getPane('labels').style.zIndex = 650;

    // Layers in this pane are non-interactive and do not obscure mouse/touch events
    map.getPane('labels').style.pointerEvents = 'none';

    //=============================================================



    // CREATE LAYER STYLES
    var geojsonMarkerOptions = {
    radius: 5,
    fillColor: "#ffffff",
    color: "#000",
    pane: "stops",
    weight: .5,
    opacity: 1,
    fillOpacity: 0.8
    };

    var geojsonMarkerOptionsOutbound = {
    radius: 5,
    fillColor: "#9595e2",
    color: "#000",
    pane: "stops",
    weight: .5,
    opacity: 1,
    fillOpacity: 0.8
    };

    var geojsonMarkerOptionsInbound = {
    radius: 5,
    fillColor: "#2b2bc4",
    color: "#000",
    pane: "stops",
    weight: .5,
    opacity: 1,
    fillOpacity: 0.8
};


//================================================================

    // CREATE LAYER GROUPS AND LAYERS

    var max_yellow_line = L.layerGroup().addTo(map);
    var route_2_inbound = L.layerGroup();
    var route_2_outbound = L.layerGroup();

       // ADD LAYERS To Layer Groups
       var route_2_inbound_io_stops =  L.geoJSON(route_2_inbound_io_stops, {
            onEachFeature: onEachFeature,
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptionsInbound);
            }
        }).addTo(route_2_inbound);

        var route_2_inbound_isos = L.geoJSON(route_2_inbound_io_isos, {
        onEachFeature: onEachFeature,
            color: "#5656fc",
            weight: 1.5,
            opacity: 7,
            pane: 'bus'
        }).addTo(route_2_inbound);

        var route2inboundline = L.geoJson(route2inboundline, {
            color: "#2b2bc4",
            weight: 2.5,
            opacity: 6,
            pane: 'bus'
        }).addTo(map);

       var max_stops = L.geoJSON(max_stops, {
            onEachFeature: onEachFeature,
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
            }
        }).addTo(max_yellow_line);

       var max_line_isos = L.geoJSON(max_isos, {
        onEachFeature: onEachFeature,
        color: "#ffe978",
            weight: 3,
            opacity: 7,
            pane: 'lirr'
        }).addTo(max_yellow_line);

       var maxline = L.geoJson(maxline, {
        color: "#f9d831",
            weight: 4.5,
            opacity: 6,
            pane: 'lirr'
        }).addTo(map);

       var route_2_outbound_stops = L.geoJSON(route_2_outbound_stops, {
            onEachFeature: onEachFeature,
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptionsOutbound);
            }
        }).addTo(route_2_outbound);

       var route_2_ob_isos = L.geoJSON(route_2_outbound_isos, {
            onEachFeature: onEachFeature,
            color: "#bdbdff",
            weight: 2,
            opacity: 7,
            pane: 'bus'
        }).addTo(route_2_outbound);

        var route2outboundline = L.geoJson(route2outboundline, {
                   color: "#2b2bc4",
                 weight: 2.5,
                      opacity: 6,
                      pane: 'bus'
       }).addTo(map);

   // LAYER CONTROL - ALLOWS LAYERS TO BE TOGGLED ON and OFF

   // leave blank overlay variable so that leaflet creates layer control box correctly.
   // basemap layers are added as radio buttons. Only one can be selected at a time.
   var basemaps = {
             "Max Yellow Line": max_yellow_line,
          "2-Division Inbound":route_2_inbound,
          "2-Division Outbound":route_2_outbound
   };
   // Overlay layers are added as select boxes, and multiple can be selected at one time
   var overlays = {
     };

//================================================


 // Message in Righthand corner saying to Click on Features
    var info = L.control();
            info.onAdd = function (map) {
                this._div = L.DomUtil.create('div', 'info');
                this.update();
                return this._div;
            };
            info.update = function (props) {
                this._div.innerHTML = '<b>Select a Transit Route using the button below <br> and click on individual stops for more info</b>';
            };
            info.addTo(map);

 // ADD ATTRIBUTION AND TILES TO MAP
    var cartodbAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';
    var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: cartodbAttribution
    }).addTo(map);

    var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
    attribution: cartodbAttribution,
    pane: 'labels'
    }).addTo(map);

//==============================================================================

// Any text between /* and */ will be ignored by JavaScript.

// HOVER AND CLICK FUNCTIONS
        function highlightFeature(e) {
        var layer = e.target;
        layer.setStyle({
        weight: 3.5,
        color: '#ff401f',
        fillOpacity: 0.2
        });

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

	}

    function resetHighlight(e) {
            route_2_ob_isos.resetStyle(e.target);
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
		if (feature.properties.layer_type == 'Isochrone') {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight
		});
		}
		// POP UP DATA FUNCTION
		var popupContent = "" ;

        	if (feature.properties && feature.properties.stop_name) {
			popupContent += feature.properties.stop_name;
		}

		if (feature.properties && feature.properties.proportional_pop_comma) {
			popupContent += "<h6>" + (feature.properties.proportional_pop_comma) + " people live in the residential coverage area for this station</h6>";
		}

		layer.bindPopup(popupContent);
    };




//====================================================================

//===============================================================

// Add Layer box.
var control = L.control.layers(basemaps, overlays).addTo(map);

// use ActiveLayers.js to get active base layer
console.log("Active layers are: ")
console.log(control.getOverlays())

var SelectedLayer='';  // default value
map.on('baselayerchange', function(eo) {
    SelectedLayer=eo.name;
    $( "#bar_graph" ).empty();
    console.log('SelectedLayer>>>>>>>>>>>>>>',SelectedLayer);
    if (eo.name === 'Max Yellow Line') {
    $.getScript("static/max_bar_chart.js")}
    else if (eo.name === '2-Division Inbound') {
    $.getScript("static/route_2_ib_bar_chart.js")}
    else {
    $.getScript("static/route_2_ob_bar_chart.js")}
    }
);

var name;
map.on('overlayadd', function(e){
   name = e.name;
   console.log(name);
})


    //==================================

        // ADD LEGEND

        var legend = L.control({position: 'bottomright'});
        legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML = 'TriMet ' + '<br>' + '<span style="color:#2b2bc4;">──</span>  Route 2 Inbound and Outbound' + '<br>' +  '<span style="color:#f9d831;">──</span>  MAX Yellow Line' ;
        return div;
        };
        legend.addTo(map);


