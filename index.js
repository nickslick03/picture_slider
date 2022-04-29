const createCircleContainer = (pictureSlider) => {
    let {pictures, pictureFrame} = pictureSlider;
    const circles = [];
    const circleContainer = document.createElement('div');
    circleContainer.style = 
    `position: absolute;
    width: 100%;
    transform: translate(-50%, -100%);
    left: 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center`;
    pictures.forEach((p, index) => {
        let circle = document.createElement('div');
        circle.style = 
        `width: 1vw;
        height: 1vw;
        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 1000px;
        margin: 1vw;
        transition-property: background-color;
        transition-duration: 1.5s;
        `;
        circle.addEventListener('click', () => {
            switchSlide(index, pictureSlider);
        });
        circleContainer.appendChild(circle);
        circles.push(circle);
    });
    pictureFrame.appendChild(circleContainer);
    return circles;
}

const convertWidth = {
    vw: picture => picture.offsetWidth * 100 / window.innerWidth,
    px: picture => picture.offsetWidth,
}

const switchSlide = (nextSlide, pictureSlider) => {
    let {pictureFrame, pictureContainer, heightUnit, pictures, currentSlide, circles} = pictureSlider;
    pictureFrame.style.transitionDuration = '1.5s';
    pictureContainer.style.transitionDuration = '1.5s';
    circles[currentSlide].style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    if(nextSlide > pictures.length - 1) {
        switchSlide(0, pictureSlider);
        return;
    } else if(nextSlide < 0) {
        switchSlide(pictures.length - 1, pictureSlider);
        return;
    }
    let nextRight = 0;
    pictures.some((picture, index) => {
        if(index === nextSlide) return true;
        nextRight += convertWidth[heightUnit](picture);            
    });
    pictureContainer.style.transform = `translateX(-${nextRight + heightUnit})`;
    pictureFrame.style.width = convertWidth[heightUnit](pictures[nextSlide]) + heightUnit;
    circles[nextSlide].style.backgroundColor = 'rgb(255, 255, 255)';
    setTimeout(() => {
        pictureFrame.style.transitionDuration = '';
        pictureContainer.style.transitionDuration = '';
    }, 1500);
    pictureSlider.currentSlide = nextSlide;
}

function formatPictureSlider(pictureFrame, pictureContainer, height, heightUnit, autoSlideSeconds, maxHeight) {
    const pictureSlider = {
        pictureFrame,
        pictureContainer,
        height,
        heightUnit,
        pictures: [...pictureContainer.children],
        currentSlide: 0
    };

    pictureSlider.circles = createCircleContainer(pictureSlider);
    pictureSlider.circles[0].style.backgroundColor = 'rgb(255, 255, 255)';

    pictureSlider.pictures.forEach(img => {
        img.style.height = '100%';
    });
    
    pictureContainer.style.height = height + heightUnit;
    pictureContainer.style.transitionProperty = 'transform';
    pictureContainer.style.display = 'flex';
    pictureContainer.style.position = 'relative';
    pictureContainer.style.zIndex = '0';

    pictureFrame.style.height = height + heightUnit;
    pictureFrame.style.transitionProperty = 'width';
    pictureFrame.style.overflow = 'hidden';
    pictureFrame.style.position = 'relative';
    pictureFrame.style.zIndex = '0';
    pictureFrame.style.width = convertWidth[heightUnit](pictureSlider.pictures[0]) + heightUnit;

    const checkMaxHeight = () => {
        if(pictureFrame.offsetHeight >= maxHeight) {
            pictureFrame.style.transform = `scale(${maxHeight / pictureFrame.offsetHeight})`;
            pictureFrame.style.margin = (maxHeight - pictureFrame.offsetHeight) / 2 + 'px';
        } else {
            pictureFrame.style.transform = '';
            pictureFrame.style.margin = '';
        }
    }
    visualViewport.addEventListener('resize', () => {
        checkMaxHeight();
    });
    checkMaxHeight();

    if(autoSlideSeconds) {
        const setAutoSlide = () =>
            interval = setInterval(() => {
                switchSlide(pictureSlider.currentSlide + 1, pictureSlider);
            }, autoSlideSeconds * 1000);
        let interval; 
        interval = setAutoSlide(interval);
        pictureFrame.addEventListener('click', () => {
            clearInterval(interval);
            setAutoSlide(interval);
        });
    }

    //left and right triangles
    for(let i = 0; i < 2; i++) {
        let triangle = document.createElement('div');
        triangle.style = `
        position: absolute;
        width: 0;
        height: 0;
        bottom: 50%;
        transform: translateY(100%);
        border: rgba(0,0,0,0) solid 1vw;`;
        if(i === 0) {
            triangle.style.borderRight = 'white solid 2vw';
            triangle.addEventListener('click', () => {
                switchSlide(pictureSlider.currentSlide - 1, pictureSlider);
            });
        } else {
            triangle.style.right = '0';
            triangle.style.borderLeft = 'white solid 2vw';
            triangle.addEventListener('click', () => {
                switchSlide(pictureSlider.currentSlide + 1, pictureSlider);
            });
        }
        pictureSlider.pictureFrame.appendChild(triangle);
    }

    return index => switchSlide(pictureSlider, index);
};

module.exports = formatPictureSlider;
