class Material {

	constructor()
	{	
		this.hasNormalMap = false;	
		this.hasTexture = false;
		this.hasColor = false;
		this.shininess = 128.0;
		this.shininessStrength = 1.0;
		this.opacity = 1.0;
		this.diffuseColor = vec4.create();
		this.texture = new Texture();
		this.normalMap = new Texture();
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
		this.normalMap.image.src = texture;
		this.hasNormalMap = true;
	}

}