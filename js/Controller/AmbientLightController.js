class AmbientLightController {
	
	constructor(ambientLight, shader, elementIntensity = null, elementR = null, elementG = null, elementB = null, 
		outputIntensity = null, outputR = null, outputG = null, outputB = null) {
		this.ambientLight = ambientLight;
		this.shader = shader;
		this.elementIntensity = elementIntensity;
		this.elementR = elementR;
		this.elementG = elementG;
		this.elementB = elementB;
		this.outputIntensity = outputIntensity;
		this.outputR = outputR;
		this.outputG = outputG;
		this.outputB = outputB;
	}

	update() {
		if (this.elementIntensity != null)
			this.ambientLight.intensity = this.elementIntensity.value/100.0;
		if (this.elementR != null)
			this.ambientLight.color[0] = this.elementR.value/100.0;
		if (this.elementG != null)
			this.ambientLight.color[1] = this.elementG.value/100.0;
		if (this.elementB != null)
			this.ambientLight.color[2] = this.elementB.value/100.0;
		if (this.outputIntensity != null)
			this.outputIntensity.innerHTML = this.elementIntensity.value + "%";
		if (this.outputR != null)
			this.outputR.innerHTML = this.elementR.value + "%";
		if (this.outputG != null)
			this.outputG.innerHTML = this.elementG.value + "%";
		if (this.outputB != null)
			this.outputB.innerHTML = this.elementB.value + "%";
		gl.useProgram(this.shader);
		gl.uniform4fv(gl.getUniformLocation(shaderProgram.id, "AmbientColor"),  this.ambientLight.color);
    	gl.uniform1f(gl.getUniformLocation(shaderProgram.id, "AmbientIntensity"), this.ambientLight.intensity);
	}
}