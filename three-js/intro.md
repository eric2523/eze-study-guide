# Some Intro Stuff

## Creating the Scene

We need to create the scene with three things: **scene**, **camera** and **renderer**

Example:

```js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

We're gonna focus on the **PerspectiveCamera** for now.

- first attribute <span style="color:orange">(75)</span> is the **FOV**: extent of the scene that is visible on the display at any given time
- second attribute is **aspect ratio**: almost always want to use width of ele / height of ele to maintain 1:1 ratio or else img can look squished like a widescree TV
- third and fourth attr is **near** and **far** clipping plane
  - objects further away from the camera than the value of **far** or closer than **near** won't be rendered
  - may want to use diff values in the future to increase performance
  - its essentially render distance

The <span style="color:lightblue">renderer</span> instance is instantiated and is typically a WebGLRenderer. Three.js has other falbacks for some older browsers.

- we need to `.setSize(w, h)` at which we want to render our app
- good idea to use w and h of area we want to fill with our app
- can use `.setSize(w, h, false)` third param (updateStyle) to render at lower res

Finally the renderer needs to be added to our HTML doc. This is a `<canvas>` element that renderer uses to display the scene to us.

## Creating a Cube

Look at creating a **mesh**. Below is some sample code. We set the camera position to 5 because by default the cube is rendered at (0,0,0) which makes the camera and cube inside each other.

```js
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;
```

We also need an animate frame loop to continously render our object onto the canvas.

```js
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
```

![graph-1](./graph-1.svg)

**Scenegraph** is a tree-like structure that consists of various objects as seen above. A **Scene** object defines the root of scenegraph and contains properties like textures, materials, etc. The tree-like is hierarchical which means the children is oriented relative to the parent. For example the wheels of a car are children where the car itself is the parent. If we move the car, the wheels move with it. 

Notice how **Camera** object is halfway in the scenegraph. Camera objects doesn't have to be in scenegraph to function. Camera acts just like other objects where it is oriented relative to its parent object. 

**Mesh** objects are representation of drawings that consists of a specific **Geometry** and **Material**. **Geometry** and **Material** objects can be used by multiple **Mesh** objects. Example if we wanted to draw 2 green cubes, we need 2 mesh objects but only 1 geometry object and 1 material object. 

**Geometry** objs represent vertex data of geometric figures. Three.js has many built-in ones but can also load data from files. 

**Material** objs represent surface properties used to draw geometric figures like how shiny something is, color, etc. Material objs can reference one or more **Texture** objs which generally represent images. Kind of like wrapping paper looking thing on Adobe Photoshop. 

**Light** objs represent diff kinds of light. 