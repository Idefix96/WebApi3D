class CameraController
{
	constructor(camera, shader) {

		document.addEventListener("keydown", (e) => {this.move(e);});
		document.addEventListener("keyup", (e) => {this.stop(e);});
		document.addEventListener("mousemove", (e) => {this.mouse(e);});
		this.moveForward = false;
		this.moveBackward = false;
		this.camera = camera;
		this.shader = shader;
	}

	move(evt) {
		var key = String.fromCharCode(evt.keyCode);
		switch(key){
			case "W":
				this.moveForward = true;
				break;
			case "S":
				this.moveBackward = true;
			break;
		}
	}

	stop(evt) {
		var key = String.fromCharCode(evt.keyCode);
		switch(key){
			case "W":
				this.moveForward = false;
				break;
			case "S":
				this.moveBackward = false;
				break;
		}
	}

	mouse(evt) {
		console.log(evt.clientX);		
	}

	action() {
		if (this.moveForward)
			camera.move(0.1);
		if (this.moveBackward)
			camera.move(-0.1);
		
		gl.useProgram(this.shader);
	    gl.uniformMatrix4fv(gl.getUniformLocation(this.shader, "gPerspective"), gl.FALSE, this.camera.perspectiveMatrix);
	    gl.uniformMatrix4fv(gl.getUniformLocation(this.shader, "gWorldToCamera"), gl.FALSE, this.camera.worldToCameraMatrix);
	    gl.uniform3fv(gl.getUniformLocation(this.shader, "cameraPosition"),  this.camera.position);
	}
}