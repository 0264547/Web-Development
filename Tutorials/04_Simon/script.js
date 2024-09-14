const green=document.getElementById("green");
const red=document.getElementById("red");
const yellow=document.getElementById("yellow");
const blue=document.getElementById("blue");
const title=document.querySelector("h1");
const back=document.querySelector("body");

class Simon{
    constructor(){
        this.counter=0;
        this.level=0;
        this.steps=[];
        this.greenSound=new Audio("/Web-Development-main/Tutorials/04_Simon/sounds/green.mp3");
        this.redSound=new Audio("/Web-Development-main/Tutorials/04_Simon/sounds/red.mp3");
        this.yellowSound=new Audio("/Web-Development-main/Tutorials/04_Simon/sounds/yellow.mp3");
        this.blueSound=new Audio("/Web-Development-main/Tutorials/04_Simon/sounds/blue.mp3");
        this.wrongSound=new Audio("/Web-Development-main/Tutorials/04_Simon/sounds/wrong.mp3");
        this.listeners();
    }

    start(){
        title.textContent="Starting in 3 seconds";
        setTimeout(()=>{this.newLevel();},3000);
    }

    newLevel(){
        title.textContent="Pattern";
        this.steps.push(Math.floor(Math.random()*4));
        this.counter++;
        this.game();
    }

    game(){
        switch(this.steps[this.level]){
            case 0:
                greenPress();
            break;
            case 1:
                redPress();
            break;
            case 2:
                yellowPress();
            break;
            case 3:
                bluePress();
            break;
        }

        this.level++;

        if(this.level<this.counter){
            setTimeout(()=>{this.game();},1000);
        }
        else{
            this.level=0;
            setTimeout(()=>{this.turn();},1000);
        }
    }

    turn(){
        title.textContent="Your Turn";   
    }

    listeners(){
        green.addEventListener("click",()=>this.press(0));
        red.addEventListener("click",()=>this.press(1));
        yellow.addEventListener("click",()=>this.press(2));
        blue.addEventListener("click",()=>this.press(3));
    }

    press(num){
        if(this.steps[this.level]==num){
            switch(num){
                case 0:
                    greenPress()
                break;
                case 1:
                    redPress()
                break;
                case 2:
                    yellowPress()
                break;
                case 3:
                    bluePress()
                break;
            }

            this.level++;
            if(this.level==this.counter){
                this.level=0;
                setTimeout(()=>{this.newLevel();},1000);
            }
        }
        else{
            title.textContent="Game Over";
            wrong();
        }
    }
}

function greenPress(){
    green.classList.add("pressed");
    setTimeout(()=>{green.classList.remove("pressed")},500);
    simon.greenSound.play();
}

function redPress(){
    red.classList.add("pressed");
    setTimeout(()=>{red.classList.remove("pressed")},500);
    simon.redSound.play();
}

function yellowPress(){
    yellow.classList.add("pressed");
    setTimeout(()=>{yellow.classList.remove("pressed")},500);
    simon.yellowSound.play();
}

function bluePress(){
    blue.classList.add("pressed");
    setTimeout(()=>{blue.classList.remove("pressed")},500);
    simon.blueSound.play();
}

function wrong(){
    back.classList.add("game-over");
    simon.wrongSound.play();
    setTimeout(()=>{this.reset();},2000);
}

function reset(){
    simon.level=0;
    simon.counter=0;
    simon.steps=[];
    title.textContent="Press A Key to Start";
    back.classList.remove("game-over");
}

var simon = new Simon();

document.addEventListener('keydown',(event)=>{
    if(event.key==='A'){
        simon.start();
    }
})