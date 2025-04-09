
import * as THREE from '../../three.module.js';   //module文件内部引入的有core.js,需要一起拿出来
export const resizeRendererToDisplaySize = (renderer) => {  // resize the renderer to the display size
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {

        renderer.setSize(width, height, false);

    }

    return needResize;
}


export const main = (callback, id = 'c') => {
    const canvas = document.querySelector(`#${id}`);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100)
    const loader = new THREE.TextureLoader();
    const renderer = new THREE.WebGLRenderer({   //渲染器
        canvas, antialias: true
    });
 
    callback({ canvas, scene, renderer,loader, camera })
}