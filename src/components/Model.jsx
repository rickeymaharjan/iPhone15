import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ModelView from "./ModelView"
import { useState, useRef, useEffect } from "react"
import { yellowImg } from "../utils"
import { models, sizes } from "../constants"

import * as THREE from "three"
import { View } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { animateWithGsapTimeline } from "../utils/animations"

function Model() {
  const [size, setSize] = useState("small")
  const [model, setModel] = useState({
    id: 1,
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    img: yellowImg,
  })

  // camera control
  const cameraControllSmall = useRef()
  const cameraControllLarge = useRef()

  // model
  const small = useRef(new THREE.Group())
  const large = useRef(new THREE.Group())

  // rotation
  const [smallRotation, setSmallRotation] = useState(0)
  const [largeRotation, setLargeRotation] = useState(0)

  const tl = gsap.timeline()

  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 1,
      })
    }

    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view1", "#view2", {
        transform: "translateX(0)",
        duration: 1,
      })
    }
  }, [size])

  useGSAP(() => {
    gsap.to("#heading", {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: "#heading",
      },
    })
  }, [])

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControllSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />

            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControllLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>
          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={item.id}
                    className="w-6 h-6 mx-2 rounded-full cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>

              <div className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn cursor-pointer"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Model
