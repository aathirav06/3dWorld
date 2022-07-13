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

  loader1.load(
    "resources/avatar.glb",

    function (glb) {
      console.log(glb);
      const root = glb.scene;
      scene.add(root);
    },
    function (error) {
      console.log("error occured");
    }
  );

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
