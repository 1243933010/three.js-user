
import * as THREE from '../../../../three.module.js';   //module
import { resizeRendererToDisplaySize } from '../../../utils/utils.js'


export const lightGenerate = ({ scene, loader, renderer, camera }) => {  // light
    // 灯光
    const color = 0xFFFFFF;
    const intensity = 50;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 0, 1);
    scene.add(light);
    lightHelper({ scene, light })

}

const lightHelper = ({ scene, light, renderer, camera }) => {  // light
    const helper = new THREE.DirectionalLightHelper(light, 0.2);
    scene.add(helper);
}

export const rtBoxGenerate = ({ rtScene, loader, renderer, camera }) => {  // box
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);


    const rtCubes = [
        makeInstance(rtScene, geometry, 'green', 0),
        makeInstance(rtScene, geometry, 'yellow', -2),
        makeInstance(rtScene, geometry, 'blue', 2),
    ];
    return { rtCubes }
}


export const boxGenerate = ({ scene, loader, renderTarget, camera }) => {  // box
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const material = new THREE.MeshPhongMaterial({
        map: renderTarget.texture,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    return { cube }
}


const makeInstance = (rtScene, geometry, color, x) => {
    // const material = new THREE.MeshBasicMaterial({ color });
    const material = new THREE.MeshPhongMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    rtScene.add(cube);
    cube.position.x = x;
    return cube;
}


const initWebGLRenderTarget = () => {
    const rtWidth = 512;
    const rtHeight = 512;
    const renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight);
    return { rtWidth, rtHeight, renderTarget }
}

export const initRtCamera = ({ scene, loader, renderer, camera }) => {
    return new Promise((resolve, reject) => {
        const { rtWidth, rtHeight, renderTarget } = initWebGLRenderTarget()
        const rtFov = 75;
        const rtAspect = rtWidth / rtHeight;
        const rtNear = 0.1;
        const rtFar = 5;
        const rtCamera = new THREE.PerspectiveCamera(rtFov, rtAspect, rtNear, rtFar);
        rtCamera.position.z = 2;

        const rtScene = new THREE.Scene();
        rtScene.background = new THREE.Color('red');
        resolve({ rtCamera, rtScene, renderTarget })
    })
}

export const initCamera = ({ scene, loader, renderer, camera }) => {
    return new Promise((resolve, reject) => {
        const fov = 75;
        const aspect = 2; // the canvas default
        const near = 0.1;
        const far = 5;
        camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
        camera.position.z = 2;

        // const helper = new THREE.CameraHelper(camera);
        // scene.add(helper);
        resolve(camera)
    })
}
export const renderFnc = ({ scene, time, renderer, camera, rtCubes, renderTarget, rtScene, rtCamera, cube }) => {
    resizeRendererToDisplaySize(renderer);
    // if (resizeRendererToDisplaySize(renderer)) {
    //     const canvas = renderer.domElement;
    //     camera.aspect = canvas.clientWidth / canvas.clientHeight;
    //     camera.updateProjectionMatrix();

    //     renderTarget.setSize(canvas.width, canvas.height);
    //     rtCamera.aspect = camera.aspect;
    //     rtCamera.updateProjectionMatrix();
    // }
    // rotate all the cubes in the render target scene
    rtCubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
    });
    renderer.setRenderTarget(renderTarget);
    renderer.render(rtScene, rtCamera);
    renderer.setRenderTarget(null);
    cube.rotation.x = time;
    cube.rotation.y = time * 1.1;

    renderer.render(scene, camera);

}