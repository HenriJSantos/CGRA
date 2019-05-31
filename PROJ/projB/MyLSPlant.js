/**
 * MyLSystem
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLSPlant extends MyLSystem {
	constructor(scene) {
        super(scene);

        this.sides = 7;
        this.currentDiameter = 1;
        this.currentLength = 3;


        this.productions =
            {
                "F": ["FF", "F"],  //Trunk
                "Z": ["[Zl\\ZLL_]", "[Zl-ZLL+lZLL__]"],  //Branch
                "E": ["[Zl\\ZL_]", "[Zl-ZL+lZLL__]"],  //first Branch
                "X": ["FF[-X]FE[/X]+X",
                    "FF[/E][\\X]+X",
                    "FE[+X]/X",
                    "F[/X]-FE[\\X]+X\\",
                    "FFE[\\X]/X",
                    "FF[+E][/X]\\X",
                    "F[+X]FE[\\X]-X",
                    "FFE[+X]\\X",
                    "FE[/X]-X"]
            };


        this.init();
        this.createTree();
        this.checkIterations();
    }

    init(){
        // cria o lexico da gramática
        this.initGrammar();
    }

    // cria o lexico da gramática
    initGrammar(){
        this.grammar = {
            "F": new MyTrunk(this.scene),
            "L": new MyFoliage(this.scene, 9),
            "Z": new MyBranch(this.scene, this.currentDiameter, this.currentLength, this.sides),
            "X": new MyLeaf(this.scene)
        };
    };

	createTree()
    {
        this.generate(
            "X",
            this.productions,
            35.0,
            4,
            0.9);
    }

    checkIterations() {
	    let newString = "";
        for (let j=0; j<this.axiom.length; ++j){
            let axiomProductions=this.productions[this.axiom[j]];
            if (this.axiom[j] === "E"){
                newString += axiomProductions[Math.floor(Math.random() * axiomProductions.length)];
            }
            else newString += this.axiom[j];
        }

        this.axiom = newString;
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
                        let scale = Math.min(this.currentDiameter*1.5, 1);
                        this.scene.scale(scale, scale, scale);
                        primitive.display();
                        this.scene.popMatrix();
                    }
                    else if ( primitive )
                    {
                        primitive.display();
                        this.scene.translate(0, 1, 0);
                    }
                    break;
            }
        }
        this.scene.popMatrix();
    }
}