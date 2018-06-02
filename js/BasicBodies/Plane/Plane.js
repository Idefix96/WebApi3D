class Plane extends Mesh{
	constructor(width, depth)
	{
		super();
		
		this.width = width;
		this.depth = depth;

		this.position = [ -this.width/2.0, 0.0, this.depth/2.0,
						  -this.width/2.0, 0.0, -this.depth/2.0,
						  this.width/2.0, 0.0, -this.depth/2.0,
						  this.width/2.0, 0.0, this.depth/2.0, 

						 ];
		this.normals =[ 0.0, 1.0, 0.0,
						  0.0, 1.0, 0.0,
						  0.0, 1.0, 0.0,
						  0.0, 1.0, 0.0 ];
		this.indices = [ 0, 1, 2, 3, 2, 0
						
						 ];

		super.setPositionData(this.position);
		super.setNormalData(this.normals);
		super.setIndexData(this.indices);
	}
}