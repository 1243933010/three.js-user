
import * as THREE from '../../../../three.module.js';   //module文件内部引入的有core.js,需要一起拿出来
// import { OrbitControls } from '../../../../OrbitControls.js';
import { resizeRendererToDisplaySize } from '../../../utils/utils.js'
import { GUI } from '../../../../lil-gui.module.min.js';

export const lightGenerate = ({ scene, loader, renderer, camera }) => {  // light
    // 灯光
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(- 1, 2, 4);
    scene.add(light);
    // light.position.set(0, 0, 0);
    // lightHelper({ scene, light, renderer, camera })

}

const lightHelper = ({ scene, light, renderer, camera }) => {
    let helper = new THREE.DirectionalLightHelper(light, 1);
    scene.add(helper);
}

export const boxGenerate = ({ scene, loader, renderer, camera }) => {  // box
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const cubes = [
        makeInstance(scene, geometry, 'red', 0),
        makeInstance(scene, geometry, 0x8844aa, - 2),
        makeInstance(scene, geometry, 0xaa8844, 2),
    ];
    return cubes;
}

const makeInstance = (scene, geometry, color, x) => {
    const material = new THREE.MeshPhongMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.x = x;
    return cube;
}



export const initFog = ({ scene, loader, renderer, camera }) => {
    const color = 'lightblue';
    const near = 1;
    const far = 2;
    scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color(color);

    const gui = new GUI();
    const fogGUIHelper = new FogGUIHelper(scene.fog,scene.background);
    gui.add(fogGUIHelper, 'near', near, far).listen();
    gui.add(fogGUIHelper, 'far', near, far).listen();
    gui.addColor(fogGUIHelper, 'color').name('fogColor');
}

export const initFogExp2 = ({ scene, loader, renderer, camera }) => {
    const color = 'lightblue';
    const density = 0.1;
    scene.fog = new THREE.FogExp2(color, density);
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

export const initRenderer = ({ canvas, loader, renderer, camera }) => {
    return new Promise((resolve, reject) => {
        renderer = new THREE.WebGLRenderer({   //渲染器
            canvas, antialias: true
        })
        resolve(renderer)
    })
}

export const renderFnc = ({ scene, cubes, renderer, camera, time }) => {
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;

    });

    renderer.render(scene, camera);

}


// We use this class to pass to lil-gui
// so when it manipulates near or far
// near is never > far and far is never < near
class FogGUIHelper {
    constructor(fog,backgroundColor) {
        this.fog = fog;
        this.backgroundColor = backgroundColor;
    }
    get near() {
        return this.fog.near;
    }
    set near(v) {
        this.fog.near = v;
        this.fog.far = Math.max(this.fog.far, v);
    }
    get far() {
        return this.fog.far;
    }
    set far(v) {
        this.fog.far = v;
        this.fog.near = Math.min(this.fog.near, v);
    }
    get color() {
        return `${this.fog.color.getHexString()}`;
      }
      set color(hexString) {
        this.fog.color.set(hexString);
        this.backgroundColor.set(hexString);
      }
}