
import * as THREE from '../../three.module.js';   //module文件内部引入的有core.js,需要一起拿出来
// import { OrbitControls } from '../../OrbitControls.js';
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

/**
 * @param {string} id  // canvas id
 * @param {boolean} renderBool   // 是否执行默认渲染renderer
 * @returns {object} // 返回一个对象
 */

export const main = (callback, id = 'app', renderBool = true) => {
    const canvas = document.querySelector(`#${id}`);
    const scene = new THREE.Scene();
    const camera = null;
    const loader = new THREE.TextureLoader();
    const renderer = renderBool ? new THREE.WebGLRenderer({   //渲染器
        canvas, antialias: true
    }) : null;

    callback({ canvas, scene, renderer, loader, camera })
}

export const mainAsync = async (id = 'app', renderBool = true) => {  //初始化mian同步函数
    return new Promise((resolve, reject) => {
        const canvas = document.querySelector(`#${id}`);
        const scene = new THREE.Scene();
        const camera = null;
        const loader = new THREE.TextureLoader();
        const renderer = renderBool ? new THREE.WebGLRenderer({   //渲染器
            canvas, antialias: true
        }) : null;
        resolve({ canvas, scene, renderer, loader, camera })
    })
}

export class MinMaxGUIHelper {  // 最小最大辅助类
    constructor(obj, minProp, maxProp, minDif) {
        this.obj = obj;
        this.minProp = minProp;
        this.maxProp = maxProp;
        this.minDif = minDif;
    }
    get min() {
        return this.obj[this.minProp];
    }
    set min(v) {
        this.obj[this.minProp] = v;
        this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif);
    }
    get max() {
        return this.obj[this.maxProp];
    }
    set max(v) {
        this.obj[this.maxProp] = v;
        this.min = this.min;  // 这将调用min的setter
    }
}


export class ColorGUIHelper {  // 颜色辅助类
    constructor(object, prop) {
        this.object = object;
        this.prop = prop;
    }
    get value() {
        return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
        this.object[this.prop].set(hexString);
    }
}