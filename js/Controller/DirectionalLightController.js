class DirectionalLightController {
	
	constructor(directionalLight, shader, elementIntensity = null, elementR = null, elementG = null, elementB = null, 
		outputIntensity = null, outputR = null, outputG = null, outputB = null, elementX = null, elementY = null, elementZ = null,
		outputX = null, outputY = null, outputZ = null) {
		this.directionalLight = directionalLight;
		this.shader = shader;
		this.elementIntensity = elementIntensity;
		this.elementR = elementR;
		this.elementG = elementG;
		this.elementB = elementB;
		this.outputIntensity = outputIntensity;
		this.outputR = outputR;
		this.outputG = outputG;
		this.outputB = outputB;
		this.elementX = elementX;
		this.elementY = elementY;
		this.elementZ = elementZ;
		this.outputX = outputX;
		this.outputY = outputY;
		this.outputZ = outputZ;
	}

	update() {
		if (this.elementIntensity != null)
			this.directionalLight.intensity = this.elementIntensity.value/100.0;
		if (this.elementR != null)
			this.directionalLight.color[0] = this.elementR.value/100.0;
		if (this.elementG != null)
			this.directionalLight.color[1] = this.elementG.value/100.0;
		if (this.elementB != null)
			this.directionalLight.color[2] = this.elementB.value/100.0;
		if (this.elementX != null)
			this.directionalLight.direction[0] = this.elementX.value;
		if (this.elementY != null)
			this.directionalLight.direction[1] = this.elementY.value;
		if (this.elementZ != null)
			this.directionalLight.direction[2] = this.elementZ.value;

		vec3.normalize(this.directionalLight.direction, this.directionalLight.direction);

		if (this.outputIntensity != null)
			this.outputIntensity.innerHTML = this.elementIntensity.value + "%";
		if (this.outputR != null)
			this.outputR.innerHTML = this.elementR.value + "%";
		if (this.outputG != null)
			this.outputG.innerHTML = this.elementG.value + "%";
		if (this.outputB != null)
			this.outputB.innerHTML = this.elementB.value + "%";

		if (this.outputX != null)
			this.outputX.innerHTML = this.elementX.value;
		if (this.outputY != null)
			this.outputY.innerHTML = this.elementY.value;
		if (this.outputZ != null)
			this.outputZ.innerHTML = this.elementZ.value;
		gl.useProgram(this.shader);

	    gl.uniform4fv(gl.getUniformLocation(shaderProgram.id, "DirectionalColor"),  this.directionalLight.color);
	    gl.uniform1f(gl.getUniformLocation(shaderProgram.id, "DirectionalIntensity"), this.directionalLight.intensity);
	    gl.uniform3fv(gl.getUniformLocation(shaderProgram.id, "DirectionalDirection"),  this.directionalLight.direction);
	}
}