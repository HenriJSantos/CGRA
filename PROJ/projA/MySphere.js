/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySphere extends CGFobject {
	constructor(scene, sectorCount, stackCount) {
	    super(scene);
	    this.sectorCount = sectorCount;
	    this.stackCount = stackCount;
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		let sectorStep = 2 * Math.PI / this.sectorCount;
		let stackStep = Math.PI / this.stackCount;

		for(let i = 0, stackAngle = Math.PI/2; i <= this.stackCount; i++, stackAngle -= stackStep)
		{
			let xz = Math.cos(stackAngle);

			for(let j = 0, sectorAngle = 0; j <= this.sectorCount; j++, sectorAngle += sectorStep)
			{
				this.vertices.push(xz * Math.cos(sectorAngle), Math.sin(stackAngle), xz * Math.sin(sectorAngle));
				this.normals.push(xz * Math.cos(sectorAngle), Math.sin(stackAngle), xz * Math.sin(sectorAngle));
				this.texCoords.push(j/this.sectorCount, i/this.stackCount);
			}
		}

		let k1, k2;
		for(let i = 0; i < this.stackCount; ++i)
		{
			k1 = i * (this.sectorCount + 1);
			k2 = k1 + this.sectorCount + 1;

			for(let j = 0; j < this.sectorCount; ++j, ++k1, ++k2)
			{
				if(i > 0)
				{
					this.indices.push(i * (this.sectorCount + 1) + j, i * (this.sectorCount + 1) + 1 + j, i * (this.sectorCount + 1) + this.sectorCount + 1 + j);
				}
				
				if(i < this.stackCount-1)
				{
					this.indices.push(i * (this.sectorCount + 1) + j + 1, i * (this.sectorCount + 1) + this.sectorCount + j + 2, i * (this.sectorCount + 1) + this.sectorCount + j + 1);
				}
			}
		}
		
		this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
	}
}

