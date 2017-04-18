var filterVar = [1, 2, 3];

// create map
var map = new ol.Map({
  target: document.getElementById('map'),
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }),
  view: new ol.View({
    center: [0, 0],
    zoom: 2
  })
});

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
var overlays = [];

function createMarkerText(type, pos, text, linkTo, filter) {
  if (filter.includes(type)) {
    var newOverlay = document.createElement("A");
    var newOverlayText = document.createTextNode(text);
    newOverlay.setAttribute("href", linkTo);
    newOverlay.setAttribute("style", "font-size: 11px;");
    newOverlay.appendChild(newOverlayText);
    document.body.appendChild(newOverlay);
    var overlaytje = new ol.Overlay({
      position: pos,
      positioning: 'center-center',
      element: newOverlay,
      stopEvent: false
    });
    overlays.push(overlaytje);
    return overlaytje;
  }
}

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
  overlays.length = 0;

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
        var pos = ol.proj.fromLonLat([Number(element.lon), Number(element.lat)]);
        map.addOverlay(createMarkerText(type, pos, i.location.title, "javascript:alert('" + i.location.description + "');", filterVar));
        initVectorSource(type, Number(element.lon), Number(element.lat), counter, filterVar);
        console.log(overlays.length);
      }, this);
    });
  });

  // debug data
  // for (var i = 0; i < 200; i++) {
  //   initVectorSource(Math.floor(Math.random() * 3) + 1, Math.random() * 360 - 180, Math.random() * 180 - 90, i, filterVar);
  // }
}

initPoints('init', filterVar);

function getIconStyle(imageURL, scaling) {
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
    })];
}

//add the feature vector to the layer vector, and apply a style to whole layer
var vectorLayer1 = new ol.layer.Vector({
  source: vectorSource1,
  style: getIconStyle('img/city.png', 1.0)
});

var vectorLayer2 = new ol.layer.Vector({
  source: vectorSource2,
  style: getIconStyle('img/painter.png', 1.0)
});

var vectorLayer3 = new ol.layer.Vector({
  source: vectorSource3,
  style: getIconStyle('img/other.png', 1.0)
});

map.addLayer(new ol.layer.Tile({ source: new ol.source.OSM() }));
map.addLayer(vectorLayer1);
map.addLayer(vectorLayer2);
map.addLayer(vectorLayer3);

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