
(function(){
 
  var images = [
    'baby-mj-pillow.jpg',
    'baby-mj-tugowar.jpg',
    'mj-puppy-string.jpg'
  ];

  Sass.setWorkerUrl('../js/sass.worker.js');
  var SassInstance = new Sass();
  Promise.all([

    Promise.all(images.map(function(url){
      return new Promise((resolve, reject) => {
        var img = document.createElement('img');
        img.onload = function(){ resolve(); }
        img.onerror = function(){ reject(); }
        img.src = '../../images/slideshow/' + url;
      });
    })),

    new Promise((resolve, reject) => {
      fetch('../css/slideshow/slideshow.scss').then(response => {
        response.text().then(scss => {
          var options = `
            $items: ${images.length};
            $animation-time: 6s;
            $transition-time: 2s;
            $scale: 20%;
            
            $total-time: ($animation-time * $items);
            $scale-base-1: (1 + $scale / 100%);
          `;
          SassInstance.compile(options + scss, function(result) {
            var style = document.createElement('style');
            style.innerHTML = result.text;
            document.head.appendChild(style)
            resolve();
          });    
        })
      })
    })

  ]).then(response => {
    var frag = document.createDocumentFragment();
    images.forEach(url => {
      var div = document.createElement('div');
      div.className = 'slideshow-image';
      div.style.backgroundImage = 'url(../images/slideshow/' + url + ')';
      console.log(div.style.backgroundImage);
      frag.appendChild(div);
    });
    slideshow.appendChild(frag);
  }).catch(error => {
    console.log(error);
  })

})();