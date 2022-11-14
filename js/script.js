'use strict'

const swiper = new Swiper('.swiper', {
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',

	},
	scrollbar: {
		el: '.swiper-scrollbar',
	},
	pagination: {
		el: '.swiper-pagination',
	},
	autoplay: {
		delay: 6000
	},
	speed: 1000,
});

// map 

let imageIcon = document.querySelector('.form__image')
console.log(imageIcon)
let reader = []
function selectImage(input) {
	console.log('Image changed!')
	console.log(input.files[0])
	reader[0] = new FileReader();
	reader[0].readAsDataURL(input.files[0]);
	(() => {
		reader[0].onload = (e) => {
			imageIcon.style.background = `url(${e.target.result}) center no-repeat`
			imageIcon.style.backgroundSize = "cover"
		}
	})()
}

let map = document.querySelector('.map')
console.log(map)
let form = document.querySelector('.form')
let cancelButton = document.querySelector('.form__button_cancel')
map.addEventListener("click", (e) => {
	console.log(e.target)
	if (e.target.closest('.map__item')) {
		form.classList.add('._active')
		console.log('клац по map')
	}
})

// let submitButton = document.querySelector('form__button_submit')
// submitButton.addEventListener("click", (e) => {
// 	e.preventDefault
// })

cancelButton.addEventListener("click", (event) => {
	console.log('appuyer sur un bouton')
	event.preventDefault()
	form.classList.remove('_active')
})

let navbarTop = document.querySelector('.navbar__top')
let iconMenu = document.querySelector('.menu__icon')
let menuBody = document.querySelector('.menu__body')
if (iconMenu) {
	iconMenu.addEventListener("click", () => {
		menuBody.classList.toggle('_active')
		iconMenu.classList.toggle('_active')
		navbarTop.classList.toggle('_active')
		document.body.classList.toggle('_lock')
	})
}

// scrolls

const scroll = document.querySelector('.navbar__scroll');
const secondScroll = document.querySelector('.navbar__scroll_second');
const fullscreen = document.querySelector('.fullscreen');
const imageFullscreen = document.querySelector('.image-fullscreen')
const fullscreenHeight = fullscreen.offsetHeight;
const imageFullscreenHeight = imageFullscreen.offsetHeight + 20;
console.log(fullscreenHeight)
console.log(imageFullscreenHeight)
scroll.addEventListener('click', () => {
	if (window.innerWidth > 1200) {
		window.scrollTo({
			top: 1000000,
			left: 0,
			behavior: 'smooth'
		})
	} else {
		window.scrollTo({
			top: imageFullscreenHeight - 10,
			left: 0,
			behavior: 'smooth'
		})
	}
})
secondScroll.addEventListener('click', () => {
	window.scrollTo({
		top: 10000,
		left: 0,
		behavior: 'smooth'
	})
})

scroll.classList.add('active');
window.addEventListener('scroll', () => {
	console.log(fullscreenHeight)
	console.log(window.innerWidth)
	if (window.pageYOffset == 0) {
		scroll.classList.add('active');
	} else {
		scroll.classList.remove('active');
	}
	if (window.innerWidth > 560) {
		if (window.pageYOffset >= imageFullscreenHeight - 50 &&
			window.pageYOffset <= imageFullscreenHeight + 50) {
			secondScroll.classList.add('active');
		} else {
			secondScroll.classList.remove('active');
		}
	}
	if (window.innerWidth <= 560) {
		if (window.pageYOffset >= fullscreenHeight - 50 - document.documentElement.clientHeight
			&& window.pageYOffset <= fullscreenHeight + 50 - document.documentElement.clientHeight) {
			secondScroll.classList.add('active')
			console.log('kekekekek')
		} else {
			secondScroll.classList.remove('active')
			console.log('kekekekek')
		}
	}


})

// navbar input

let searchButton = document.querySelector('.navbar__search')
let searchInput = document.querySelector('.navbar__form')

searchButton.addEventListener("click", () => {
	searchInput.classList.toggle('active')
})

console.log(document.documentElement.clientHeight);







// console.log(window.scrollTop)
// if (window.scrollTop != "0px") {
// 	scroll.classList.add("_invisible")
// } else {
// 	scroll.classList.remove("_invisible")
// }


// function onEntry(entry) {
// 	console.log(entry)
// 	entry.forEach(change => {
// 	  if (change.isIntersecting) {
// 		 change.target.classList.add('element-show');
// 	  }
// 	});
//  }
//  let options = { threshold: [0.5] };
//  let observer = new IntersectionObserver(onEntry, options);
//  let elements = document.querySelectorAll('.navbar__scroll');
//  for (let elm of elements) {
// 	observer.observe(elm);
//  }

// function update() {
// 	const container = document.getElementById("controls");
// 	const elem = document.getElementById("example");
// 	const rect = elem.getBoundingClientRect();

// 	container.innerHTML = '';
// 	for (const key in rect) {
// 	  if (typeof rect[key] !== 'function') {
// 		 let para = document.createElement('p');
// 		 para.textContent = `${key} : ${rect[key]}`;
// 		 container.appendChild(para);
// 	  }
// 	}
//  }

//  document.addEventListener('scroll', update);
//  update();

// let scroll = document.querySelector('.navbar__scroll')
