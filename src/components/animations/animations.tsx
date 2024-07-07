/* eslint-disable @typescript-eslint/no-unused-vars */
import gsap from 'gsap';

// Declare a general timeline to use in all the animation functions.
const tl = gsap.timeline();

// Define breakpoints
const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024
};

// Define the type for the size parameter to ensure it matches the keys of the breakpoints object
type DeviceSize = 'mobile' | 'tablet' | 'desktop';

// Utility function to check device size with explicitly typed parameter
const isDevice = (size: DeviceSize) => {
  const width = window.innerWidth;
  return width <= breakpoints[size];
};

// Preloader Animation
export const preLoaderAnim = (): void => {
  const scaleValue = isDevice('mobile') ? 1 : 1.5; // Smaller scale on mobile
  gsap.set('.paw', { scale: scaleValue });

  tl.to('body', {
    duration: 0.05, // Reduced from 0.1
    css: { overflowY: 'scroll' },
    ease: 'power3.inOut'
  })
    .to('.texts-container', {
      duration: 0, // Remains the same as it's already instant
      opacity: 1,
      ease: 'Power3.easeOut'
    })
    .from('.paw', {
      duration: isDevice('mobile') ? 0.5 : 0.75, // Shorter duration on mobile
      delay: 0, // Remains the same
      y: 70,
      skewY: 10,
      opacity: 0,
      ease: 'Power3.easeOut'
    })
    .to('.paw', {
      opacity: 1, // This part of the animation is more about visibility, duration adjustment not required
      ease: 'Power3.easeOut'
    })
    .from('.texts-container span', {
      duration: 0.7, // Reduced from 1.4
      delay: -0.625, // Adjusted to half of -1.25
      y: 70,
      skewY: 10,
      stagger: 0.2, // Reduced stagger time to maintain faster animation flow
      ease: 'Power3.easeOut',
      onStart: function () {
        gsap.set('.texts-container span', { marginRight: '4px' });
      }
    })
    .to('.paw', {
      duration: 0.75, // Reduced from 1.5
      y: 0,
      opacity: 0,
      ease: 'Power3.easeIn'
    })
    .to('.texts-container span', {
      duration: 0.5, // Reduced from 1
      y: 70,
      skewY: -20,
      stagger: 0.1, // Reduced stagger time to maintain faster animation flow
      ease: 'Power3.easeOut'
    })
    .to('body', {
      duration: 0.1, // Reduced from 0.2
      delay: -0.5, // Reduced delay to make the sequence faster
      css: { overflowY: 'scroll' },
      ease: 'power3.inOut'
    })
    .to('.preloader', {
      duration: 0.75, // Reduced from 1.5
      height: '0vh',
      ease: 'Power3.easeOut'
    }); // Adjusted the overlap to make the sequence faster
  // .from(".landing__main .text", {
  //   duration: 2,
  //   y: 10,
  //   opacity: 0,
  //   stagger: {
  //     amount: 2,
  //   },
  //   ease: "power3.easeInOut",
  // })
  // .from(".links .item", {
  //   duration: 0.5,
  //   opacity: 0,
  //   delay: window.innerWidth < 763 ? -3 : -0.6,
  //   stagger: {
  //     amount: 0.5,
  //   },
  //   ease: "expo.easeOut",
  //   onComplete: animateMainShape,
  // })
  // .from(".main-circle", {
  //   duration: 1,
  //   opacity: 0,
  //   ease: "power3.easeInOut",
  //   onComplete: animateShapes,
  // })
  // .from(".shapes .shape", {
  //   duration: 1,
  //   opacity: 0,
  //   delay: -1,
  //   ease: "power3.easeInOut",
  //   stagger: 1,
  // })
  // .to(".preloader", {
  //   duration: 0,
  //   css: { display: "none" },
  // });
};

// export const openMenu = (): void => {
//   const tl = gsap.timeline();
//   tl.to("body", {
//     duration: 0.1,
//     css: { overflowY: "hidden" },
//     ease: "power3.out",
//   })
//     .to(".hamburger-menu", {
//       duration: 0.1,
//       css: { display: "block" },
//     })
//     .to(".header-item", {
//       duration: 0.1,
//       css: { background: "none" },
//     })
//     .to(".cls-1", {
//       duration: 0.1,
//       delay: 0.3,
//       css: { fill: "#ffffff" },
//     })
//     .to(
//       [".nav-secondary", ".nav-primary"],
//       {
//         duration: 0.8,
//         height: "100%",
//         transformOrigin: "right top",
//         stagger: {
//           amount: 0.1,
//         },
//         ease: "power3.inOut",
//       },
//       "-=.5"
//     )
//     .from(
//       ".nav-link",
//       {
//         duration: 0.5,
//         x: -80,
//         opacity: 0,
//         stagger: {
//           amount: 0.5,
//         },
//         ease: "Power3.in",
//       },
//       "-=.3"
//     );
// };

// export const closeMenu = (): void => {
//   const tl = gsap.timeline();
//   tl.to("body", {
//     duration: 0.05,
//     css: { overflowY: "scroll" },
//     ease: "power3.inOut",
//   })
//     .to([".nav-primary", ".nav-secondary"], {
//       duration: 0.8,
//       height: "0",
//       transformOrigin: "right top",
//       stagger: {
//         amount: 0.1,
//       },
//       ease: "power3.inOut",
//     })
//     .to(".cls-1", {
//       duration: 0.1,
//       delay: -0.3,
//       css: { fill: "#08e7f3" },
//     })
//     .to(".header-item", {
//       duration: 0.5,
//       css: { background: "rgba(11,11,15,.8)" },
//     })
//     .to(".hamburger-menu", {
//       duration: 0.05,
//       css: { display: "none" },
//     });
// };

// export const fadeUp = (el: string, delay: number = 0): void => {
//   tl.from(el, {
//     y: 150,
//     duration: 1,
//     delay,
//     opacity: 0,
//     ease: "power3.Out",
//   });
// };

// export const mobileLanding = (): void => {
//   if (window.innerWidth < 763) {
//     tl.from(".landing__main2", {
//       duration: 1,
//       delay: 0,
//       opacity: 0,
//       y: 80,
//       ease: "expo.easeOut",
//     });
//   }
// };

// const animateShapes = (): void => {
//   const infiniteTl = gsap.timeline({
//     repeat: -1,
//   });
//   infiniteTl
//     .to(".shapes .shape", {
//       duration: 4,
//       rotate: 360,
//       delay: -1,
//       ease: "power3.easeInOut",
//       stagger: 2,
//     })
//     .to(".shapes .shape-3", {
//       duration: 1,
//       rotate: 360,
//       delay: -2,
//       ease: "power3.easeInOut",
//     })
//     .to(".shapes .shape", {
//       duration: 3,
//       rotate: 0,
//       ease: "power3.easeInOut",
//       stagger: 1,
//     })
//     .to(".shapes .shape", {
//       duration: 1,
//       opacity: 0,
//       delay: -1,
//       ease: "power3.easeInOut",
//       stagger: 1,
//     })
//     .to(".shapes .shape", {
//       duration: 1.5,
//       opacity: 1,
//       ease: "power3.easeInOut",
//       stagger: 1,
//     });
// };

// const animateMainShape = (): void => {
//   const infiniteTl = gsap.timeline({
//     repeat: -1,
//   });
//   infiniteTl
//     .to(".shapes .main-circle", {
//       duration: 6,
//       x: -30,
//       y: -50,
//       ease: "expo.easeOut",
//     })
//     .to(".shapes .main-circle", {
//       duration: 6,
//       x: -30,
//       y: 50,
//       ease: "expo.easeOut",
//     })
//     .to(".shapes .main-circle", {
//       duration: 4,
//       x: 0,
//       y: 0,
//       ease: "expo.easeOut",
//     });
// };

// export const boxHover = (e: MouseEvent): void => {
//   const tl = gsap.timeline();
//   // Ensure e.target is not null and is an HTMLElement
//   const target = e.target as HTMLElement | null;
//   if (window.innerWidth >= 986 && target) {
//     const link = target.querySelector(".link");
//     const boxAnims = target.querySelectorAll(".box-anim");
//     if (link) {
//       tl.to(link, {
//         duration: 0,
//         opacity: 1,
//       });
//     }
//     if (boxAnims.length > 0) {
//       tl.from(boxAnims, {
//         duration: 0.3,
//         opacity: 0,
//         y: 30,
//         stagger: 0.1,
//         ease: "Power3.easeOut",
//       });
//     }
//   }
// };

// export const boxExit = (e: MouseEvent): void => {
//   // Ensure e.target is not null and is an HTMLElement
//   const target = e.target as HTMLElement | null;
//   if (window.innerWidth >= 986 && target) {
//     const link = target.querySelector(".link");
//     if (link) {
//       gsap.to(link, {
//         duration: 0,
//         opacity: 0,
//       });
//     }
//   }
// };

// export const fadeIn = (el: string): void => {
//   gsap.to(el, {
//     duration: 2,
//     opacity: 1,
//     y: -60,
//     ease: "power4.out",
//   });
// };

// export const fadeOut = (el: string): void => {
//   gsap.to(el, {
//     duration: 1,
//     opacity: 0,
//     y: -20,
//     ease: "power4.out",
//   });
// };
