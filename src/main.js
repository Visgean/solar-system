import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new OrbitControls(camera, renderer.domElement);

camera.position.z = 20;
const solarSystem = new THREE.Group();

var planets = {};


function addPlanet(name, texture_img, x, y, z, scale) {
    const geometry = new THREE.SphereGeometry(scale, 100, 100);
    const texture = new THREE.TextureLoader().load(texture_img);
    const material = new THREE.MeshBasicMaterial({map: texture});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = x * 30;
    mesh.position.y = y * 30;
    mesh.position.z = z * 30;

    solarSystem.add(mesh);
    planets[name] = mesh;

}

addPlanet(
    "sun", "2k_sun.jpg", 0, 0, 0, 5
)



addPlanet("earth", "2k_earth.jpg", 100.99257994, 200.15395086, 2000.06650338, 1)
addPlanet("mars", "2k_mars.jpg", 0.91064657, -0.94533285, -0.45806822, 0.5319525132609245)
addPlanet("moon", "2k_moon.jpg", -0.9937754, -0.15619312, -0.06766901, 0.3)
addPlanet("saturn", "2k_saturn.jpg", 9.13874944, -2.86560866, -1.57726082,  9.139681737812579)
addPlanet("uranus", "2k_uranus.jpg", 11.98533402, 14.25772753, 6.07497481, 3.980550644102046)
addPlanet("pluto", "2k_pluto.jpg", 17.45188001, -27.04699781, -13.69875493, 0.1)
addPlanet("jupiter", "2k_jupiter.jpg", 2.96683615, 3.72077824, 1.52263345, 10.972720383935338)
addPlanet("mercury", "2k_mercury.jpg", -0.30466007, 0.14223795, 0.10733785, 0.3829249810558222)
addPlanet("neptune", "2k_neptune.jpg", 29.84863691, -1.1270209, -1.20441876, 3.8643596867895935)
addPlanet("venus", "2k_venus.jpg", 0.60789327, -0.34195746, -0.1925257, 0.9497347815104824)


scene.add(solarSystem);


async function loadLocations() {
    const response = await fetch('https://visgean.me/planets/');
    const locations = await response.json();

    for (const planet in planets) {
        const location = locations[planet];
        planets[planet].position.x = location[0] * 30;
        planets[planet].position.y = location[1] * 30;
        planets[planet].position.z = location[2] * 30;
    }

    }

loadLocations();


function animate() {
    for (const planet in planets) {
        planets[planet].rotation.x += 0.01;
        planets[planet].rotation.y += 0.01;
    }

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();