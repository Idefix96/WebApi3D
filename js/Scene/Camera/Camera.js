class Camera 
{

	constructor() {
		
		this.fovy = 45.0;
		this.aspect = 1920.0 / 1080.0;
		this.zNear = 0.001;
		this.zFar = 1000.0;
		this.perspectiveMatrix = mat4.perspective(mat4.create(), this.fovy, this.aspect, this.zNear, this.zFar);
		this.position = vec3.fromValues(0.0, 0.0, 1.0);
		this.center = vec3.fromValues(0.0, 0.0, 0.0);
		this.lookDir = vec3.sub(vec3.create(),this.center,this.position);
		this.forward = this.lookDir;
		this.up = vec3.fromValues(0.0, 1.0, 0.0);
		this.currentRotation = vec3.fromValues(0.0, 0.0, 0.0);
		this.worldToCameraMatrix = mat4.lookAt(mat4.create(), this.position, this.center, this.up);
		this.xAxis = vec3.fromValues(1.0, 0.0, 0.0);
		this.rotationMatrix = mat4.create();
	}

	move(delta) {
		this.position = vec3.add(vec3.create(), this.position, vec3.multiply(vec3.create(), vec3.fromValues(delta, delta, delta), this.forward));
		this.center = vec3.add(vec3.create(), this.center, vec3.multiply(vec3.create(), vec3.fromValues(delta, delta, delta), this.forward));
		vec3.normalize(this.forward, vec3.sub(vec3.create(), this.center, this.position));
		mat4.lookAt(this.worldToCameraMatrix, this.position, this.center, this.up);
		
	}

	rotate(rotationAngle) {
		this.currentRotation = vec3.add(vec3.create(), this.currentRotation, rotationAngle);
		this.rotationMatrix = mat4.rotate(mat4.create(), mat4.create(), this.currentRotation[1], vec3.fromValues(0.0, 1.0, 0.0));
		this.newLookDir = vec4.create();
		this.newLookDir = vec4.transformMat4(vec4.create(), vec4.fromValues(this.lookDir[0], this.lookDir[1], this.lookDir[2], 0.0),this.rotationMatrix);
		this.newXAxis = vec4.transformMat4(vec4.create(), vec4.fromValues(this.xAxis[0], this.xAxis[1], this.xAxis[2], 0.0),this.rotationMatrix);
		this.rotationMatrix = mat4.rotate(mat4.create(), mat4.create(), this.currentRotation[0], vec3.fromValues(this.newXAxis[0], this.newXAxis[1], this.newXAxis[2]));
		this.newLookDir = vec4.transformMat4(vec4.create(), this.newLookDir, this.rotationMatrix);
		this.forward = vec3.fromValues(this.newLookDir[0], this.newLookDir[1], this.newLookDir[2]);
		this.center = vec3.add(vec3.create(), this.position, this.forward);
		mat4.lookAt(this.worldToCameraMatrix, this.position, this.center, this.up);
	}

}