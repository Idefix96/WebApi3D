class BufferDataManager {

	constructor(){
		this.vbo = new Buffer(gl.ARRAY_BUFFER);
		this.ibo = new Buffer(gl.ELEMENT_ARRAY_BUFFER);
	}

	setPositionData(data) {
		this.vbo.bind();
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW, 0, 0);
	}

	enablePosition(){
		gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(0);
	}
}