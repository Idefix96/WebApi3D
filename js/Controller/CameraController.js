class CameraController
{
	constructor(camera, shader, elementFov = null, elementAspectWidth = null, elementAspectHeight = null,
		elementZnear = null, elementZfar = null, elementPosX = null, elementPosY = null,elementPosZ = null,
		elementCenterX = null, elementCenterY = null, elementCenterZ = null) {

		document.addEventListener("keydown", (e) => {this.move(e);});
		document.addEventListener("keyup", (e) => {this.stop(e);});
		document.addEventListener("mousedown", (e) => {this.mouseDown(e);});
		document.addEventListener("mouseup", (e) => {this.mouseUp(e);});
		document.addEventListener("mousemove", (e) => {this.mouseMove(e);});
		this.moveForward = false;
		this.moveBackward = false;
		this.camera = camera;
		this.shader = shader;
		var controller = this;
		this.elementFov = elementFov;
		this.elementAspectWidth = elementAspectWidth;
		this.elementAspectHeight = elementAspectHeight;
		this.elementPosX = elementPosX;
		this.elementPosY = elementPosY;
		this.elementPosZ = elementPosZ;
		this.elementCenterX = elementCenterX;
		this.elementCenterY = elementCenterY;
		this.elementCenterZ = elementCenterZ;

		if (this.elementFov != null)
		{
			this.camera.fovy = this.elementFov.field.value;
			this.camera.perspectiveMatrix = mat4.perspective(mat4.create(), this.camera.fovy, this.camera.aspect, this.camera.zNear, this.camera.zFar);
			this.update();

			this.elementFov.field.oninput = function() {
				
				controller.camera.fovy = controller.elementFov.field.value;
				controller.camera.perspectiveMatrix = mat4.perspective(mat4.create(), controller.camera.fovy, controller.camera.aspect, controller.camera.zNear, controller.camera.zFar);
			    controller.update();
		 	};
		}
		if ((this.elementAspectWidth != null) && (this.elementAspectHeight != null))
		{
			this.camera.aspect = this.elementAspectWidth.field.value / this.elementAspectHeight.field.value;
			this.camera.perspectiveMatrix = mat4.perspective(mat4.create(), this.camera.fovy, this.camera.aspect, this.camera.zNear, this.camera.zFar);
			this.update();

			this.elementAspectWidth.field.oninput = function() {
				
				controller.camera.aspect = controller.elementAspectWidth.field.value / controller.elementAspectHeight.field.value;
				controller.camera.perspectiveMatrix = mat4.perspective(mat4.create(), controller.camera.fovy, controller.camera.aspect, controller.camera.zNear, controller.camera.zFar);
			    controller.update();
		 	};
		 	this.elementAspectHeight.field.oninput = function() {
				
				controller.camera.aspect = controller.elementAspectWidth.field.value / controller.elementAspectHeight.field.value;
				controller.camera.perspectiveMatrix = mat4.perspective(mat4.create(), controller.camera.fovy, controller.camera.aspect, controller.camera.zNear, controller.camera.zFar);
			    controller.update();
		 	};
		}
		if ((this.elementPosX != null) && (this.elementPosY != null) && (this.elementPosZ != null))
		{
			this.camera.position = vec3.fromValues(this.elementPosX.field.value, this.elementPosY.field.value, this.elementPosZ.field.value);
			this.camera.worldToCameraMatrix = mat4.lookAt(mat4.create(), this.camera.position, this.camera.center, this.camera.up);
			this.update();

			this.elementPosX.field.oninput = function() {
				
				controller.camera.position[0] = controller.elementPosX.field.value;
				controller.camera.worldToCameraMatrix = mat4.lookAt(mat4.create(), controller.camera.position, controller.camera.center, controller.camera.up);
		  		controller.update();
		 	};
		 	this.elementPosY.field.oninput = function() {
			
				controller.camera.position[1] = controller.elementPosY.field.value;		
				controller.camera.worldToCameraMatrix = mat4.lookAt(mat4.create(), controller.camera.position, controller.camera.center, controller.camera.up);
	    
				controller.update();
		 	};
		 	this.elementPosZ.field.oninput = function() {
			
				controller.camera.position[2] = controller.elementPosZ.field.value;
				controller.camera.worldToCameraMatrix = mat4.lookAt(mat4.create(), controller.camera.position, controller.camera.center, controller.camera.up);

			    controller.update();
		 	};
		}
		if ((this.elementCenterX != null) && (this.elementCenterY != null) && (this.elementCenterZ != null))
		{
			this.camera.center = vec3.fromValues(this.elementCenterX.field.value, this.elementCenterY.field.value, this.elementCenterZ.field.value);
			this.camera.worldToCameraMatrix = mat4.lookAt(mat4.create(), this.camera.position, this.camera.center, this.camera.up);
			this.update();

			this.elementCenterX.field.oninput = function() {
				
				controller.camera.center[0] = controller.elementCenterX.field.value;
				controller.camera.worldToCameraMatrix = mat4.lookAt(mat4.create(), controller.camera.position, controller.camera.center, controller.camera.up);
		  		controller.update();
		 	};
		 	this.elementCenterY.field.oninput = function() {
			
				controller.camera.center[1] = controller.elementCenterY.field.value;		
				controller.camera.worldToCameraMatrix = mat4.lookAt(mat4.create(), controller.camera.position, controller.camera.center, controller.camera.up);
	    
				controller.update();
		 	};
		 	this.elementCenterZ.field.oninput = function() {
			
				controller.camera.center[2] = controller.elementCenterZ.field.value;
				controller.camera.worldToCameraMatrix = mat4.lookAt(mat4.create(), controller.camera.position, controller.camera.center, controller.camera.up);

			    controller.update();
		 	};
		}
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

	mouseDown(evt) {
		var button = evt.which;

		switch(button){
			case 1:
				this.leftMouseDown = true;
				this.mousePositionLastFrameX = evt.clientX;
				this.mousePositionLastFrameY = evt.clientY;
				break;
			case 2: 
				this.rightMouseDown = true;	
				break;
		}
	}

	mouseUp(evt) {
		var button = evt.which;
		switch(button){
			case 1:
				this.leftMouseDown = false;
				break;
			case 2: 
				this.rightMouseDown = false;	
				break;
		}
	}

	mouseMove(evt) {
		this.mouseMoving = true;
		this.mousePositionX = evt.clientX;
		this.mousePositionY = evt.clientY;
	}


	update() {
		if (this.moveForward)
			camera.move(0.1);
		if (this.moveBackward)
			camera.move(-0.1);

		if (this.mousePositionX == this.mousePositionLastFrameX 
				&& this.mousePositionY == this.mousePositionLastFrameY)
		{
			this.mouseMoving = false;
		}

		if (this.mouseMoving && this.leftMouseDown)
		{
			var rotation = vec3.fromValues((this.mousePositionY - this.mousePositionLastFrameY)/100, 
											(this.mousePositionLastFrameX - this.mousePositionX)/100, 0.0);
			camera.rotate(rotation);
		}

		this.mousePositionLastFrameX = this.mousePositionX;
		this.mousePositionLastFrameY = this.mousePositionY;

		gl.useProgram(this.shader);
	    gl.uniformMatrix4fv(gl.getUniformLocation(this.shader, "gPerspective"), gl.FALSE, this.camera.perspectiveMatrix);
	    gl.uniformMatrix4fv(gl.getUniformLocation(this.shader, "gWorldToCamera"), gl.FALSE, this.camera.worldToCameraMatrix);
	    gl.uniform3fv(gl.getUniformLocation(this.shader, "cameraPosition"),  this.camera.position);

	    if ((this.elementPosX != null) && (this.elementPosY != null) && (this.elementPosZ != null))
	    {

	    	this.elementPosX.field.value = this.camera.position[0].toFixed(2);
	    	this.elementPosY.field.value = this.camera.position[1].toFixed(2);
	    	this.elementPosZ.field.value = this.camera.position[2].toFixed(2);
	    }
	    if ((this.elementCenterX != null) && (this.elementCenterY != null) && (this.elementCenterZ != null))
	    {
	    	console.log(this.camera.center[0]);
	    	this.elementCenterX.field.value = this.camera.center[0].toFixed(2);
	    	this.elementCenterY.field.value = this.camera.center[1].toFixed(2);
	    	this.elementCenterZ.field.value = this.camera.center[2].toFixed(2);
	    }
	}
}