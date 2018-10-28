function init() {
  console.log('VIDEO SCRIPT')
  const tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  const [firstScriptTag] = document.getElementsByTagName('script')
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

  window.onYouTubeIframeAPIReady = () => {
    console.log('onYouTubeIframeAPIReady')
    const player = new YT.Player('video1', {
      // videoId: '6So3Jru5Y1w',
      videoId: 'i7PniwJqyz0',
      playerVars: {
        controls: 0,
        modestbranding: 1,
        showinfo: 0,
        hl: 'it',
        rel: 0,
        autoplay: 1,
        mute: 1,
        fs: 0,
        loop: 1,
        playlist: 'i7PniwJqyz0' }
    })
  }
}

module.exports = {
  init
}
