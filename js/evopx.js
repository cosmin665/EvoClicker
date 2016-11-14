var loader =  new PIXI.loaders.Loader();

class ScreenObject
{
	constructor(id, texturePath, x, y)
	{
		this.id = id;
		this.texturePath = texturePath;
		this.scaleVelocity = new PIXI.ObservablePoint(0, 0);
		this.velocity = new PIXI.ObservablePoint(0, 0);
		this.texture = PIXI.Texture.fromImage(texturePath);
		this.sprite = new PIXI.Sprite(this.texture);
		this.sprite.position.set(x, y);
		this.sprite.anchor.set(0.5, 0.5);
		this.normalScale = 1;
		this.hoverScale = 1.2;
		this.isPressed = false;
	}
	
	addToStage()
	{
		stage.addChild(this.sprite);
	}
	
	smoothScale(step)
	{
		if (this.sprite.scale.x + step <= this.hoverScale && this.sprite.scale.x >= this.normalScale)
		{
			this.sprite.scale.x += step;
			this.sprite.scale.y += step;
		}
		if(this.sprite.scale.x <= this.normalScale)
		{
			this.sprite.scale.x = this.normalScale;
			this.sprite.scale.y = this.normalScale;
		}
	}
	
	makeButton(press, release)
	{
		t.makeInteractive(this.sprite);
		this.sprite.press = press;
		this.sprite.release = release;
	}
}


class PlayerData
{
	constructor()
	{
		this.dna = 0;
		this.cash = 0;
		this.dnaPower = 1;
		this.cashMultiplier = 1;
	}
	DNAToArray()
	{
		var DNAArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		var dna = this.dna;
		for(var i = 10; i >= 0; i--)
		{
			DNAArray[i] = dna % 10;
			dna = Math.floor(dna/10);
		}
		return DNAArray;
	}
}

class Counter
{
	constructor(x, y)
	{
		this.number = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		this.x = x;
		this.y = y;
		this.hSpacing = 37.5;
		this.cText = [];
		this.colContainer = [];
		for(var i = 0; i < 11; i++)
			this.colContainer[i] = new PIXI.Container();
		for(var i = 0; i < 11; i++)
			this.cText[i] = [];
		this.counterMask = new PIXI.Graphics();
		this.counterMask.beginFill();
		this.counterMask.drawRect(0 , 9, 1200, 57);
		this.counterMask.endFill();
		this.style = {fontFamily: 'silkscreennormal',fontSize: 40, fill: "white"};
		stage.addChild(this.counterMask);
		for(var i = 0; i < 11; i++)
			for(var j = 0; j < 11; j++)
			{
				this.cText[i][j] = new PIXI.Text(j%10 + "", this.style);
				this.cText[i][j].anchor.set(0, 0);
				this.cText[i][j].position.set(0, y + 25 + this.style.fontSize * j);
				this.cText[i][j].mask = this.counterMask;
				this.colContainer[i].addChild(this.cText[i][j]);
				this.colContainer[i].x = x + 37 + i * this.hSpacing;
			}
		for(var i = 0; i < 11; i++)
		{
			stage.addChild(this.colContainer[i]);
		}
	}
	
	getDigit(index)
	{
		return Math.abs(Math.floor(this.colContainer[index].y / 40));
	}
	
	updateRoller(index)
	{	
		var inc = 10;
		if(this.colContainer[index].y <= -51 * 8 + 6)
			this.colContainer[index].y = 0;
		if(this.colContainer[index].y > 0)
			this.colContainer[index].y = - 51 * 8 + 4;
		if(this.getDigit(index)!=10)
		{
			if(this.getDigit(index) > this.number[index])
				this.colContainer[index].y +=inc;
			if(this.getDigit(index) <= this.number[index])
				this.colContainer[index].y -=inc;
		}
		else
		{
			if(this.number[index] == 0 && this.getDigit(index) != 1)
				this.colContainer[index].y -=inc;
			if(this.number[index] < 9 && this.number[index] != 0)
				this.colContainer[index].y +=inc;
		}
	}
}