class VertexDataManager {

	constructor(){
		this.vbo = new Buffer();
		this.vbo.setTarget(gl.ARRAY_BUFFER);
		this.ibo = new Buffer();
		this.ibo.setTarget(gl.ELEMENT_ARRAY_BUFFER);
		this.vao = new VertexArrayObject();
		this.position = {
			index 	: 0,
			size 	: 3,
			type 	: gl.FLOAT,
			stride	: 24,
			offset	: 0,
		}
	}

	setVertexPositionData(data){
		this.vao.bind();
		this.vbo.bind();
		this.positionData = new Float32Array(data);
		gl.bufferData(gl.ARRAY_BUFFER, this.positionData, gl.STATIC_DRAW, 0, 0);
		this.bufferActiveSize = this.positionData.length * 8;
		this.vao.setAttribute(this.position);
		this.vao.enableAttribute(this.position.index);
	}

	setVertexIndexData(data){
		this.vao.bind();
		this.ibo.bind();
		this.indexData = data;
		gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, this.indexData, gl.STATIC_DRAW, 0, 0)
	}

	enablePosition(){
		gl.vertexAttribPointer(0, 3, this.position.type, false, 0, 0);
		gl.enableVertexAttribArray(0);
	}
}