//TO DO: RE-THINK THIS SHIT ENTIRELY... FML
class Cell
{
	constructor()
	{
		this.children = new PIXI.Container();
		this.base = new PIXI.Graphics();
		this.base.beginFill(0x00AACC);
		this.base.drawRect(0, 0, 54, 54);
		this.base.endFill();
		this.base.position.set(593, 243);
	}
}

class TestTube
{
	constructor()
	{
		this.mapHeight = 1000;
		this.mapWidth = 1000;
		
		this.mapLocX = 284;
		this.mapLocY = 150;
		
		this.testTubeMask = new PIXI.Graphics();
		this.testTubeMask.beginFill(0x0000000);
		this.testTubeMask.drawPolygon([
			356, 103,
			844, 103,
			844, 112,
			863, 112,
			863, 121,
			872, 121,
			872, 140,
			881, 140,
			881, 328,
			872, 328,
			872, 347,
			863, 347,
			863, 356,
			845, 356,
			845, 365,
			356, 365,
			356, 356,
			338, 356,
			338, 347,
			329, 347,
			329, 328,
			320, 328,
			320, 140,
			329, 140,
			329, 121,
			338, 121,
			338, 112,
			356, 112
		]);
		this.testTubeMask.endFill();
		stage.addChild(this.testTubeMask);
		
		this.map = new PIXI.Container();
		this.map.position.set(309, 93);
		stage.addChild(this.map);
		this.map.mask = this.testTubeMask;
		
		this.food = [];
	}
	
	testTubeLoop()
	{
		if(this.food.length <= 20)
		{
			this.food.push(new PIXI.Graphics());
			this.food[this.food.length - 1].beginFill(0x22BBDD);
			this.food[this.food.length - 1].drawRect( 0, 0, 9, 9);
			this.food[this.food.length - 1].endFill();
			this.food[this.food.length - 1].position.set(Math.floor(Math.random() * this.mapWidth) + 1, Math.floor(Math.random() * this.mapHeight) + 1);
			this.map.addChild(this.food[this.food.length - 1]);
		}
	}
	
}

