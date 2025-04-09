
import * as THREE from '../../../../three.module.js';   //module文件内部引入的有core.js,需要一起拿出来
// import { OrbitControls } from '../../../../OrbitControls.js';
import { resizeRendererToDisplaySize } from '../../../utils/utils.js'

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
    const planeMat = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
    });
    planeMat.color.setRGB(1.5, 1.5, 1.5)
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    scene.add(mesh);
}

export const lightGenerate = ({ scene, loader, renderer, camera }) => {
    // 灯光
    const skyColor = 0xb1e1ff; // light blue
    const groundColor = 0xb97a20; // brownish orange
    const intensity = 2;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);

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
        wireframe: true,
    });
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
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
    });
    const mesh = new THREE.Mesh(boxGeo, boxMat);
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