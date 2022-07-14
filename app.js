function main() {
  const canvas = document.querySelector("#c");
  const fov = 100;
  const aspect = canvas.clientWidth / canvas.clientHeight;
  const near = 0.1;
  const far = 2000;

  //   const geometry=new THREE.BoxGeometry(1,1,1)
  //   const material=new THREE.MeshBasicMaterial({
  //     color:'red'
  //   })
  // const boxMesh=new THREE.Mesh(geometry,material)

  const loader1 = new THREE.GLTFLoader();

  //background
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 1;
  const renderer = new THREE.WebGLRenderer({ canvas });

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  renderer.setSize(width, height);

  new THREE.OrbitControls(camera, renderer.domElement);

  const scene = new THREE.Scene();
  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    "https://threejs.org/manual/examples/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg",
    () => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(renderer, texture);
      scene.background = rt.texture;
    }
  );
  // scene.add(boxMesh)

  //avatar
  const avatar = loader1.load(
    "resources/avatar.glb",

    function (glb) {
      console.log(glb);
      const root = glb.scene;
      scene.add(root);
      root.position.set(0,-2,0);
    }
    
  );

  // scene.add(avatar);
  // avatar.position.set(100,100,100);

  //light in avatar
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(2, 2, 5);
  scene.add(light);

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function ambientSetup() {
  var ambientLight = new THREE.AmbientLight(0xcccccc, 0.8);
  scene.add(ambientLight);
  var pointLight = new THREE.PointLight(0xFFC5CB, .8);
  pointLight.position.copy(camera.position);
  scene.add(pointLight);
}

//responsive

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
}



main();
