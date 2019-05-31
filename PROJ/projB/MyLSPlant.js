/**
 * MyLSystem
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLSPlant extends MyLSystem {
	constructor(scene) {
        super(scene);
        this.createTree();

        this.sides = 7;
        this.currentDiameter = 1;
        this.currentLength = 3;
        this.init();
    }

    init(){
        // cria o lexico da gramática
        this.initGrammar();
    }

    // cria o lexico da gramática
    initGrammar(){
        this.grammar = {
            "F": new MyTrunk(this.scene),
            "L": new MyFoliage(this.scene, 6),
            "Z": new MyBranch(this.scene, this.currentDiameter, this.currentLength, this.sides),
            "X": new MyLeaf(this.scene)
        };
    };

	createTree()
    {
        this.generate(
            "X",
            {
                "F": [  "FF" ],  //Trunk
                "Z": [  "[Zl\\ZL_]", "[Zl-Z+lZL__]" ],  //Branch
                "X": [  "F[-X][X]FZ[/X]+X",
                    "F[/Z][\\X][X]+X",
                    "FZ[+X]/X",
                    "F[/X][X]FZ[/X]+X\\",
                    "FZ[\\X][X]/X",
                    "F[+Z][/X]\\X",
                    "F[+X][X]FZ[\\X]-X",
                    "FZ[+X]\\X",
                    "FZ[/X]X" ]
            },
            35.0,
            4,
            0.9);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);

        var i;

        // percorre a cadeia de caracteres
        for (i=0; i<this.axiom.length; ++i){

            // verifica se sao caracteres especiais
            switch(this.axiom[i]){
                case "+":
                    // roda a esquerda
                    this.scene.rotate(this.angle, 0, 0, 1);
                    break;

                case "-":
                    // roda a direita
                    this.scene.rotate(-this.angle, 0, 0, 1);
                    break;

                case "\\":
                    this.scene.rotate(this.angle, 1, 0, 0);
                    break;

                case "/":
                    this.scene.rotate(-this.angle, 1, 0, 0);
                    break;

                case "^":
                    this.scene.rotate(this.angle, 0, 1, 0);
                    break;

                case "&":
                    this.scene.rotate(-this.angle, 0, 1, 0);
                    break;

                case "[":
                    // push
                    this.scene.pushMatrix();
                    break;

                case "]":
                    // pop
                    this.scene.popMatrix();
                    break;

                case "l":
                    this.currentDiameter = this.currentDiameter/2;
                    break;
                case "_":
                    this.currentDiameter = this.currentDiameter*2;
                    break;

                // processa primitiva definida na gramatica, se existir
                default:
                    var primitive=this.grammar[this.axiom[i]];

                    if(this.axiom[i] === "Z")
                    {
                        primitive.setDiameter(this.currentDiameter);
                        primitive.setLength(this.currentLength);
                        primitive.display();
                        this.scene.translate(0, this.currentLength, 0);
                    }
                    else if ( this.axiom[i] === "L" )
                    {
                        this.scene.pushMatrix();
                        this.scene.translate(0, -this.currentLength/2, 0);
                        let scale = Math.min(this.currentDiameter, 1);
                        this.scene.scale(scale, scale, scale);
                        primitive.display();
                        this.scene.popMatrix();
                    }
                    else if ( primitive )
                    {
                        primitive.display();
                        this.scene.translate(0, 0.8, 0);
                    }
                    break;
            }
        }
        this.scene.popMatrix();
    }
}