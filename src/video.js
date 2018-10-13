function init() {
  console.log('VIDEO SCRIPT')
  var tag = document.createElement('script')
  tag.src = "https://www.youtube.com/iframe_api"
  var firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

  let player

  window.onYouTubeIframeAPIReady = function () {
    console.log('onYouTubeIframeAPIReady')
    player = new YT.Player('video1', {
      // videoId: '6So3Jru5Y1w',
      videoId: 'ApPUsXBdM-4',
      playerVars: { 'controls': 0,
        'modestbranding': 1,
        'showinfo': 0,
        'hl': 'it',
        'rel': 0,
        'autoplay': 1,
        'fs': 0,
        'loop': 1,
        'playlist': 'ApPUsXBdM-4' },
      events: {
        'onReady': onPlayerReady
      }      
    })
  }

  function onPlayerReady(event) {
    event.target.setVolume(0)
  };

  // function pauseAndReset(video) {
  //   video.pauseVideo();
  //   video.seekTo(0);
  // };

  // function cleanTime(event) {
  //   return Math.round(event.target.getCurrentTime());
  // };
}

module.exports = {
  init
}