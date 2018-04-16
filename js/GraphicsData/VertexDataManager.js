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
			stride	: 0,
			offset	: 0,
		};
		this.color = {
			index 	: 1,
			size 	: 4,
			type 	: gl.FLOAT,
			stride	: 0,
			offset	: 0,
		};
		this.normal = {
			index 	: 2,
			size 	: 3,
			type 	: gl.FLOAT,
			stride	: 0,
			offset	: 0,
		};
		this.uv = {
			index 	: 3,
			size 	: 2,
			type 	: gl.FLOAT,
			stride	: 0,
			offset	: 0,
		};
		this.tangent = {
			index 	: 4,
			size 	: 3,
			type 	: gl.FLOAT,
			stride	: 0,
			offset	: 0,
		};
		this.bitangent = {
			index 	: 5,
			size 	: 3,
			type 	: gl.FLOAT,
			stride	: 0,
			offset	: 0,
		};
	}

	setVertexPositionData(data){
		this.vao.bind();
		this.vbo.bind();
		this.positionData = new Float32Array(data);
		this.numVertices = this.positionData.length / 3.0;
		this.numBufferBytes = this.numVertices * (this.position.size + this.color.size + this.normal.size + this.uv.size
		+ this.tangent.size + this.bitangent.size) * 4; 
		gl.bufferData(gl.ARRAY_BUFFER, this.numBufferBytes, gl.STATIC_DRAW);
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.positionData);
		this.bufferActiveSize =this.positionData.length * 4;
		this.vao.setAttribute(this.position);
		this.vao.enableAttribute(this.position.index);
	}

	setVertexColorData(data){
		this.vao.bind();
		this.vbo.bind();
		this.color.offset = this.bufferActiveSize;
		this.colorData = new Float32Array(data);
		gl.bufferSubData(gl.ARRAY_BUFFER, this.color.offset, this.colorData);
		this.bufferActiveSize += this.colorData.length * 4;
		this.vao.setAttribute(this.color);
		this.vao.enableAttribute(this.color.index);
	}

	setVertexNormalData(data){
		this.vao.bind();
		this.vbo.bind();
		this.normal.offset = this.bufferActiveSize;
		this.normalData = new Float32Array(data);
		gl.bufferSubData(gl.ARRAY_BUFFER, this.normal.offset, this.normalData);
		this.bufferActiveSize += this.normalData.length * 4;
		this.vao.setAttribute(this.normal);
		this.vao.enableAttribute(this.normal.index);
	}

	setVertexUVData(data){
		this.vao.bind();
		this.vbo.bind();
		this.uv.offset = this.bufferActiveSize;
		this.uvData = new Float32Array(data);
		gl.bufferSubData(gl.ARRAY_BUFFER, this.uv.offset, this.uvData);
		this.bufferActiveSize += this.uv.length * 4;
		this.vao.setAttribute(this.uv);
		this.vao.enableAttribute(this.uv.index);
	}

	setVertexTangentData(data){
		this.vao.bind();
		this.vbo.bind();
		this.tangent.offset = this.bufferActiveSize;
		this.tangentData = new Float32Array(data);
		gl.bufferSubData(gl.ARRAY_BUFFER, this.tangent.offset, this.tangentData);
		this.bufferActiveSize += this.tangentData.length * 4;
		this.vao.setAttribute(this.tangent);
		this.vao.enableAttribute(this.tangent.index);
	}

	setVertexBitangentData(data){
		this.vao.bind();
		this.vbo.bind();
		this.bitangent.offset = this.bufferActiveSize;
		this.bitangentData = new Float32Array(data);
		gl.bufferSubData(gl.ARRAY_BUFFER, this.bitangent.offset, this.bitangentData);
		this.bufferActiveSize += this.bitangentData.length * 4;
		this.vao.setAttribute(this.bitangent);
		this.vao.enableAttribute(this.bitangent.index);
	}

	setVertexIndexData(data){
		this.vao.bind();
		this.ibo.bind();
		this.indexData = data;
		gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, this.indexData, gl.STATIC_DRAW, 0, 0)
	}
}