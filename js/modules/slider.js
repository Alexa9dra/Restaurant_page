import {getZero} from './timer';

function slider({sliderSelector, slideSelector, nextSelector, prevSelector}) {
    const slider = document.querySelector(sliderSelector),
          indicators = document.createElement('ol');
    let slideIterator = 0, slideLength, offers;

    slider.style.position = 'relative';
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    axios.get('http://localhost:3000/offer')
    .then(data => {
        offers = data.data;
        document.querySelector('#total').textContent = getZero(offers.length);
        slideLength = offers.length;
        return offers;
    })
    .then(() => {
        for(let i = 0; i < slideLength; i++){
            const dot = document.createElement('li');

            dot.setAttribute('data-slide-to', i+1);
            dot.classList.add('dot');
            indicators.append(dot);
            setSlider(1);
        }
    });

    document.querySelector(prevSelector).addEventListener('click', () => {
        (slideIterator > 0) ? slideIterator-- : slideIterator = (slideLength - 1);
        
        setSlide();
        setSlider(slideIterator + 1);
    });

    document.querySelector(nextSelector).addEventListener('click', () => {
        (slideIterator < (slideLength - 1)) ? slideIterator++ : slideIterator = 0;

        setSlide();
        setSlider(slideIterator + 1);
    }); 

    function setSlide() {
        document.querySelector('#current').textContent = getZero(slideIterator + 1);
        document.querySelector(slideSelector).innerHTML = `<img src="${offers[slideIterator].img}" 
            alt="${offers[slideIterator].altimg}" class='fade'>`;
    }

    function setSlider(i) {
        document.querySelectorAll(`[data-slide-to]`).forEach((e) => e.style.opacity = 0.5);
        document.querySelector(`[data-slide-to="${i}"]`).style.opacity = 1;
    }
}

export default slider;