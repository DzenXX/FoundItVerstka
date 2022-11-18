let lmao = 0;
let arrayPlacemarkTest = [];

function getPlacemarks() {
	$.ajax({
		url: "php/dbreceiver.php",
		type: "POST",
		data: { "lmao": lmao },
		success: function (response) {
			let result = $.parseJSON(response);
			arrayPlacemarkTest = Object.values(result);
		},
		error: function (response) {
		}
	});
}

getPlacemarks();

let map;
let center = [53.904269742126004, 27.566869389465666];

let coords = [];
let GeoObjects = [];
let Clusterer;

let dynamicCoords = [];
let dynamicPlacemark;
let cancelButton = document.querySelector('.form__button_cancel');

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

	function cluster() {
		GeoObjects = [];

		Clusterer = new ymaps.Clusterer({
			preset: 'islands#invertedGreenClusterIcons',
			groupByCoordinates: false,
			gridSize: 128,
		});

		Clusterer.add(GeoObjects);
		map.geoObjects.add(Clusterer);
	};

	function dbPlacemarks() {

		for (let i = 0; i < (arrayPlacemarkTest.length); i++) {
			let lat = arrayPlacemarkTest[i][2];
			let lon = arrayPlacemarkTest[i][3];

			arrayPlacemarkTest[i][1] = new ymaps.Placemark([lat, lon], {
				balloonContentHeader: arrayPlacemarkTest[i][4],
				balloonContentBody: `${arrayPlacemarkTest[i][5]}\n
                <img src=\"${arrayPlacemarkTest[i][6]}\" height=\"150\" width=\"200\"> <br/>`,
				hintContent: arrayPlacemarkTest[i][4]
			}, {
				preset: 'islands#greenDotIconWithCaption',
				balloonMaxWidth: 200,
				openHintOnHover: true
			});

			GeoObjects.push(arrayPlacemarkTest[i][1]);
			Clusterer.add(GeoObjects);
			map.geoObjects.add(Clusterer);
		}


	};

	function getCoords() {

		let oneCall = 1;

		map.events.add('click', function (item) {
			dynamicCoords = item.get('coords');
			coordsToSend();
			if (oneCall == 1) {
				dynamicPlacemark = new ymaps.Placemark([dynamicCoords[0], dynamicCoords[1]], {
				}, {
					preset: 'islands#redDotIconWithCaption',
					openHintOnHover: false,
					openEmptyBalloon: false
				});

				form.classList.add('_active')

				map.geoObjects.add(dynamicPlacemark);

				oneCall++;
			}
			else if (oneCall != 1) {
				alert("No marks for u");
			}
		});

		cancelButton.onclick = function () {
			map.geoObjects.remove(dynamicPlacemark);
			oneCall--;
		}

	};

	cluster();
	dbPlacemarks();
	getCoords();
};

let coordsLat;
let coordsLon;
function coordsToSend() {
	coordsLat = dynamicCoords[0];
	coordsLon = dynamicCoords[1];
}

let imgForm = document.getElementById('formImage');
let reader = [];
let imgUrl;

imgForm.addEventListener('change', imgToUrl);
function imgToUrl() {
	reader[0] = new FileReader();
	reader[0].readAsDataURL(this.files[0]);
	(() => {
		reader[0].onload = (e) => {
			imgUrl = e.target.result;
		}
	})()
}

let hintHTML;
let balloonTextHTML;

$(document).ready(function () {
	$(".form__button_submit").click(
		function () {
			hintHTML = document.querySelector('.form__name').value;
			balloonTextHTML = document.querySelector('.form__about').value;
			sendAjaxForm('php/dbsender.php');
			return false;
		}
	);
});

function sendAjaxForm(url) {
	$.ajax({
		url: url,
		type: "POST",
		dataType: "html",
		data: {
			"hintHTML": hintHTML,
			"balloonTextHTML": balloonTextHTML,
			"balloonImgHTML": imgUrl,
			"coordsLat": coordsLat,
			"coordsLon": coordsLon,
		},
		success: function (response) {
		},
		error: function (response) {
		}
	});
}

ymaps.ready(init);