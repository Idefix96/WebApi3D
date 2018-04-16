class Camera 
{

	constructor() {
		
		this.fovy = 45.0;
		this.aspect = 500.0 / 500.0;
		this.zNear = 0.001;
		this.zFar = 1000.0;
		this.perspectiveMatrix = mat4.create();
		mat4.perspective(this.perspectiveMatrix, this.fovy, this.aspect, this.zNear, this.zFar);
		this.position = vec3.fromValues(0.0, 0.0, 1.0);
		this.center = vec3.fromValues(0.0, 0.0, 0.0);
		this.lookDir = this.center - this.position;
		this.forward = this.lookDir;
		this.up = vec3.fromValues(0.0, 1.0, 0.0);
		this.worldToCameraMatrix = mat4.create();
		mat4.lookAt(this.worldToCameraMatrix, this.position, this.center, this.up);
		this.xAxis = vec3.fromValues(1.0, 0.0, 0.0);
		this.rotationMatrix = mat4.create();
	}

	move(delta) {
		vec3.multiply(this.position, vec3.fromValues(delta, delta, delta), this.forward);
		vec3.multiply(this.center, vec3.fromValues(delta, delta, delta), this.forward);
		vec3.normalize(this.forward, this.center - this.position);
		mat4.lookAt(this.worldToCamera, this.position, this.center, this.up);
	}

}