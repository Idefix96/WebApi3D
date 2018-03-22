class Shader {

	constructor(){
		this.id = gl.createProgram();
		 
	}

	load(){
		var fragmentShader = this.getShader(gl, "shader-fs");
    	var vertexShader = this.getShader(gl, "shader-vs");
    
    	gl.attachShader(this.id , vertexShader);
    	gl.attachShader(this.id , fragmentShader);
    	gl.linkProgram(this.id );
	}

	getShader(gl, id) {
      var shaderScript = document.getElementById(id);
      if (!shaderScript) {
          return null;
      }

      var str = "";
      var k = shaderScript.firstChild;
      while (k) {
          if (k.nodeType == 3)
              str += k.textContent;
          k = k.nextSibling;
      }

      var shader;
      if (shaderScript.type == "x-shader/x-fragment") {
          shader = gl.createShader(gl.FRAGMENT_SHADER);
      } else if (shaderScript.type == "x-shader/x-vertex") {
          shader = gl.createShader(gl.VERTEX_SHADER);
      } else {
          return null;
      }

      gl.shaderSource(shader, str);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          alert(gl.getShaderInfoLog(shader));
          return null;
      }

      return shader;
  }
}