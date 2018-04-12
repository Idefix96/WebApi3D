var gl;
var canvas;

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
         0.0,  1.0,  0.0,
        -1.0, -1.0,  0.0,
         1.0, -1.0,  0.0
    ];
  mesh.setPositionData(vertices);

var shaderProgram = new Shader();;
shaderProgram.load();
gl.clearColor(0.3, 0.3, 0.3, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
mesh.draw(shaderProgram.id);

 




