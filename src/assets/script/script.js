document.addEventListener('DOMContentLoaded', (event) => {
    var currentImg = 0;
    var imgs = document.querySelectorAll('.slider img');
    let dots = document.querySelectorAll('.dot');
    var interval = 3000;

// Second banner
var secondEventTitle = 'Hi! *Freshmen* Orientation Day';

// Third banner
var thirdEventDate = new Date('2023-02-01'); // pull this from database
var thirdEventDateString = thirdEventDate.toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' });
var days = calculateDays(new Date(), thirdEventDate) || 0;
const countdownText = days > 0 ? `${days} days left` : 'Live Now!';

var secondImageUrl = `../../assets/img/signatg.jpeg`; //signatg.jpeg;
var thirdImageUrl = `../../assets/img/284A2155-(1).jpg`;


document.getElementById('img-2').src = secondImageUrl;
document.getElementById('img-3').src = thirdImageUrl;

var timer = setInterval(changeSlide, interval);

    function changeSlide(n) {
        if (imgs.length && dots.length) {
            for (var i = 0; i < imgs.length; i++) {
                imgs[i].style.opacity = 0;
                dots[i].className = dots[i].className.replace(' active', '');
            }

            currentImg = (currentImg + 1) % imgs.length;

            if (n != undefined) {
                clearInterval(timer);
                timer = setInterval(changeSlide, interval);
                currentImg = n;
            }imgs[currentImg].style.opacity = 1;
            dots[currentImg].className += ' active';
        }
    }

    function calculateDays(today, eventDate) {
        const difference = eventDate.getTime() - today.getTime();

        return Math.ceil(difference / (1000 * 3600 * 24)); // convert to days
    }

});