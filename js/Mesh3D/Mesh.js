class Mesh {
	
	constructor()
	{
		this.dataManager = new VertexDataManager();	
		this.translationMatrix = mat4.create();
		this.rotationMatrix = mat4.create();
		this.scalingMatrix = mat4.create();
	}

	setPositionData(data) {
		this.positionData = data;
		this.dataManager.setVertexPositionData(this.positionData);
		this.dataManager.enablePosition();
	}

	draw(shader) {
		gl.useProgram(shader);
		this.dataManager.vao.bind();
		gl.uniformMatrix4fv(gl.getUniformLocation(shader, "gScaling"), gl.FALSE, this.scalingMatrix);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader, "gRotation"), gl.FALSE, this.rotationMatrix);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader, "gTranslation"), gl.FALSE, this.translationMatrix);
		gl.drawArrays(gl.TRIANGLES, 0, this.positionData.length/3);
	}
}