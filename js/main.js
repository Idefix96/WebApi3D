  var gl;
  var canvas;

  camera = new Camera();

  ambient = new AmbientLight();
  directional = new DirectionalLight();
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
  var vertices = [
         0.0,  1.0,  -10.0,
        -1.0, -1.0,  -10.0,
         1.0, -1.0,  -10.0
  ];
  var color = [
         1.0, 0.0,  0.0, 1.0,
         0.0, 1.0,  0.0, 1.0,
         0.0, 0.0,  1.0, 1.0,
  ];
  var uv =  [
         0.5, 1.0,  0.0, 0.0,
         1.0, 0.0,
  ];
  mesh.setPositionData(vertices);
  mesh.setColorData(color);
  mesh.setUVData(uv);
  mesh.scale(vec3.fromValues(0.5, 0.5, 0.5));
  mesh.translate(vec3.fromValues(0, 0, 0));
  mesh.material.loadTexture("Rex_D.jpg");
  var shaderProgram = new Shader();
  shaderProgram.load();

  cameraController = new CameraController(camera, shaderProgram.id);
  function MainRenderLoop() {
    gl.clearColor(0.3, 0.3, 0.3, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(shaderProgram.id);
   // gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram.id, "gPerspective"), gl.FALSE, camera.perspectiveMatrix);
   // gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram.id, "gWorldToCamera"), gl.FALSE, camera.worldToCameraMatrix);
   // gl.uniform3fv(gl.getUniformLocation(shaderProgram.id, "cameraPosition"),  camera.position);
    gl.uniform4fv(gl.getUniformLocation(shaderProgram.id, "AmbientColor"),  ambient.color);
    gl.uniform1f(gl.getUniformLocation(shaderProgram.id, "AmbientIntensity"), ambient.intensity);
    gl.uniform4fv(gl.getUniformLocation(shaderProgram.id, "DirectionalColor"),  directional.color);
    gl.uniform1f(gl.getUniformLocation(shaderProgram.id, "DirectionalIntensity"), directional.intensity);
    gl.uniform3fv(gl.getUniformLocation(shaderProgram.id, "DirectionalDirection"),  directional.direction);
    cameraController.action();
    mesh.draw(shaderProgram.id);
    
  //  if (cameraController.move()){
  //      camera.rotate(vec3.fromValues(0.05,0,0));
  //  };
    requestAnimationFrame(MainRenderLoop);
  }

  MainRenderLoop();

 




