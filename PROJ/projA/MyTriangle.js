/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangle extends CGFobject {
	constructor(scene, width, height, thickness, material) {
		super(scene);
		if(width != undefined) {
            this.width = width;
            this.height = height;
            this.thick = thickness;
        }
        if(material != undefined) this.material = material;
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			0.5, -0.5, 0.5,	//0
			-0.5, 0.5, 0.5,	//1
			-0.5, -0.5, 0.5,	//2

           0.5, -0.5, -0.5,	//3
           -0.5, 0.5, -0.5,	//4
           -0.5, -0.5, -0.5,	//5
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
		];

        this.texCoords = [
            1, 1,   //0
            0, 1, 	//1
            0.5, 0.5, 	//2

            1, 1,   //3
            0, 1, 	//4
            0.5, 0.5, 	//5
        ];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
            5, 4, 3,

			3,4,1,
			0,3,1,

			5,3,0,
			5,0,2,

			5,2,1,
			5,1,4,
		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	display()
	{
        if(this.material != null) this.material.apply();
        if(this.width != null)
		{
            this.scene.pushMatrix();
            this.scene.scale(this.width, this.height, this.thick);
            super.display();
            this.scene.popMatrix();
		}
		else super.display();
	}
}

class MyTriangleSmall extends CGFobject {
	constructor(scene,texCoords) {
		super(scene);
		this.initBuffers(texCoords);
	}
	initBuffers(texCoords) {
		this.vertices = [
			1, 0, 0,	//0
			0, 1, 0,	//1
			-1, 0, 0,	//2
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
		];

        this.texCoords = texCoords;
		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2
		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

class MyTriangleBig extends CGFobject {
	constructor(scene, texCoords) {
		super(scene);
		this.initBuffers(texCoords);
	}
	initBuffers(texCoords) {
		this.vertices = [
			2, 0, 0,	//0
			0, 2, 0,	//1
			-2, 0, 0,	//2
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
		];

        this.texCoords = texCoords;
		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2
		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

