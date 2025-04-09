
import * as THREE from '../../three.module.js';   //module文件内部引入的有core.js,需要一起拿出来
export const resizeRendererToDisplaySize = (renderer)=> {  // resize the renderer to the display size
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {

        renderer.setSize(width, height, false);

    }

    return needResize;
}


export const main = (callback,id='c')=>{
    const canvas = document.querySelector(`#${id}`);
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({   //渲染器
        canvas, antialias: true
    });

    function render(time,call) {
        call(time)
    }
    callback({canvas,scene,renderer,render})
}