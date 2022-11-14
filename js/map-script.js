let map;
let center = [53.904269742126004, 27.566869389465666];

let Placemark1, Placemark2, Placemark3, Placemark4;

let coords = [];
let GeoObjects = [];
let Clusterer;

import { arrayPlacemark } from "./placemark-info.js"

let dynamicCoords = [];
let dynamicPlacemark;
let deleteButton = document.querySelector('.delete');

function init() {
    map = new ymaps.Map('map', {
        center: center,
        zoom: 12
    });

    map.controls.remove('geolocationControl');
    map.controls.remove('searchControl');
    map.controls.remove('trafficControl');
    map.controls.remove('typeSelector');
    map.controls.remove('fullscreenControl');
    map.controls.remove('zoomControl');
    map.controls.remove('rulerControl');

    function testPlacemarks() {
        Placemark1 = new ymaps.Placemark([53.90757688355257, 27.55327052323302], {
            balloonContentBody: '<img src="Media/andre-benz-qi2hmCwlhcE-unsplash.jpg" height="150" width="200"> <br/> ',
            hintContent: 'Чорный носок'
        }, {
            preset: 'islands#greenDotIconWithCaption',
            openHintOnHover: true
        });

        Placemark2 = new ymaps.Placemark([53.907380497270964, 27.553420726937862], {
            hintContent: 'Бели носок',
            balloonContent: 'bruh'
        }, {
            preset: 'islands#greenDotIconWithCaption',
            openHintOnHover: true
        });

        Placemark3 = new ymaps.Placemark([53.90771071555245, 27.55464721317863], {
            hintContent: 'Желтый носок'
        }, {
            preset: 'islands#greenDotIconWithCaption',
            openHintOnHover: true
        });

        Placemark4 = new ymaps.Placemark([53.90765167611442, 27.55164783377525], {
            hintContent: 'Красный носок'
        }, {
            preset: 'islands#greenDotIconWithCaption',
            openHintOnHover: true
        });

    };

    function cluster() {
        coords = [
            Placemark1,
            Placemark2,
            Placemark3,
            Placemark4
        ];

        GeoObjects = [];

        for (var i = 0; i < coords.length; i++) {
            GeoObjects[i] = coords[i];
        }

        Clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedGreenClusterIcons',
            groupByCoordinates: false,
            gridSize: 256,
        });

        Clusterer.add(GeoObjects);
        map.geoObjects.add(Clusterer);
    };

    function dbPlacemarks() {

        for (let i = 0; i <= 2; i++) {
            let lat = arrayPlacemark[i].coordsLat;
            let lon = arrayPlacemark[i].coordsLon;

            arrayPlacemark[i] = new ymaps.Placemark([lat, lon], {
                balloonContentHeader: arrayPlacemark[i].balloonText,
                balloonContentBody: `<img src=\"${arrayPlacemark[i].ballonImgUrl}\" height=\"150\" width=\"200\"> <br/>`,
                hintContent: arrayPlacemark[i].hint
            }, {
                preset: 'islands#greenDotIconWithCaption',
                balloonMaxWidth: 200,
                openHintOnHover: true
            });

            GeoObjects.push(arrayPlacemark[i]);
            Clusterer.add(GeoObjects);
            map.geoObjects.add(Clusterer);
        }


    };

    function getCoords() {

        let oneCall = 1;

		//   
		// моя добавка ниже 
		//	

        map.events.add('click', function (item) {
            dynamicCoords = item.get('coords');
            if (oneCall == 1) {
                dynamicPlacemark = new ymaps.Placemark([dynamicCoords[0], dynamicCoords[1]], {
                }, {
                    preset: 'islands#redDotIconWithCaption',
                    openHintOnHover: false,
                    openEmptyBalloon: false
                });

                deleteButton.classList.add('shown');

					 console.log('delete button is shown')
					 form.classList.add('_active')

                map.geoObjects.add(dynamicPlacemark);

                oneCall++;
            }
            else if (oneCall != 1) {
                alert("No marks for u");
            }
        });

        cancelButton.onclick = function () {
            deleteButton.classList.remove('shown');
				console.log("delete button isn't shown")
				console.log()
            map.geoObjects.remove(dynamicPlacemark);
            oneCall--;
        }

    };

    testPlacemarks();
    cluster();
    dbPlacemarks();
    getCoords();
};

// $(document).ready(function () {
//     $("#btn").click(
//         function () {
//             sendAjaxForm('result_form', 'ajax_form', 'dbquery.php');
//             return false;
//         }
//     );
// });

// function sendAjaxForm(result_form, ajax_form, url) {
//     $.ajax({
//         url: url,
//         type: "POST",
//         dataType: "html", 
//         data: $("#" + ajax_form).serialize(),
//         success: function (response) {
//             let result = $.parseJSON(response);
//             $('#result_form').html('How: ' + result.name + '<br>to work: ' + result.notname);
//         },
//         error: function (response) {
//             $('#result_form').html('Ошибка. Данные не отправлены.');
//         }
//     });
// }

ymaps.ready(init);