class DirectionalLight
{
	constructor(){
		this.intensity = 1.0;
		this.color = vec4.fromValues(1.0, 1.0, 1.0, 1.0);
		this.direction = vec3.fromValues(1.0,-1.0,1.0);
	}
}