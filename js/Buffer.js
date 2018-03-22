class Buffer {
	
	constructor(target){
		this.id = gl.createBuffer();
		this.target = target;	
	}

	bind(){
		gl.bindBuffer(this.target, this.id);
	}
}