export class App {
  constructor() {
    this.message = 'Matej\'s game!';
    this.points=0;
    this.negativepoints=0;
    this.level=1;
    this.gameover=true;
    this.myKeypressCallback = this.keypressInput.bind(this);
  }

  dettached() {
    window.removeEventListener('keypress', this.myKeypressCallback);
  }

  // This function is called by the aliased method
  keypressInput(e) {

    if (e.keyCode == 37 ) //left
    {
      if (this.nx>30) {
        this.smaznadobka()
        this.nx-=10
        this.nadobka()
      }
    }
    if (e.keyCode == 39) //right
    {

      if (this.nx<370) {
        this.smaznadobka()
        this.nx+=10
        this.nadobka()

      }
    }
    if (e.keyCode == 13) {
      if (this.gameover){
        this.startgame();
      }
    }
  }

  attached() {
    window.addEventListener('keypress', this.myKeypressCallback, false);
    let canvas = document.getElementById("game");
    let ctx = canvas.getContext("2d");
    this.ctx = ctx;
    //this.kolecko(10,15);
//    this.ctverec(30,15);
//    this.trojuhelnik(50,15);
    //this.posunujkolecko(10,15);
  }

  startgame(){
    this.gameover=false;
    this.ctx.fillStyle = "#aaaaff";
    this.ctx.fillRect(0,0,400,600);
    this.ny=540;
    this.nx=50;
    this.points=0;
    this.negativepoints=0;
    this.level=1;
    this.nadobka();
    this.novekolecko(this);

  }

  nadobka(){
    this.ctx.fillStyle = "#0000ff";
    this.ctx.fillRect(this.nx-30,this.ny,60,10);
  }
  smaznadobka(){
    this.ctx.fillStyle = "#aaaaff";
    this.ctx.fillRect(this.nx-30,this.ny,60,10);
  }

  ctverec(x,y) {
    this.ctx.fillStyle = "#0000ff";
    this.ctx.fillRect(x-7,y-7,15,15);
  }

  smazctverec(x,y) {
    this.ctx.fillStyle = "#aaaaff";
    this.ctx.fillRect(x-7,y-7,15,15);
  }


  kolecko(x,y) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 7, 0, 2*Math.PI, false);
    this.ctx.fillStyle = 'blue';
    //this.ctx.lineWidth = 1;
    this.ctx.fill();
    //this.ctx.strokeStyle = '#003300';
    //this.ctx.stroke();
  }

  smazkolecko(x,y) {
    this.ctx.fillStyle = "#aaaaff";
    this.ctx.fillRect(x-7,y-7,15,15);
  }


  trojuhelnik(x,y) {
    this.ctx.fillStyle = 'blue';
    this.ctx.beginPath();
    this.ctx.moveTo(x,y-7);
    this.ctx.lineTo(x-7,y+7);
    this.ctx.lineTo(x+7,y+7);
    this.ctx.fill();
  }

  smaztrojuhelnik(x,y) {
    this.ctx.fillStyle = '#aaaaff';
    this.ctx.beginPath();
    this.ctx.moveTo(x,y-7);
    this.ctx.lineTo(x-7,y+7);
    this.ctx.lineTo(x+7,y+7);
    this.ctx.fill();
  }

  novekolecko(that){
    let y=15;
    let x=10*Math.floor(Math.random()*40+1)
    if (that.negativepoints<5) that.posunujkolecko(x,y)
    else that.gameover=true;
  }

  posunujkolecko(xx,yy){
  //  console.log("posunujkolecko");
    this.x=xx;
    this.y=yy;
    this.maxy=585;
    this.delay=66-(6*this.level);
    setTimeout(this.posunkolecko,this.delay,this)
  }

  posunkolecko(that){
//    console.log("posunkolecko "+that.x+' '+that.y);
    if ((that.y+10 >=that.ny) && (Math.abs(that.x-that.nx)<=30)) {
      that.points++;
      if (that.points % 10 == 0) {
        if (that.level<10)that.level++;
      }
      that.smazkolecko(that.x,that.y);
      that.nadobka();
      setTimeout(that.novekolecko,that.delay,that)
    } else

    if (that.y<that.maxy) {
      that.smazkolecko(that.x,that.y);
      that.y+=10;
      that.kolecko(that.x,that.y);
      setTimeout(that.posunkolecko,that.delay,that);
    } else {
      that.negativepoints++;
      setTimeout(that.novekolecko, that.delay, that)
    }
  }
}
