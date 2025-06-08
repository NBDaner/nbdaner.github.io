// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    // 你可以在这里添加一些交互效果，比如滚动动画、表单验证等
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function(event) {
        event.preventDefault();
        alert('感谢你的点击！');
    });

    // 轮播图功能
    const carouselSlide = document.querySelector('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const carousel = document.querySelector('.carousel');

    let counter = 0;

    function updateSlide() {
        const slideWidth = carousel.offsetWidth;
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
    }

    // 初始化图片宽度
    function setSlideWidth() {
        const slideWidth = carousel.offsetWidth;
        images.forEach(img => {
            img.style.width = slideWidth + 'px';
        });
        updateSlide();
    }
    setSlideWidth();
    window.addEventListener('resize', setSlideWidth);

    // 按钮事件
    nextButton.addEventListener('click', () => {
        counter = (counter + 1) % images.length;
        updateSlide();
    });

    prevButton.addEventListener('click', () => {
        counter = (counter - 1 + images.length) % images.length;
        updateSlide();
    });

    // 自动轮播功能
    let autoPlayInterval;
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            nextButton.click();
        }, 3000);
    }
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    startAutoPlay();
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
});