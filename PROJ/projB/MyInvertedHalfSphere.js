/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyInvertedHalfSphere extends CGFobject {
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

        for(let i = 0, stackAngle = Math.PI/2; i <= this.stackCount/2; i++, stackAngle -= stackStep)
        {
            for(let j = 0, sectorAngle = 0; j <= this.sectorCount; j++, sectorAngle += sectorStep)
            {
                this.vertices.push(Math.cos(stackAngle) * Math.cos(sectorAngle), Math.sin(stackAngle), Math.cos(stackAngle) * Math.sin(sectorAngle));
                this.normals.push(-Math.cos(stackAngle) * Math.cos(sectorAngle), -Math.sin(stackAngle), -Math.cos(stackAngle) * Math.sin(sectorAngle));
                this.texCoords.push(j/this.sectorCount, i/this.stackCount);
            }
        }

        for(let i = 0; i < this.stackCount/2; ++i)
        {
            for(let j = 0; j < this.sectorCount; j++)
            {
                if(i > 0)
                {
                    this.indices.push(i * (this.sectorCount + 1) + j, i * (this.sectorCount + 1) + this.sectorCount + 1 + j, i * (this.sectorCount + 1) + 1 + j);
                }

                if(i < this.stackCount-1)
                {
                    this.indices.push(i * (this.sectorCount + 1) + j + 1, i * (this.sectorCount + 1) + this.sectorCount + j + 1, i * (this.sectorCount + 1) + this.sectorCount + j + 2);
                }
            }
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
        //this.enableNormalViz();
    }
}

