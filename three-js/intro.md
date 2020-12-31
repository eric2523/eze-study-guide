# Some Intro Stuff
## Creating the Scene
We need to create the scene with three things: **scene**, **camera** and **renderer**

Example:

```js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
```

We're gonna focus on the **PerspectiveCamera** for now. 
* first attribute <span style="color:orange">(75)</span> is the **FOV**: extent of the scene that is visible on the display at any given time 
* second attribute is **aspect ratio**: almost always want to use width of ele / height of ele to maintain 1:1 ratio or else img can look squished like a widescree TV
* third and fourth attr is **near** and **far** clipping plane
    * objects further away from the camera than the value of **far** or closer than **near** won't be rendered 
    * may want to use diff values in the future to increase performance
    * its essentially render distance

The <span style="color:lightblue">renderer</span> instance is instantiated and is typically a WebGLRenderer. Three.js has other falbacks for some older browsers. 