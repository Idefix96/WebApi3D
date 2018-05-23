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

  var box = new Box(1,1,1);

var world = new CANNON.World();
world.gravity.set(0.0,-9.82,0.0);

world.broadphase = new CANNON.NaiveBroadphase();

var mass = 5, radius = 1;
var sphereShape = new CANNON.Sphere(radius); // Step 1
var sphereBody = new CANNON.Body({mass: mass, shape: sphereShape}); // Step 2
sphereBody.position.set(0,15,-5);
world.add(sphereBody); // Step 3

 var vertices = [
            10, 0, 10, // vertex 0
            10, 0, -10, // vertex 1
            -10, 0, -10,  // vertex 2
             -10, 0, 10  // vertex 3
        ];
        var indices = [
            0, 1, 2,  // triangle 0
             2, 3, 0,  // triangle 0
        ];
        var trimeshShape = new CANNON.Trimesh(vertices, indices);
        var trimeshBody = new CANNON.Body({ mass: 0, shape: trimeshShape });
        world.add(trimeshBody);

var timeStep = 1.0 / 60.0; // seconds

function MainPhysicsSimulation()
{

  world.step(timeStep);
  box.translate(vec3.fromValues(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z));
   gl.clearColor(0.3, 0.3, 0.3, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(shaderProgram.id);

    if (active)
    {
      cameraController.update();
    }
    ambientLightController.update();
    directionalLightController.update();
  
    box.draw(shaderProgram.id);
  requestAnimationFrame(MainPhysicsSimulation);
 
}

MainPhysicsSimulation();