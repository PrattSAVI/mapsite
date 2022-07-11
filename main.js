mapboxgl.accessToken =
    "pk.eyJ1IjoiZWxpZmVuc2FyaSIsImEiOiJjam15ejN3d3EyMXRyM3FvODE3djQxcDluIn0.jn7SMI1MV_qcFxhcXT_-Eg";
var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/elifensari/ckd8qtjv100ac1iqsmp5zvve5",
    center: [7.663673449999999, 45.0231072],
    zoom: 11.76,
    maxZoom: 13.76,
    minZoom: 9.76,
});
map.on("load", function() {
    map.addSource("completeline", {
        type: "geojson",
        data: "data/turin-line-1-south-phase-4-complete-line.geojson",
        generateId: true,
    });
    map.addLayer({
        id: "completeline",
        type: "line",
        source: "completeline",
        layout: {},
        paint: {
            "line-width": 1,
            "line-color": "#ADADAD"
        },
    });

    map.addSource("subwayline", {
        type: "geojson",
        data: "data/turin-line-1-south-phase-4-line.geojson",
        generateId: true,
    });

    map.addLayer({
        id: "subwayline",
        type: "line",
        source: "subwayline",
        layout: {},
        paint: {
            "line-width": 1,
            "line-color": "#EF476F"
        },
    });
    map.addLayer({
        id: "tunnels",
        type: "line",
        source: "subwayline",
        filter: ["==", "tunnel", "yes"],
        layout: {},
        paint: {
            "line-width": 1,
            "line-color": "#6F1F42"
        },
    });
    map.addLayer({
        id: "bridges",
        type: "line",
        source: "subwayline",
        filter: ["==", "bridge", "yes"],
        layout: {},
        paint: {
            "line-width": 2,
            "line-color": "#77B5CF"
        },
    });
    map.addLayer({
        id: "viaducts",
        type: "line",
        source: "subwayline",
        filter: ["==", "bridge", "viaduct"],
        layout: {},
        paint: {
            "line-width": 2,
            "line-color": "#77B5CF"
        },
    });
    map.addLayer({
        id: "aqueducts",
        type: "line",
        source: "subwayline",
        filter: ["==", "bridge", "aqueduct"],
        layout: {},
        paint: {
            "line-width": 2,
            "line-color": "#77B5CF"
        },
    });
    map.addLayer({
        id: "yard",
        type: "line",
        source: "subwayline",
        filter: ["==", "service", "yard"],
        layout: {},
        paint: {
            "line-width": 2,
            "line-color": "#1D3F5D"
        },
    });
    map.addLayer({
        id: "siding",
        type: "line",
        source: "subwayline",
        filter: ["==", "service", "siding"],
        layout: {},
        paint: {
            "line-width": 2,
            "line-color": "#1D3F5D"
        },
    });
    map.addSource("places", {
        type: "geojson",
        data: "data/turin-line-1-south-phase-4-stops.geojson",
        generateId: true,
    });
    map.addLayer({
        id: "places1",
        type: "circle",
        source: "places",
        layout: {},
        paint: {
            "circle-radius": 3,
            "circle-color": "#EF476F"
        },
    });
    map.addLayer({
        id: "places",
        type: "circle",
        source: "places",
        layout: {},
        paint: {
            "circle-radius": 6,
            "circle-opacity": 0
        },
    });
    var layers = [
        "station",
        "at-grade",
        "tunnel",
        "elevated",
        "yard",
        "existing/planned",
    ];
    var colors = [
        "#EF476F",
        "#EF476F",
        "#6F1F42",
        "#77B5CF",
        "#1D3F5D",
        "#ADADAD",
    ];
    var layer = layers[0];
    var color = colors[0];
    var item = document.createElement("div");
    var key = document.createElement("span");
    key.className = "legend-circle";
    key.style.backgroundColor = color;
    var value = document.createElement("span");
    value.innerHTML = layer;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);

    for (i = 1; i < layers.length; i++) {
        var layer = layers[i];
        var color = colors[i];
        var item = document.createElement("div");
        var key = document.createElement("span");
        key.className = "legend-key";
        key.style.backgroundColor = color;
        var value = document.createElement("span");
        value.innerHTML = layer;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
    }
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
    });
    map.on("mouseenter", "places", function(e) {
        map.getCanvas().style.cursor = "pointer";
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.name;
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        popup
            .setLngLat(coordinates)
            .setHTML("<p id='pop-text'>" + description + "</p>")
            .addTo(map);
    });
    map.on("mouseleave", "places", function() {
        map.getCanvas().style.cursor = "";
        popup.remove();
    });
});