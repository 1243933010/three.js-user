
import * as THREE from '../../../../three.module.js';   //module文件内部引入的有core.js,需要一起拿出来
// import { OrbitControls } from '../../../../OrbitControls.js';
import { resizeRendererToDisplaySize, MinMaxGUIHelper, ColorGUIHelper } from '../../../utils/utils.js';
import { GUI } from '../../../../lil-gui.module.min.js';



export const initCamera = ({ camera }) => {
    console.log('initCamera', camera)
    camera.position.set(20, 15, -15);
    camera.lookAt(0, 0, 0);

    // const gui = new GUI();  // 摄像机控制器
    // // gui.add(camera, 'fov', 1, 180).onChange(updateCamera);
    // gui.add(camera, 'fov', 1, 180);
    // const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1);
    // // gui.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near').onChange(updateCamera);
    // // gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far').onChange(updateCamera);
    // gui.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near');
    // gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far');
}
export const plainGenerate = ({ scene, loader, renderer, camera }) => {
    // 地板
    const planeSize = 40;
    const texture = loader.load('../../image/checker.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);
    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
    });
    planeMat.color.setRGB(1.5, 1.5, 1.5)
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.receiveShadow = true;
    mesh.rotation.x = Math.PI * -.5;
    scene.add(mesh);
}

export const lightGenerate = ({ scene, loader, renderer, camera }) => {
    // 灯光
    // const skyColor = 0xb1e1ff; // light blue
    // const groundColor = 0xb97a20; // brownish orange
    // const intensity = 5;
    // const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);  //环境光，没有特定方向不显示阴影
    const light = new THREE.DirectionalLight(0xb3adad, 5);  //平行光，有特定方向显示阴影
    light.castShadow = true;
    light.position.set(5, 10, 2);

    // light.shadow.mapSize.width = 1024;
    // light.shadow.mapSize.height = 1024;
    // light.shadow.camera.near = 0.5;
    // light.shadow.camera.far = 50;
    scene.add(light);

    const helper = new THREE.DirectionalLightHelper(light);  // 点光源辅助,显示光源位置
    scene.add(helper);
    

    const gui = new GUI();  //快捷操作控制台设置
    gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    gui.add(light, 'intensity', 0, 5, 0.01);
    gui.add(light.target.position, 'x', -10, 10);
    gui.add(light.target.position, 'z', -10, 10);
    gui.add(light.target.position, 'y', 0, 10);
    makeXYZGUI(gui, light.position, 'position', updateLight(helper));
    makeXYZGUI(gui, light.target.position, 'target', updateLight(helper));

}

export const sphereGenerate = ({ scene, loader, renderer, camera }) => {
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(
        sphereRadius,
        sphereWidthDivisions,
        sphereHeightDivisions
    );
    const sphereMat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        // wireframe: true,
        flatShading: true,
        side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(-sphereRadius - 5, sphereRadius, 0);
    scene.add(mesh);
}

export const boxGenerate = ({ scene, loader, renderer, camera }) => {
    const boxWidth = 4;
    const boxHeight = 4;
    const boxDepth = 4;
    const boxGeo = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const boxMat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true,
        side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(boxGeo, boxMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(boxWidth + 5, boxHeight / 2, 0);
    scene.add(mesh);
}


export const renderFnc = ({ scene, loader, renderer, camera }) => {
    resizeRendererToDisplaySize(renderer);
    {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);

}


function makeXYZGUI(gui, vector3, name, onChangeFn) {
    const folder = gui.addFolder(name);
    folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
    folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
    folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
    folder.open();
}

function updateLight(helper) {
    helper.update();
}