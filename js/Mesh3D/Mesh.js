class Mesh {
	
	constructor()
	{
		this.dataManager = new VertexDataManager();	
		this.translationMatrix = mat4.create();
		this.rotationMatrix = mat4.create();
		this.scalingMatrix = mat4.create();
		this.material = new Material();
	}

	setMaterial(material) {
		this.material = material;
	}

	setPositionData(data) {
		this.positionData = data;
		this.dataManager.setVertexPositionData(this.positionData);
	}

	setColorData(data) {
		this.colorData = data;
		this.dataManager.setVertexColorData(this.colorData);
		this.hasColor = true;
	}

	setNormalData(data) {
		this.normalData = data;
		this.dataManager.setVertexNormalData(this.normalData);
	}

	setUVData(data) {
		this.uvData = data;
		this.dataManager.setVertexUVData(this.uvData);
	}

	setTangentData(data) {
		this.tangentData = data;
		this.dataManager.setVertexTangentData(this.tangentData);
	}

	setBitangentData(data) {
		this.bitangentData = data;
		this.dataManager.setVertexBitangentData(this.bitangentData);
	}

	setIndexData(data) {
		this.indexData = data;
		this.dataManager.setVertexIndexData(this.indexData);
	}

	hasColor() {
		return this.hasColor;
	}

	draw(shader) {
		gl.useProgram(shader);
		this.dataManager.vao.bind();
		gl.uniform1i(gl.getUniformLocation(shader, "hasColor"), this.hasColor);
		
		gl.uniform1i(gl.getUniformLocation(shader, "hasTexture"), this.material.hasTexture);
		gl.uniform1i(gl.getUniformLocation(shader, "hasNormalMap"), this.material.hasNormalMap);
		gl.uniform1i(gl.getUniformLocation(shader, "hasMaterialColor"), this.material.hasColor);
		gl.uniform1f(gl.getUniformLocation(shader, "shininess"), this.material.shininess);
		gl.uniform1f(gl.getUniformLocation(shader, "shininessStrength"), this.material.shininessStrength);
		gl.uniform4fv(gl.getUniformLocation(shader, "materialColor"), this.material.diffuseColor);
		
		gl.uniformMatrix4fv(gl.getUniformLocation(shader, "gScaling"), gl.FALSE, this.scalingMatrix);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader, "gRotation"), gl.FALSE, this.rotationMatrix);
		gl.uniformMatrix4fv(gl.getUniformLocation(shader, "gTranslation"), gl.FALSE, this.translationMatrix);

		if(this.material.hasTexture) {
			gl.activeTexture(gl.TEXTURE0);

			gl.bindTexture(gl.TEXTURE_2D, this.material.texture.texture);
			gl.uniform1i(gl.getUniformLocation(shader, "diffuseTexture"), 0);
		}
		if (this.material.hasNormalMap) {
			gl.activeTexture(gl.TEXTURE1);
			gl.bindTexture(gl.TEXTURE_2D, this.material.normalMap.texture);
			gl.uniform1i(gl.getUniformLocation(shader, "normalMap"), 1); 
		}
		if (this.indexData)
			gl.drawElements(gl.TRIANGLES, this.indexData.length, gl.UNSIGNED_SHORT, 0);
		else
			gl.drawArrays(gl.TRIANGLES, 0, this.positionData.length/3);
	}

	rotate(angle){
		mat4.rotateZ(this.rotationMatrix, mat4.create(), angle[2]);
		mat4.rotateY(this.rotationMatrix, this.rotationMatrix, angle[1]);
		mat4.rotateX(this.rotationMatrix, this.rotationMatrix, angle[0]);
	}

	translate(position){
		mat4.translate(this.translationMatrix, mat4.create(), position);
	}

	scale(scale){
		mat4.scale(this.scalingMatrix, mat4.create(), scale);
	}
}