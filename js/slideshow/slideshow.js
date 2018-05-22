
(function(){
  
  var clicked;
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
    'couch-with-syd.jpg',
    'deck-with-syd.jpg',
    'grass-with-cassie.jpg',
    'syd-hug-park.jpg',
    'legs-crossed-grass.jpg'
  ];
  var imageCount = imagePaths.length;
  var assetCount = imageCount + 2;
  var skipFrame = function(fn){
    return requestAnimationFrame(function(){
      requestAnimationFrame(fn)
    });
  }
  
  document.body.setAttribute('progress', 'start');
  function updateProgress(){
    if (--assetCount > 0) document.body.setAttribute('progress', Math.round(100 / assetCount));
    else document.body.removeAttribute('progress');
  };

  function kenBurns() {
    if (index == imageCount) {
      return clearInterval(loop);
    }
    if (last) last.setAttribute('fx', 'out');
    (last = imageElements[index]).setAttribute('fx', 'in')
    index++;
  }

  document.addEventListener('transitionend', function(e){
    if (e.target.getAttribute('fx') == 'out') e.target.removeAttribute('fx');
  });

var listener = document.addEventListener('click', function(){

  Promise.all([

    // new Promise(function(resolve, reject) {
    //   document.addEventListener('click', function(){
    //     updateProgress();
    //     resolve();
    //   })
    // }),

    new Promise(function(resolve, reject) {
      song = new Audio('audio/see-you-again.mp3');
      song.preload = 'auto';
      song.oncanplay = function(){
        updateProgress();
        resolve();
      }
    }),

    Promise.all(imagePaths.map(function(url){
      return new Promise(function(resolve, reject) {
        var wrap = document.createElement('div');
            wrap.classList.add('slide');
        var img = document.createElement('img');
            img.onerror = function(){ reject(); }
            img.onload = function(){
              updateProgress();
              if (img.width > img.height) {
                wrap.setAttribute('shape', 'wide');
              }
              else if (img.height > img.width) {
                wrap.setAttribute('shape', 'tall');
              }
              resolve();
            }
            img.src = 'images/slideshow/' + url;
        wrap.appendChild(img);    
        frag.appendChild(wrap);
        imageElements.push(wrap);
      });
    }))

  ]).then(function(response) {
    updateProgress();
    document.body.appendChild(frag);
    skipFrame(kenBurns);
    loop = setInterval(kenBurns, 8500);
    song.play();
  }).catch(function(error) {
    alert("There was a problem in loading the assets");
  })

  document.removeEventListener('click', listener);
});

})();