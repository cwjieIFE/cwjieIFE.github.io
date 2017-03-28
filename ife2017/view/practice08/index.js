window.onload = () => {
  let renderer = new THREE.WebGLRenderer({ // 渲染器
    canvas: document.getElementById('canvas'),
    antialias: true,
    precision: "highp"
  })
  renderer.setClearColor(0x666666);
  let scene = new THREE.Scene(); // 场景
  let camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000); // 照相机
  camera.position.set(4,4,4);
  camera.lookAt(new THREE.Vector3(0,0,0));
  scene.add(camera);
  let directionalLight = new THREE.DirectionalLight();
  directionalLight.position.set(2,4,3);
  scene.add(directionalLight); // 添加平行光源
  let material = new THREE.MeshLambertMaterial({ // 材质很重要
    color: 0xffffff
  })
  let cube = new THREE.Mesh(new THREE.BoxGeometry(4, 2, 2),material) // 画车身
  function drawTyre(r,w,posX,posY,posZ){ // 画轮胎
    let tyre = new THREE.Mesh(new THREE.TorusGeometry(r,w,18,18),material);
    tyre.position.set(posX,posY,posZ)
    scene.add(tyre)
  }
  scene.add(cube);
  cube.position.set(0,0,0);
  drawTyre(0.4,0.2,-1.2,-0.7,1.1);
  drawTyre(0.4,0.2,1.2,-0.7,1.1);
  drawTyre(0.4,0.2,1.2,-0.7,-1.1);
  drawTyre(0.4,0.2,-1.2,-0.7,-1.1);
  renderer.render(scene, camera); // 渲染
}