// import BezierEasing from 'bezier-easing'
// import splitText from '../utils/split-text'

// class TextAnimation {
//   /**
//    * Constructor
//    * @param {anime.timeline} timeline
//    */
//   constructor(timeline) {
//     this.mainTimeline = timeline

//     this.DOM = {
//       button: document.querySelector('.intro__button'),
//       divider: document.querySelector('.intro__divider'),
//       title: document.querySelector('.animations__title'),
//       mainTitle: document.querySelector('.intro__header h1'),
//       mainTitleSub: document.querySelector('.intro__title--sub'),
//       mainContent: document.querySelectorAll('.intro__entry p'),
//       footerLink: document.querySelector('.intro__footer .intro__link')
//     }

//     this.customEasing = BezierEasing(0.83, -0.44, 0.2, 1)

//     // Main methods
//     this.textAnimation = this.textAnimation.bind(this)
//     this.hoverAnimation = this.hoverAnimation.bind(this)

//     // Main functions
//     this.mount = this.mount.bind(this)
//     this.firstTextAnimation = this.firstTextAnimation.bind(this)
//     this.secondTextAnimation = this.secondTextAnimation.bind(this)

//     this.mount()
//   }

//   /**
//    * Init
//    */
//   mount() {}

//   hoverAnimation(element, rotateZ, translateX, translateY) {
//     anime.remove(element)
//     anime({
//       targets: element,
//       rotateZ,
//       translateY,
//       translateX,
//       duration: 300,
//       easing: 'easeInOutBack'
//     })
//   }

//   firstTextAnimation() {
//     const splittedMain = splitText(this.DOM.title)

//     console.log(splittedMain)
//     this.textAnimation(splittedMain.slice(0, splittedMain.length - 1), '', {
//       translateY: [100, 0]
//     })

//     this.textAnimation(splittedMain[splittedMain.length - 1], '+=200', {
//       translateY: [100, 0],
//       delay: anime.stagger(40),
//       begin: () => {
//         anime({
//           targets: [
//             ...splittedMain.slice(1, 7),
//             ...splittedMain.slice(8, 10),
//             ...splittedMain.slice(11, 18),
//             ...splittedMain.slice(19, 21)
//           ],
//           width: el => [el.offsetWidth, 0],
//           easing: () => t => this.customEasing(t)
//         })
//       }
//     })
//   }

//   secondTextAnimation() {
//     this.textAnimation(splitText(this.DOM.mainTitleSub), '-=1400', {
//       translateY: [30, 0],
//       opacity: [0, 1],
//       delay: anime.stagger(20),
//       complete: () => {
//         this.DOM.divider.classList.add('intro__divider--active')
//       }
//     })

//     this.textAnimation(splitText(this.DOM.mainTitle), '-=1200', {
//       translateY: [30, 0],
//       opacity: [0, 1],
//       delay: anime.stagger(20)
//     })

//     this.textAnimation(
//       splitText(this.DOM.mainContent.firstChild, 'words'),
//       '-=1000',
//       {
//         rotateZ: [3, 0],
//         opacity: [0, 1],
//         delay: anime.stagger(20)
//       }
//     )

//     const showWords = splitText(this.DOM.footerLink, 'words')
//     const lastChar = showWords[showWords.length - 1]

//     lastChar.classList.add('intro__link-ponctuation')

//     this.textAnimation(showWords, '-=1000', {
//       rotateZ: [3, 0],
//       opacity: [0, 1],
//       delay: anime.stagger(20),
//       complete: () => {
//         this.DOM.footerLink.classList.add('intro__link--active')
//         this.DOM.button.classList.add('intro__button--active')

//         anime({
//           targets: document.querySelector('.slider__link'),
//           duration: 700,
//           opacity: 1
//         })

//         anime({
//           targets: document.querySelector('.slider__link .slider__icon'),
//           duration: 300,
//           translateX: [-10, 0],
//           opacity: [0, 0, 1],
//           easing: 'easeOutCubic',
//           delay: 300
//         })
//       }
//     })
//   }
// }

// export default TextAnimation

import anime from 'animejs'

const textAnimation = (
  timeline,
  element,
  timelineDelay = '',
  {
    translateX = 0,
    translateY = [30, 0],
    delay = anime.stagger(40),
    duration = 800,
    opacity = 1,
    easing = 'easeOutExpo',
    begin,
    complete,
  }
) => {
  if (!element) {
    return false
  }

  timeline.add(
    {
      targets: element,
      translateX,
      translateY,
      duration,
      easing,
      delay,
      opacity,
      begin,
      complete,
    },
    timelineDelay
  )
}

export default textAnimation
