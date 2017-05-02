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
    })],
    // Improve user experience by loading tiles while dragging/zooming. Will make
    // zooming choppy on mobile or slow devices.
    loadTilesWhileInteracting: true,
    target: 'map',
    view: new ol.View({
        center: [-6655.5402445057125, 6709968.258934638],
        zoom: 3
    })
});

function onZoom(evt) {
    var zoomLevel = map.getView().getZoom();
    console.info('zoom fired ' + zoomLevel);
    if (zoomLevel >= 12) {
        onLoad();
        document.getElementById('timelinecontainer').style.zIndex = '2000';
        console.info('show');
    } else {
        document.getElementById('timelinecontainer').style.zIndex = '-2000';
        console.info('hide');
    }
}
map.on('moveend', onZoom);
