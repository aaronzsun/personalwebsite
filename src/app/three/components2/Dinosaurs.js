import React, { useRef, useEffect } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as THREE from 'three'

const Dinosaur = ({ url, position, clipName }) => {
  const model = useRef()
  const mixer = useRef()

  // Load the dinosaur model
  const fbx = useLoader(FBXLoader, url)

  useEffect(() => {
    if (fbx) {
      // Set initial position, scale, and rotation
      fbx.scale.set(0.01, 0.01, 0.01)
      fbx.position.set(...position)
      fbx.rotation.y = Math.PI // Rotate to face the camera

      model.current = fbx

      // Initialize animation mixer if there are animations
      mixer.current = new THREE.AnimationMixer(fbx)
      if (fbx.animations.length > 0) {        
        // Find the animation clip by name or use the first clip
        const clip = clipName
          ? fbx.animations.find((anim) => anim.name === clipName) || fbx.animations[0]
          : fbx.animations[0]
        
        // Play the selected animation
        if (clip) {
          const action = mixer.current.clipAction(clip)
          action.play()
        }
      }
    }
  }, [fbx, position, clipName])

  // Update the animation mixer on each frame
  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta)
  })

  return model.current ? <primitive object={model.current} /> : null
}

const Dinosaurs = () => {
  // Array of dinosaur file paths and animation names
  const dinosaurFiles = [
    { url: '/Trex.fbx', clipName: 'Armature|TRex_Attack' },
    { url: '/Stegosaurus.fbx', clipName: 'Armature|Stegosaurus_Attack' },
    { url: '/Velociraptor.fbx', clipName: 'Armature|Velociraptor_Jump' },
    { url: '/Triceratops.fbx', clipName: 'Armature|Triceratops_Attack' },
    { url: '/Parasaurolophus.fbx', clipName: 'Armature|Parasaurolophus_Jump' },
    { url: '/Apatosaurus.fbx', clipName: 'Armature|Apatosaurus_Attack' },
  ]

  return (
    <group>
      {dinosaurFiles.map((dino, index) => (
        <Dinosaur
          key={dino.url}
          url={dino.url}
          position={[-40 + index * 16, 0, 0]} // Spacing each model on the X-axis
          clipName={dino.clipName} // Specify animation name
        />
      ))}
    </group>
  )
}

export default Dinosaurs
