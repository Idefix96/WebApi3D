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
 
  mesh.setPositionData(Rex.geometries[0].data.attributes.position.array);
  
  mesh.setNormalData(Rex.geometries[0].data.attributes.normal.array);
  mesh.setUVData(Rex.geometries[0].data.attributes.uv.array);
  mesh.setIndexData(Rex.geometries[0].data.index.array);
  mesh.scale(vec3.fromValues(0.5, 0.5, 0.5));
 
  mesh.material.loadTexture("Rex_D.jpg");
  mesh.material.loadNormalMap("Rex_N.jpg");
  mesh.material.shininess =Rex.materials[0].shininess;
  var shaderProgram = new Shader();
  shaderProgram.load();

  var sliderAmbientIntensity = new Slider("ambient");
  var sliderAmbientColorR = new Slider("ambientColorR");
  var sliderAmbientColorG = new Slider("ambientColorG");
  var sliderAmbientColorB = new Slider("ambientColorB");
  cameraController = new CameraController(camera, shaderProgram.id);
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

  function MainRenderLoop() {
    gl.clearColor(0.3, 0.3, 0.3, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(shaderProgram.id);
    gl.uniform4fv(gl.getUniformLocation(shaderProgram.id, "DirectionalColor"),  directional.color);
    gl.uniform1f(gl.getUniformLocation(shaderProgram.id, "DirectionalIntensity"), directional.intensity);
    gl.uniform3fv(gl.getUniformLocation(shaderProgram.id, "DirectionalDirection"),  directional.direction);
    
    if (active)
    {
      cameraController.update();
    }
     ambientLightController.update();
    mesh.draw(shaderProgram.id);
  
    requestAnimationFrame(MainRenderLoop);
  }

  MainRenderLoop();

 




