var filterVar = [1, 2, 3];

var vectorSource1 = new ol.source.Vector({
  //create empty vector
});

var vectorSource2 = new ol.source.Vector({
  //create empty vector
});

var vectorSource3 = new ol.source.Vector({
  //create empty vector
});

var vectorSources = [vectorSource1, vectorSource2, vectorSource3];

//create a bunch of icons and add to source vector
function initVectorSource(type, X, Y, count, filter) {
  var iconFeature = new ol.Feature({
    geometry: new
      ol.geom.Point(ol.proj.transform([X, Y], 'EPSG:4326', 'EPSG:3857')),
    name: 'Null Island ' + count
  });

  vectorSources.forEach(function (element) {
    var index = vectorSources.indexOf(element) + 1;
    if (type == index && filter.includes(index)) {
      element.addFeature(iconFeature);
    }
  }, this);
  return;
}

function initPoints(object, filter) {
  if (object != 'init') {
    filter.forEach(function (element) {
      if (filterVar.includes(element)) {
        filterVar.splice(filterVar.indexOf(element), 1);
      } else {
        filterVar.push(element);
      }
    }, this);

  }
  vectorSources.forEach(function (element) {
    element.clear();
  }, this);

  var counter = 0;
  $.getJSON('json/Data.json', function (data) {
    data.filter(function (i, n) {
      var arraytje = i.location.point;

      arraytje.forEach(function (element) {
        counter++;
        var type = 0;
        switch (i.location.type) {
          case 'City':
            type = 1;
            break;
          case 'Painter':
            type = 2;
            break;
          case 'Other':
            type = 3;
            break;
          default:
            type = 0;
            break;
        }
        initVectorSource(type, Number(element.lon), Number(element.lat), counter, filterVar);
      }, this);
    });
  });

  // debug data
  // for (var i = 0; i < 200; i++) {
  //   initVectorSource(Math.floor(Math.random() * 3) + 1, Math.random() * 360 - 180, Math.random() * 180 - 90, i, filterVar);
  // }
}

initPoints('init', filterVar);

function getIconStyle(imageURL, scaling, content, textOffset) {
  return [
    new ol.style.Style({
      image: new ol.style.Icon(({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        scale: scaling,
        src: imageURL
      }))
    }),
    new ol.style.Style({
      text: new ol.style.Text({
        text: content,
        offsetY: textOffset,
        fill: new ol.style.Fill({ color: '#000' })
      })
    })
  ];
}

//add the feature vector to the layer vector, and apply a style to whole layer
var vectorLayer1 = new ol.layer.Vector({
  source: vectorSource1,
  style: getIconStyle('img/city.png', 1.0, 'City', -50)
});

var vectorLayer2 = new ol.layer.Vector({
  source: vectorSource2,
  style: getIconStyle('img/painter.png', 1.0, 'Painter', -50)
});

var vectorLayer3 = new ol.layer.Vector({
  source: vectorSource3,
  style: getIconStyle('img/other.png', 1.0, 'Other', -50)
});

// create map
//var map = new ol.Map({
//  layers: [
//    new ol.layer.Tile({
//      source: new ol.source.OSM()
//    }), vectorLayer1, vectorLayer2, vectorLayer3],
//  target: document.getElementById('map'),
//  controls: ol.control.defaults({
//    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
//      collapsible: false
//    })
//  }),
//  view: new ol.View({
//    center: [0, 0],
//    zoom: 2
//  })
//});

//With tile
var map = new ol.Map({
        layers: [new ol.layer.Tile({
          visible: true,
          preload: Infinity,
          source: new ol.source.BingMaps({
            key: 'Al-c5dcFktMAgjprfuVUVg8m3An3Pjj4oJUN6DoL0Sy1vsy7d6jkg89yCaiEwR85',
            imagerySet: 'AerialWithLabels',
			maxZoom: 19
            // use maxZoom 19 to see stretched tiles instead of the BingMaps
            // "no photos at this zoom level" tiles
            // maxZoom: 19
          })
        }), vectorLayer1, vectorLayer2, vectorLayer3
		],
		target: document.getElementById('map'),
		controls: ol.control.defaults({
		attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
		collapsible: false
		})
		}),
        // Improve user experience by loading tiles while dragging/zooming. Will make
        // zooming choppy on mobile or slow devices.
        loadTilesWhileInteracting: true,
        //target: 'map',
        view: new ol.View({
          center: [-6655.5402445057125, 6709968.258934638],
          zoom: 5
        })
      });


function display(id, value) {
  document.getElementById(id).value = value.toFixed(2);
}

function wrapLon(value) {
  var worlds = Math.floor((value + 180) / 360);
  return value - (worlds * 360);
}

function onMoveEnd(evt) {
  var map = evt.map;
  var extent = map.getView().calculateExtent(map.getSize());
  var bottomLeft = ol.proj.transform(ol.extent.getBottomLeft(extent),
    'EPSG:3857', 'EPSG:4326');
  var topRight = ol.proj.transform(ol.extent.getTopRight(extent),
    'EPSG:3857', 'EPSG:4326');
  display('left', wrapLon(bottomLeft[0]));
  display('bottom', bottomLeft[1]);
  display('right', wrapLon(topRight[0]));
  display('top', topRight[1]);
}

map.on('moveend', onMoveEnd);

// ************************************ TIMELINE ************************************ //

// new Map ZoomEvent
function onZoom(evt) {
    var zoomLevel = map.getView().getZoom();
    console.info('zoom fired ' + zoomLevel);
    if (zoomLevel >= 12) {
        document.getElementById('timelinecontainer').style.zIndex = '2000';
        console.info('show');
    } else {
        document.getElementById('timelinecontainer').style.zIndex = '-2000';
        console.info('hide');
    }
}
// register the new Map ZoomEvent with the map
map.on('moveend', onZoom);