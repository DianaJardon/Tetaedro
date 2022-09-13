//ESCENA 
const scene = new THREE.Scene();

//Estadisticas
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

//Dat.gui - Inicio controles
const controls ={
    size:5,
    color: "#00FFBC"
};

//OBJETO
var geometry = new THREE.OctahedronGeometry(controls.size, 0);
const material = new THREE.MeshBasicMaterial({color: controls.color, wireframe: true});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//CONTROLES
const gui = new dat.GUI();
const c_mesh_size = gui.add(controls, 'size',1,20);
const c_mesh_color = gui.addColor(controls, 'color',0,100);

//TAMAÑO
c_mesh_size.onChange(function(){
    mesh.geometry = new THREE.OctahedronGeometry(controls.size,0);
});

//COLOR
c_mesh_color.onChange(function(){
    mesh.material = new THREE.MeshBasicMaterial({color: controls.color});
});

//TAMAÑOS
const sizes = {
    width: 800,
    height: 600

};

//CAMARA
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);
camera.position.z = 30;
scene.add(camera);

//LIENZO
const canvas = document.querySelector('canvas.webgl');

//RENDERER
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement)

//Orbit
const orb = new THREE.OrbitControls(camera, renderer.domElement);

//EJES
// THE X axis is red.   The Y axis is green. The Z axis is blue
const axes = new THREE.AxesHelper(20);
scene.add(axes);

//Animacion
function animation(time){
    stats.begin();
    mesh.rotation.x = time/2000;
    mesh.rotation.y = time/1000;
    stats.end();
    renderer.render(scene,camera);

}