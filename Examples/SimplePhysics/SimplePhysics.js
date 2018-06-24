  var gl;
  var canvas;
  
  camera = new Camera();

  var ambient = new AmbientLight();
  var directional = new DirectionalLight();
  document.body.style.height = "100%";
  canvas = document.getElementById('canvas');

  gl = canvas.getContext('webgl2');
  try {
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
        gl.enable(gl.DEPTH_TEST);
      } catch(e) {
  }
  if (!gl) {
      alert("Could not initialise WebGL, sorry :-( ");
  }

  var shaderProgram = new Shader();
  shaderProgram.load();

  var sliderAmbientIntensity = new Slider("ambient");
  var sliderAmbientColorR = new Slider("ambientColorR");
  var sliderAmbientColorG = new Slider("ambientColorG");
  var sliderAmbientColorB = new Slider("ambientColorB");
  var sliderDirectionalIntensity = new Slider("directional");
  var sliderDirectionalColorR = new Slider("directionalColorR");
  var sliderDirectionalColorG = new Slider("directionalColorG");
  var sliderDirectionalColorB = new Slider("directionalColorB");
  cameraController = new CameraController(camera, shaderProgram.id);
  directionalLightController = new DirectionalLightController(directional, shaderProgram.id, sliderDirectionalIntensity, 
    sliderDirectionalColorR, sliderDirectionalColorG, sliderDirectionalColorB, document.getElementById("directionalIntensityOut"));
 
  ambientLightController = new AmbientLightController(ambient, shaderProgram.id, sliderAmbientIntensity, 
    sliderAmbientColorR, sliderAmbientColorG, sliderAmbientColorB, document.getElementById("ambientIntensityOut"));
  var active = false;
  canvas.addEventListener("mouseover", function(){
    active = true;  
  }); 
  canvas.addEventListener("mouseout", function(){
    active = false;  
  }); 
  cameraController.update();
  ambientLightController.update();
  directionalLightController.update();

  var mesh = new Mesh();
  var ground = new Mesh();
  
  ground.setPositionData(terrain.geometries[0].data.attributes.position.array);
   ground.setNormalData(terrain.geometries[0].data.attributes.normal.array);
   ground.setIndexData(terrain.geometries[0].data.index.array);
   mesh.setPositionData(sphere.geometries[0].data.attributes.position.array);
   mesh.setNormalData(sphere.geometries[0].data.attributes.normal.array);
   mesh.setIndexData(sphere.geometries[0].data.index.array);
   //mesh.scale(vec3.fromValues(0.5,0.5,0.5));
var world = new CANNON.World();

world.gravity.set(0.0,-9.82,0.0);

world.broadphase = new CANNON.NaiveBroadphase();

var mass = 1, radius = 0.25;
var sphereShape = new CANNON.Sphere(radius); // Step 1

var sphereBody = new CANNON.Body({mass: mass, shape: sphereShape}); // Step 2
sphereBody.position.set(0,3,0);
sphereBody.angularDamping = 0.5;
world.add(sphereBody); // Step 3
 
var trimeshShape = new CANNON.Trimesh(ground.positionData, ground.indexData); //new CANNON.Box(new CANNON.Vec3(1.0,1.0,1.0)); //(ground.positionData, ground.indexData);

var trimeshBody = new CANNON.Body({ mass: 0, shape: trimeshShape });
world.add(trimeshBody);

var timeStep = 1.0 / 60.0; // seconds

 var physicsMaterial = new CANNON.Material("groundMaterial");
 physicsMaterial.restitution = 0.3;
 physicsMaterial.friction = 10.3;
 trimeshShape.material = physicsMaterial; 
 sphereShape.material = physicsMaterial;
 
ground.translate(vec3.fromValues(trimeshBody.position.x, trimeshBody.position.y, trimeshBody.position.z));
function MainPhysicsSimulation()
{

  world.step(timeStep);
  mesh.translate(vec3.fromValues(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z));
  
  euler = vec3.create();
  sphereBody.quaternion.toEuler(euler,'YZX');
  angle = [euler.x, euler.y, euler.z];
  mesh.rotate(angle);
  console.log(euler.x + ' ' + euler.y + ' ' + euler.z);
  
   gl.clearColor(0.3, 0.3, 0.3, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(shaderProgram.id);

    if (active)
    {
      cameraController.update();
    }
    ambientLightController.update();
    directionalLightController.update();
  
    mesh.draw(shaderProgram.id);
    ground.draw(shaderProgram.id);
  requestAnimationFrame(MainPhysicsSimulation);
 
}

MainPhysicsSimulation();