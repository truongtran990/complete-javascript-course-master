const img = document.querySelector('.dog');
// img.src is the asynchronous code. Because it take time to attach an image. It loads image in the background, and all another code will continue to run.
img.src = 'dog.jpg';

// addEventListener does NOT automatically make code asynchronous. Like callback alone not automatically make code asynchronous.
img.addEventListener('load', () => {
    img.classList.add('fadeIn');
});

p.style.width = '300px';



/* In above example the loading image in the background is the causing make the code asynchronous */