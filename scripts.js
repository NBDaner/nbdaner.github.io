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
    const size = images[0].clientWidth;

    // 初始化位置
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;

    // 按钮事件
    nextButton.addEventListener('click', () => {
        if (counter >= images.length - 1) {
            counter = -1; // 重置到第一张之前
        }
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        counter++;
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;

        // 如果是最后一张，瞬间跳回第一张
        if (counter === images.length - 1) {
            setTimeout(() => {
                carouselSlide.style.transition = 'none';
                counter = 0;
                carouselSlide.style.transform = `translateX(${-size * counter}px)`;
            }, 500);
        }
    });

    prevButton.addEventListener('click', () => {
        if (counter <= 0) {
            counter = images.length; // 跳到最后一张之后
        }
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        counter--;
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;

        // 如果是第一张，瞬间跳回最后一张
        if (counter === 0) {
            setTimeout(() => {
                carouselSlide.style.transition = 'none';
                counter = images.length - 1;
                carouselSlide.style.transform = `translateX(${-size * counter}px)`;
            }, 500);
        }
    });

    // 修复轮播图自动播放功能
    let autoPlayInterval;

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (counter >= images.length - 1) {
                counter = -1; // 重置到第一张之前
            }
            nextButton.click();
        }, 3000); // 每3秒切换一次
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // 启动自动播放
    startAutoPlay();

    // 鼠标悬停时停止播放，移开时继续播放
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
});