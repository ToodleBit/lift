enum floorlevel {
   //% block="Top"
    Ground = 4,
   //% block="Third"
    First = 3,
    //% block="Second"
    Second = 2,
    //% block="First"
    Third = 1,
    //% block="Ground"
    Top = 0
}
enum direction {
//% block="up"
Up=1,
//% block="down"
Down=2
}
enum doors {
//% block="open"
Open=1,
//% block="close"
Close=2
}
enum characters {
//% block="person"
Person=1,
//% block="lift"
Lift=2,
//% block="destination"
Destination=3
}

let Lift: number;
let Destination: number;
let Person: number;

/**
 * Custom blocks
 */
//% weight=40 color=#E63022 icon="\uf0e4"
namespace lift {
 	
	let CheckVariableSet = 0;
    let LiftDoorsCheck = 0;

	//% weight=100
	//% block="Set %y to %x floor"
	export function startperson(y: characters, x: floorlevel) {
		if (y == 1) {        
		LedLevelPerson(x);
        Person = x;
		CheckVariableSet++;		}
		else if (y == 2){
		LedLevelLift(x);
        Lift = x;
		CheckVariableSet++;	
		}
		else {
		LedLevelDestination(x);
        Destination = x;
		CheckVariableSet++;	
		}

	}
	//% weight=90
	//% block="Lift level"
	export function showliftnum(): number {
        return Lift;
    }
	//% weight=90
    //% block="Destination level"
	export function showdestnum(): number {
        return Destination;
    }

	//% block="Call the lift"
	export function callLift(){
		if (CheckVariableSet != 3){  basic.showIcon(IconNames.No); }
		else {
		if (Lift > Person){
				while (Lift > Person){
					Lift--;
					LedLevelLift(Lift);
				}
		}
		else if (Lift < Person){
				while (Lift < Person){
					Lift++;
					LedLevelLift(Lift);
				}
		}
		else {
			LedLevelLift(Lift);
		}
	}
	}

	//% block="Choose destination floor"
	export function chooseFloor() {
				if (CheckVariableSet != 3){  basic.showIcon(IconNames.No); }
		else {
			Destination++;
			if (Destination == 5){Destination = 0;} 
			LedLevelDestination(Destination);
		}
		}

	//% block="Move lift %x"
    export function liftMove(x: direction) {
		if (CheckVariableSet != 3 || LiftDoorsCheck != 1){  basic.showIcon(IconNames.No); }
		else {
    if (errorCheck()==true) {
        if (x==1) {
		while(Destination > Lift) {
            LedLevelLift(Lift);
			Lift++;
						}
        }
        else {
        while(Destination < Lift) {
            LedLevelLift(Lift);
            Lift--;
                    }
        }  
            LedLevelLift(Lift);
            Person = Lift; 
    }  
		}
    }
	

//% block="Doors %x"
export function doorOperation(x: doors): void {
    if (x == 1){ open(); }
    else { close(); }
}


function close(): void {
    LiftDoorsCheck++;
    LedLevelPerson(7); 
	 for (let LeftPlot = 4; LeftPlot >-1; LeftPlot--) {
			led.plot(0, LeftPlot);
            basic.pause(300)
					}           
		}

function open(): void {
	for (let LeftPlot = 0; LeftPlot < 5; LeftPlot++) {
			led.unplot(0, LeftPlot);
            basic.pause(300)
					}     
            LiftDoorsCheck--;   
            LedLevelPerson(Person);   
		}

function resetCharacters(x:number){
                 basic.pause(300);
                LedLevelPerson(x);
                LedLevelLift(Lift);
                LedLevelDestination(Destination);
}
function errorCheck(): boolean {
            if (Lift != Person) {
                basic.clearScreen();
                basic.showIcon(IconNames.No);
                basic.pause(500);
                basic.clearScreen();
                resetCharacters(Person)
            return false;
        }
        else { return true;}
}

let oldLift = 6;
function LedLevelLift(level: number) {
      if (oldLift != 6){
           led.unplot(1, oldLift);
            led.unplot(2, oldLift);
            led.unplot(3, oldLift);
       }
      switch (level) {
            case 0:
                level = 4;
                break
              case 1:
                level = 3;
                break
                case 2:
                level = 2;
                break
               case 3:
                level = 1;
                break
                  case 4:
                level = 0;
                break
      }   
         led.plot(1, level)
         led.plot(2, level)
         led.plot(3, level)
         basic.pause(300)
         oldLift = level;
} 
    let oldPerson = 6;
function LedLevelPerson(level: number) {
    if (oldPerson == 7){ led.unplot(0, oldPerson) }
        if (oldPerson != 6){ led.unplot(0, oldPerson) }
      switch (level) {
            case 0:
                level = 4;
                break
              case 1:
                level = 3;
                break
                case 2:
                level = 2;
                break
               case 3:
                level = 1;
                break
                  case 4:
                level = 0;
                break
      }   
         led.plot(0, level)
         basic.pause(300)
         oldPerson = level;
} 
    let oldDestination = 6;
function LedLevelDestination(level: number) {

    if (oldDestination != 6){ led.unplot(4, oldDestination) }
      switch (level) {
            case 0:
                level = 4;
                break
              case 1:
                level = 3;
                break
                case 2:
                level = 2;
                break
               case 3:
                level = 1;
                break
                  case 4:
                level = 0;
                break
      }   
        led.plot(4, level)
        basic.pause(300)
        oldDestination = level;
}

}
