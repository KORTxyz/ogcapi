class User {
    constructor(name) {
        this._name = name;
        this._pos = [0, 0];
        this._time = 0;
    }
    get getUser() {
        return {
            name: this._name,
            position: this._pos,
            time: this._time
        };
    }
    setPos(pos, time) {
        this._pos = pos;
        this._time = time
    }
}

var user

var groupBy = function(data, key) {
  return data.reduce(function(storage, item) {
    var group = item[key];
    storage[group] = storage[group] || [];
    storage[group].push(item);
    return storage; 
  }, {});
};


const saveName = _ => {
    if (document.querySelector("#name").value) {
        document.querySelector(".dialog").classList.remove("active")
        document.querySelector("#map").classList.remove("inactive")
        name = document.querySelector("#name").value
        fetch("https://kort.xyz/collections/Mogens:svar/items?user=" + name)
            .then(res=>res.json())
            .then(e=>{
                answeredQuestions = [...new Set(e.features.map(e=>e.properties.question))];
                data = turf.featureCollection(data.features.filter(feature => !answeredQuestions.includes(feature.properties.id) ))
                map.getSource('spgData').setData(data)
            })

        user = new User(name)
    }
}

var map = new mapboxgl.Map({
    accessToken: 'pk.eyJ1IjoidGlub2tzIiwiYSI6ImNqbnltYjRpdTAzMHUza3F1ajJ3dTQzMHYifQ.J_urIvKEohiyuVrchF-Eyg',
    container: 'map',
    attributionControl: false,
    style: 'mapbox://styles/tinoks/cjkw2vzwj25ft2rpif8nr0zq7',
    bounds: [[7.444865832358687,54.5589027475518],[14.459312141187922,57.90166702648932]],
});

const color = ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf'];
let data;


map.on('load', _ => {
    map.addSource('spgData', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': []
        }
    })
    map.addLayer({
        'id': 'spg',
        'type': 'fill',
        'source': 'spgData',
        'layout': {},
        'paint': {
            'fill-opacity': 0.5,
            'fill-color': [
                'match',
                ['get', 'id'],
                1,
                color[0],
                2,
                color[1],
                3,
                color[2],
                4,
                color[3],
                5,
                color[4],
                6,
                color[5],
                7,
                color[6],
                /* other */ '#ccc'
            ]
        }
    })
    map.addLayer({
        'id': 'spgOutline',
        'type': 'line',
        'source': 'spgData',
        'layout': {},
        'paint': {
            'line-width': 3,
            'line-color': [
                'match',
                ['get', 'id'],
                1,
                color[0],
                2,
                color[1],
                3,
                color[2],
                4,
                color[3],
                5,
                color[4],
                6,
                color[5],
                7,
                color[6],
                /* other */ '#ccc'
            ]
        }
    })
    map.on('mouseenter', 'spg', _ => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'spg', _ => {
        map.getCanvas().style.cursor = '';
    });
//    map.on('click', 'spg', showDrawer)

    fetch("https://kort.xyz/collections/Mogens:poster/items")
        .then(res => res.json())
        .then(e => e.features.map(feature => turf.buffer(feature, 30, { units: "meters" })))
        .then(features => {
            features.forEach(feature => feature.properties.id = feature.properties.PK_UID)
            return turf.featureCollection(features)
        })
        .then(geojson => {
            map.getSource('spgData').setData(geojson)
            map.fitBounds(turf.bbox(geojson))
            data = geojson
        })

})

// Rightclick zoom out
var timer;
map.on("contextmenu", e => {
    if (new Date() - timer < 500) map.zoomOut()
    timer = new Date()
    e.preventDefault();
});

hideDrawer = _ => document.querySelector(".drawer").classList.remove("active")

const showDrawer = function (e) {

    const p = e.features[0].properties;
    document.querySelector("#question").dataset.rightanswer = p.rightans;
    document.querySelector("#question").dataset.id = p.id;


    document.querySelector("#question").innerText = p.question
    document.querySelector("#answer1").innerText = p.answer1
    document.querySelector("#answer2").innerText = p.answer2
    document.querySelector("#answer3").innerText = p.answer3
    document.querySelector("#answer4").innerText = p.answer4

    document.querySelector(".drawer").classList.add("active")
}

answerQuestion = e => {
    const dataset = document.querySelector("#question").dataset
    const userData = user.getUser;
    const rightanswer = dataset.rightanswer == e.id.slice(-1) ? 1 : 0;
    const geojson = turf.point(userData.position, {
        user: userData.name,
        question: Number(dataset.id),
        answer: rightanswer,
        time: Number(userData.time)
    })
    fetch("https://kort.xyz/collections/Mogens:svar/items", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(geojson)
    })
        .then(res => res.json())
        .then(e => {
            if (e.code == "success") {
                const featureIndex = data.features.findIndex(e=>e.properties.id==Number(dataset.id))
                data.features.splice(featureIndex, 1)
                map.getSource('spgData').setData(data)

            }
        })

    hideDrawer()
}

insideCircle = e => {
    const coords = [e.coords.longitude, e.coords.latitude]

    user.setPos(coords, e.timestamp)
    feature = data.features.filter(feature => turf.booleanPointInPolygon(turf.point(user.getUser.position), feature))
    if (feature.length > 0) showDrawer({ features: feature })

}

const gps = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    fitBoundsOptions: {
        maxZoom: 18
    },
    trackUserLocation: true
});

gps.on('geolocate', insideCircle);

map.addControl(gps)

