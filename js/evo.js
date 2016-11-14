var state = play;
var player = new PlayerData();
//Canvas Init
var renderer = PIXI.autoDetectRenderer(1200, 700);
document.body.appendChild(renderer.view);
stage = new PIXI.Container();
renderer.view.style.border = "1px dashed white";
renderer.backgroundColor = 0x333333;
renderer.render(stage);

//Interactivity Init
var t = new Tink(PIXI, renderer.view);
var pointer = t.makePointer();


//Background Screen Objects Init
DNABackground = new ScreenObject("DNABackground", "res/DNABackground.png", 150, 234);

fundsBar = new ScreenObject("fundsBar", "res/fundsBar.png", 0, 0);
fundsBar.sprite.anchor.set(0,0);

fBarLimit = new PIXI.Graphics();
fBarLimit.beginFill(0x356180);
fBarLimit.drawRect(0, 75, 1200, 9);
fBarLimit.endFill();

testTubeBackground = new ScreenObject("testTube", "res/testTube.png", 300, 84);
testTubeBackground.sprite.anchor.set(0,0);

DNAText = new PIXI.Text("DNA", {fontFamily: 'silkscreenbold', fontSize: 20, fill: "white"});
DNAText.anchor.set(0.5, 0);
DNAText.position.set(493.5, 26.5);

stage.addChild(DNABackground.sprite);
stage.addChild(fundsBar.sprite);
stage.addChild(DNAText);
stage.addChild(fBarLimit);
stage.addChild(testTubeBackground.sprite);

//Foreground Screen Objects Init
DNA = new ScreenObject("DNA", "res/DNA.png", 150, 234);
DNACount = new PIXI.Text(player.dna + "", {fontFamily: 'silkscreennormal', fontSize: 15, fill: "white"});
DNACounter = new Counter(0, 0);
moneyCounter = new Counter(720, 0);
testTube = new TestTube();
baseCell = new Cell();

var Plocation = new PIXI.Graphics();
Plocation.beginFill(0x00FF00);
Plocation.drawRect(0, 0, 25, 25);
Plocation.endFill();

//Object Interactivity Init
DNA.makeButton(DNAPress, DNARelease);
t.makeDraggable(Plocation);

function DNAPress()
{
	DNA.sprite.scale.x = 0.8;
	DNA.sprite.scale.y = 0.8;
	player.dna += player.dnaPower;
	DNACount.text = player.dna;
}

function DNARelease()
{
}

//Foreground ScreenObjects to Render Stage
stage.addChild(DNA.sprite);
stage.addChild(DNACount);
stage.addChild(Plocation);
renderer.render(stage);


function play()
{
	if(pointer.hitTestSprite(DNA.sprite))
		DNA.smoothScale(0.02);
	else
		DNA.smoothScale(-0.02);
}

function getSign(x)
{
	if(x >= 0)
		return 1;
	return -1;
}


function gameLoop()
{
	testTube.testTubeLoop();
	requestAnimationFrame(gameLoop);
	DNACounter.number = player.DNAToArray();
	for(var i = 0; i < 11; i++)
		DNACounter.updateRoller(i);
	for(var i = 0; i < 11; i++)
		moneyCounter.updateRoller(i);
	t.update();
	state();
	console.log(Plocation.x, Plocation.y);
	renderer.render(stage);
}

gameLoop();
