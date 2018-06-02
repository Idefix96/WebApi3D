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

  var mesh = new Mesh();
 
  mesh.setPositionData(asteroid.geometries[0].data.attributes.position.array);
  mesh.setNormalData(asteroid.geometries[0].data.attributes.normal.array);
 // mesh.setUVData(asteroid.geometries[0].data.attributes.uv.array);
  mesh.setIndexData(asteroid.geometries[0].data.index.array);
  mesh.scale(vec3.fromValues(0.25, 0.25, 0.25));
 
  //mesh.material.loadTexture("Rex_D.jpg");
  //mesh.material.loadNormalMap("Rex_N.jpg");
  mesh.material.shininess = asteroid.materials[0].shininess;
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
  var inputDirectionalX = new InputField("directionalDirectionX");
  var inputDirectionalY = new InputField("directionalDirectionY");
  var inputDirectionalZ = new InputField("directionalDirectionZ");
  cameraController = new CameraController(camera, shaderProgram.id);
  directionalLightController = new DirectionalLightController(directional, shaderProgram.id, sliderDirectionalIntensity, 
    sliderDirectionalColorR, sliderDirectionalColorG, sliderDirectionalColorB, document.getElementById("directionalIntensityOut"),
    document.getElementById("directionalIntensityRed"), document.getElementById("directionalIntensityGreen"), document.getElementById("directionalIntensityBlue"),
     inputDirectionalX, inputDirectionalY, inputDirectionalZ);
 
  ambientLightController = new AmbientLightController(ambient, shaderProgram.id, sliderAmbientIntensity, 
    sliderAmbientColorR, sliderAmbientColorG, sliderAmbientColorB, document.getElementById("ambientIntensityOut"),
    document.getElementById("ambientIntensityRed"), document.getElementById("ambientIntensityGreen"), document.getElementById("ambientIntensityBlue"));
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

  function MainRenderLoop() {

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
    requestAnimationFrame(MainRenderLoop);
  }

  MainRenderLoop();