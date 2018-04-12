class VertexArrayObject {

	constructor(){
		this.id = gl.createVertexArray();
		this.numAttributes = 0;
	}

	bind(){
		gl.bindVertexArray(this.id);
	}

	setAttribute(attribute){
		gl.vertexAttribPointer(attribute.index, attribute.size, attribute.type, gl.FALSE, attribute.stride, attribute.offset);
		this.numAttributes += 1;
	}

	enableAttribute(index){
		gl.enableVertexAttribArray(index);
	}
}