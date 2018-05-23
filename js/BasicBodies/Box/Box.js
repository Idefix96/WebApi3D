class Box extends Mesh{
	constructor(width, depth, height) {
		super();
		
		this.width = width;
		this.depth = depth;
		this.height = height;

		this.position = [ -this.width/2.0, this.height/2.0, this.depth/2.0,
						  -this.width/2.0, -this.height/2.0, this.depth/2.0,
						  -this.width/2.0, -this.height/2.0, -this.depth/2.0,
						  -this.width/2.0, this.height/2.0, -this.depth/2.0, 
						   this.width/2.0, this.height/2.0, this.depth/2.0,
						   this.width/2.0, -this.height/2.0, this.depth/2.0,
						   this.width/2.0, -this.height/2.0, -this.depth/2.0,
						   this.width/2.0, this.height/2.0, -this.depth/2.0
						 ];
		this.normals =[ -1.0, 1.0, 1.0,
						  -1.0, -1.0, 1.0,
						  -1.0, -1.0, -1.0,
						  -1.0, 1.0, -1.0, 
						   1.0, 1.0, 1.0,
						   1.0, -1.0, 1.0,
						   1.0, -1.0, -1.0,
						   1.0, 1.0, -1.0,  ];
		this.indices = [ 0, 1, 2, 3, 2, 0,  //left
						 4, 5, 6, 7, 6, 4,	//right
						 1, 2, 5, 5, 6, 2, //bottom	
						 0, 3, 4, 4, 7, 3,  //top
						 0, 1, 4, 5, 4, 1, //front
						 2, 3, 6, 7, 6, 3  //back
						 ];

		super.setPositionData(this.position);
		super.setNormalData(this.normals);
		super.setIndexData(this.indices);
	}
}