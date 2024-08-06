import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { heroVideo, smallHeroVideo } from "../utils"
import { useEffect, useState } from "react"

function Hero() {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth > 768 ? heroVideo : smallHeroVideo
  )

  const handleVideoSrcSet = () => {
    if (window.innerWidth > 768) {
      setVideoSrc(heroVideo)
    } else {
      setVideoSrc(smallHeroVideo)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet)

    return () => {
      window.removeEventListener("resize", handleVideoSrcSet)
    }
  }, [])

  useGSAP(() => {
    gsap.to(".hero-title", {
      opacity: 1,
      delay: 2,
    })

    gsap.to("#cta", {
      opacity: 1,
      y: 0,
      delay: 2,
    })
  }, [])

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p className="hero-title">iPhone 15 Pro</p>
        <div className="w-9/12 md:w-10/12">
          <video
            className="pointer-events-none"
            muted
            autoPlay
            key={videoSrc}
            playsInline={true}
          >
            <source src={videoSrc} />
          </video>
        </div>

        <div
          id="cta"
          className="flex flex-col items-center opacity-0 translate-y-20"
        >
          <a href="#highlights" className="btn">
            Buy
          </a>
          <p className="font-normal text-xl">From $199/month or $999</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
