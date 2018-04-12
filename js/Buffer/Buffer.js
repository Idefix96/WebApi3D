class Buffer {
	
	constructor(){
		this.id = gl.createBuffer();		
	}

	bind(){
		gl.bindBuffer(this.target, this.id);
	}

	setTarget(target){
		this.target = target;	
	}
}