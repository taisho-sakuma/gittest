// let mymap = L.map("mymap").setView([38.732071, 140.522619], 12);
// L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution:
//         '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(mymap);

// let osmTile =
//   new L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution:
//       '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> \
//   contributors'
//   });
// let gsiTile =
//   new L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
//     attribution:
//       '<a href="http://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>'
//   });
// let mymap = L.map("mymap", { layers: [osmTile] }).setView([38.732071, 140.522619], 12);
// let baseLayers = { 'OpenStreetMap': osmTile, '国土地理院': gsiTile };
// L.control.layers(baseLayers, null).addTo(mymap);


// alert("aunk");
let t_std = new L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
});

let o_std = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});


let baseLayers = {
    "OpenStreetMap 標準": o_std,
    "地理院地図 標準": t_std,
};
let overlays = L.geoJson(gj, {	// omnivoreに引き渡すGeoJSONレイヤ
    onEachFeature: function (feature, layer) {	// レイヤ上に配置する feature(地点)
        let p = feature.properties;		// ごとに、プロパティを取り出し
        if (p) {			// description(概要)を
            let name = p.name, desc = p.description;
            if (p.name) {
                if (desc) {
                    desc = desc.replace(/{{(.*)}}/, '<img src="$1" width="300" height="200">')
                }
                let popup = "<h3>" + name + "</h3>" + "<p>" + (desc || "") + "</p>";
                layer.bindPopup(popup).on('click', function (e) {
                    mymap.flyTo(e.latlng, 15);
                });;	// ポップアップに設定する
            }
        }
    }
});
let mymap = L.map('mymap', {
    center: [38.766715, 140.500611],
    zoom: 11,
    layers: [o_std, overlays]
});
// let mymap = L.map("mymap", { layers: [o_std, overlays] }).setView([38.732071, 140.522619], 12);
L.control.layers(baseLayers, { "test": overlays }, { minzoom: 11, }).addTo(mymap);


// let customLayer = L.geoJson(null, {
//   onEachFeature: function (feature, layer) {	// レイヤ上に配置する feature(地点)
//     let p = feature.properties;		// ごとに、プロパティを取り出し
//     if (p) {			// description(概要)を
//       let name = p.name, desc = p.description;
//       if (p.name) {
//         if (desc) {
//           desc = desc.replace(/{{(.*)}}/, '<img src="$1" width="300" height="200">')
//         }
//         let popup = "<h3>" + name + "</h3>" + "<p>" + (desc || "") + "</p>";
//         layer.bindPopup(popup);	// ポップアップに設定する
//       }
//     }
//   }
// });
// // geojson外部ファイルの読み込みは次の行
// let gjl = omnivore.geojson("mogami.geojson", null, customLayer)
// // ↑引数は順に: ファイル, 解析オプション, カスタムレイヤ
// gjl.on("ready", function () {	// 'ready' イベントに読み終わったときの処理
//     jsonmap.fitBounds(gjl.getBounds());	// 読み取り失敗時は 'error' イベント
// }); gjl.addTo(mymap);		// マップに足す
// L.control.layers(null, { "Triangle": gjl }).addTo(mymap);


