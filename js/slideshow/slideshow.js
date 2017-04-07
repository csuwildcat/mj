
(function(){
  
  var last;
  var song;
  var loop;
  var index = 0;
  var imageElements = [];
  var frag = document.createDocumentFragment();
  var imagePaths = [
    'baby-pillow.jpg',
    'baby-couch.jpg',
    'baby-standing.jpg',
    'baby-tugowar.jpg',
    'puppy-string.jpg',
    'beach.jpg',
    'in-drawer.jpg',
    'cassie-bed-arms.jpg',
    'couch-cassie.jpg',
    'in-tree.jpg',
    'cassie-wine.jpg',
    'cassie-pregnant.jpg',
    'syd-first-contact.jpg',
    'corner-couch.jpg',
    'raincoat.jpg',
    'head-edge-bed.jpg',
    'last-hike.jpg',
    'seahawk-blanket.jpg',
    'couch-with-shark.jpg',
    'syd-laying-head.jpg',
    'deck-with-syd.jpg', 
    'legs-crossed-grass.jpg',
    'grass-with-cassie.jpg',
    'syd-hug-park.jpg',
    'couch-with-syd.jpg'
  ];
  var imageCount = imagePaths.length;
  var skipFrame = fn => requestAnimationFrame(function(){
                          requestAnimationFrame(fn)
                        });

  function kenBurns() {
    if (index == imageCount) clearInterval(loop);
    if (last) last.setAttribute('fx', 'out');
    (last = imageElements[index]).setAttribute('fx', 'in')
    index++;
  }

  document.addEventListener('transitionend', function(e){
    if (e.target.getAttribute('fx') == 'out') e.target.removeAttribute('fx');
  });

Promise.all([

  new Promise((resolve, reject) => {
    song = new Audio('../../audio/see-you-again.mp3');
    song.preload = 'auto';
    song.oncanplay = function(){
      resolve();
    }
  }),

  Promise.all(imagePaths.map(function(url){
    return new Promise((resolve, reject) => {
      var wrap = document.createElement('div');
          wrap.classList.add('slide');
      var img = document.createElement('img');
          img.onerror = function(){ reject(); }
          img.onload = function(){
            if (img.width > img.height) {
              wrap.setAttribute('shape', 'wide');
            }
            else if (img.height > img.width) {
              wrap.setAttribute('shape', 'tall');
            }
            resolve();
          }
          img.src = '../../images/slideshow/' + url;
      wrap.appendChild(img);    
      frag.appendChild(wrap);
      imageElements.push(wrap);
    });
  }))

]).then(response => {
  document.body.appendChild(frag);
  skipFrame(kenBurns);
  loop = setInterval(kenBurns, 8000);
  //song.play();
}).catch(error => {
  alert(error);
})

})();