class Texture{

	constructor() {
		this.texture = gl.createTexture();
		this.image = new Image();
		
		var texture = this.texture;
		var image = this.image;
		this.image.onload = function() {
			
			gl.bindTexture(gl.TEXTURE_2D, texture);
			
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 500, 500,0, gl.RGBA, gl.UNSIGNED_BYTE, image);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.generateMipmap(gl.TEXTURE_2D);
			gl.bindTexture(gl.TEXTURE_2D, null);
		};
	}


}