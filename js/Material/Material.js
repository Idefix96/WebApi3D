class Material {

	constructor()
	{	
		this.hasNormalMap = false;	
		this.hasTexture = false;
		this.hasColor = false;
		this.shininess = 0;
		this.shininessStrength = 0;
		this.opacity = 1.0;
		this.diffuseColor = vec4.create();
		this.texture = new Texture();
	}

	setDiffuseColor(color) {
		this.diffuseColor = color;
		this.hasColor = true;
	}

	loadTexture(texture) {
		this.texture.image.src = texture;
		this.hasTexture = true;
	}

	loadNormalMap(texture) {
		this.normalMap = texture;
		this.hasNormalMap = true;
	}

}