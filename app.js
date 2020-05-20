//> for fun with Date() and classList.replace()
//init
const bg = document.getElementById('bg')
const setTimeBtn = document.getElementById('setTimeBtn')
const inputTime = document.getElementById('inputTime')
const clock = document.getElementById('clock')
const day = document.getElementById('day')
const sunRays = document.getElementById('rays').children
const night = document.getElementById('night')
const stars = document.getElementById('stars').children
let sunRise = '06:30'
let sunSet = '19:30'
let date = new Date()
let hours = (date.getHours() < 10 ? '0' : '') + date.getHours()
let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
let timeNow = hours + ':' + minutes

/* const findAngle = time => {
	let timeSplit = time.split(':')
	let h = timeSplit[0]
	let m = timeSplit[1]
	return (h * 360) / 24 + (m * 360) / (24 * 60)
} */

const findAngle = time => {
	let timeSplit = time.split(':')
	return (timeSplit[0] * 360) / 24 + (timeSplit[1] * 360) / (24 * 60)
}

//< add some animation and surf the dom
const rotateClock = angle => {
	gsap.to(clock, 1, { rotation: angle, transformOrigin: 'center' })
}
// todo refactor to pull CSS or give the tween a color var || ? dynamic timeline ?
// todo add more color changes & animations
const dayTime = time => {
	bg.classList.replace('night-time', 'day')
	console.log(`do other day stuff its ${time}`)
	gsap.to(bg, 1.5, { backgroundColor: 'rgb(63, 106, 245)' })
	gsap.fromTo(day, 1, { rotation: 0 }, { rotation: 360, transformOrigin: 'center' })
	//gsap.fromTo(sunRays, 0.25, { scaleX: 0.25, scaleY: 0.25 }, { scaleX: 1, scaleY: 1, stagger: 0.5 })
}

const nightTime = time => {
	bg.classList.replace('day', 'night-time')
	console.log(`do other night stuffs its ${time}`)
	gsap.to(bg, 1.5, { backgroundColor: '#031758' })
	gsap.fromTo(night, 1, { rotation: 0 }, { rotation: 360, transformOrigin: 'center' })
	//gsap.fromTo(stars, 0.25, { scaleX: 0.25, scaleY: 0.25 }, { scaleX: 1, scaleY: 1, stagger: 0.5 })
}

const setTime = (e = timeNow) => {
	time = e
	time <= sunSet && time >= sunRise ? dayTime(time) : nightTime(time)
	let angle = findAngle(time)
	rotateClock(angle)
}

const updateTime = () => {
	userSetTime = inputTime.value
	userSetTime ? setTime(userSetTime) : console.log(`User Set Incomplete time`)
}

setTimeBtn.addEventListener('click', updateTime)
// invoke
inputTime.value = timeNow
setTime()
