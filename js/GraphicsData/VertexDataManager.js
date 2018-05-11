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
		this.bufferActiveSize = this.positionData.length * 4;
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
		this.bufferActiveSize += this.uvData.length * 4;
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
		this.indexData = new Uint16Array(data);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indexData, gl.STATIC_DRAW)

		this.calculateTangentsAndBitangents();
	}

	calculateTangentsAndBitangents(){

		var tangents = new Array();
		var bitangents = new Array();
		for (var i = 0; i < this.positionData.length; i ++)
		{
			tangents.push(0.0);
			bitangents.push(0.0);
			
		}

		for (var i = 0; i < this.indexData.length; i += 3)
		{
				//get the three vertices of the triangle
				var positionI = vec3.fromValues(this.positionData[this.indexData[i]*3], this.positionData[this.indexData[i]*3 +1], this.positionData[this.indexData[i]*3+2]);
				var positionIplus1 = vec3.fromValues(this.positionData[this.indexData[(i+1)]*3], this.positionData[3*this.indexData[(i+1)]+1], this.positionData[3*this.indexData[(i+1)]+2]);
				var positionIplus2 = vec3.fromValues(this.positionData[3*this.indexData[(i+2)]], this.positionData[3*this.indexData[(i+2)]+1], this.positionData[3*this.indexData[(i+2)]+2]);
				var UvI = vec2.fromValues(this.uvData[2*this.indexData[i]], this.uvData[2*this.indexData[i]+1]);
				var UvIplus1 = vec2.fromValues(this.uvData[2*this.indexData[(i+1)]], this.uvData[2*this.indexData[(i+1)]+1]);
				var UvIplus2 = vec2.fromValues(this.uvData[2*this.indexData[(i+2)]], this.uvData[2*this.indexData[(i+2)]+1]);
				
				//get two edges of the triangle
				var edge1 = vec3.sub(vec3.create(), positionIplus1, positionI);
				var edge2 = vec3.sub(vec3.create(), positionIplus2, positionI);

				var deltaUV1 = vec3.sub(vec3.create(), UvIplus1, UvI);
				var deltaUV2 = vec3.sub(vec3.create(), UvIplus2, UvI);

				var f = 1.0/ (deltaUV1[0] * deltaUV2[1] - deltaUV2[0] * deltaUV1[1]);

				var tangent = vec3.create();
				tangent[0] = f * (deltaUV2[1] * edge1[0] - deltaUV1[1] * edge2[0]);
				tangent[1] = f * (deltaUV2[1] * edge1[1] - deltaUV1[1] * edge2[1]);
				tangent[2] = f * (deltaUV2[1] * edge1[2] - deltaUV1[1] * edge2[2]);

				var bitangent = vec3.create();

				bitangent[0] = f * (-deltaUV2[0] * edge1[0] - deltaUV1[0] * edge2[0]);
				bitangent[1] = f * (-deltaUV2[0] * edge1[1] - deltaUV1[0] * edge2[1]);
				bitangent[2] = f * (-deltaUV2[0] * edge1[2] - deltaUV1[0] * edge2[2]);

				tangents[this.indexData[i]*3] += tangent[0];
				tangents[this.indexData[i]*3 + 1] += tangent[1];
				tangents[this.indexData[i]*3 + 2] += tangent[2];
				bitangents[this.indexData[i]*3] += bitangent[0];
				bitangents[this.indexData[i]*3 + 1] += bitangent[1];
				bitangents[this.indexData[i]*3 + 2] += bitangent[2];
		
				tangents[this.indexData[i+1]*3] += tangent[0];
				tangents[this.indexData[i+1]*3 + 1] += tangent[1];
				tangents[this.indexData[i+1]*3 + 2] += tangent[2];
				bitangents[this.indexData[i+1]*3] = bitangent[0];
				bitangents[this.indexData[i+1]*3 + 1] += bitangent[1];
				bitangents[this.indexData[i+1]*3 + 2] += bitangent[2];

		
				tangents[this.indexData[i+2]*3] += tangent[0];
				tangents[this.indexData[i+2]*3 + 1] += tangent[1];
				tangents[this.indexData[i+2]*3 + 2] += tangent[2];
				bitangents[this.indexData[i+2]*3] += bitangent[0];
				bitangents[this.indexData[i+2]*3 + 1] += bitangent[1];
				bitangents[this.indexData[i+2]*3 + 2] += bitangent[2];
		
		} 

		this.setVertexTangentData(tangents);
		this.setVertexBitangentData(bitangents);
	}
}