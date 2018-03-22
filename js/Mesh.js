class Mesh {
	
	constructor()
	{
		this.dataManager = new BufferDataManager();	
	}

	setPositionData(data) {
		this.positionData = data;
		this.dataManager.setPositionData(this.positionData);
		this.dataManager.enablePosition();
	}

	draw(shader) {
		gl.useProgram(shader);
		this.dataManager.vbo.bind();
		gl.drawArrays(gl.TRIANGLES, 0, this.positionData.length/3);
	}
}