
function deviceIsMobile () {
  return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

function init() {
  if (deviceIsMobile()) {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const [firstScriptTag] = document.getElementsByTagName('script')
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    window.onYouTubeIframeAPIReady = () => {
      const player = new YT.Player('video1', {
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
          playlist: 'i7PniwJqyz0'
        },
        events: {
          onReady: e => {
            e.target.setPlaybackRate(0.5)
          },
        }
      })
    }
  } else {
    document.getElementsByClassName('video-background')[0].style.visibility = 'hidden'
  }
}

// function handleVideoVisibility () {
//   console.log('yesh')
// }

// window.onresize = handleVideoVisibility

module.exports = {
  init
}
