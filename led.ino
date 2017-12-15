#include <AFMotor.h>

AF_DCMotor motorL(22);
AF_DCMotor motorR(1);


// these constants describe the Accelerometer pins. They won't change:
const int groundpin = 14;             // analog input pin 4 -- ground
const int powerpin = 18;              // analog input pin 5 -- voltage
const int xpin = A3;                  // x-axis of the accelerometer
const int ypin = A2;                  // y-axis
const int zpin = A1;                  // z-axis (only on 3-axis models)




void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  pinMode(LED_BUILTIN, OUTPUT);

 /* // Provide ground and power by using the analog inputs as normal digital pins.

  pinMode(groundpin, OUTPUT);
  pinMode(powerpin, OUTPUT);
  digitalWrite(groundpin, LOW);
  digitalWrite(powerpin, HIGH);

  //Set Motor Speed*/

  

  
}

void loop() {

int Xvalue=analogRead(xpin); // X axis values stored in a variable 
int Yvalue=analogRead(ypin); // Y axis values stored in a variable


  
  // put your main code here, to run repeatedly:
  // print the sensor values:
  Serial.print(analogRead(xpin));
  // print a tab between values:
  Serial.print("\t");
  Serial.print(analogRead(ypin));
  // print a tab between values:
  Serial.print("\t");
  Serial.print(analogRead(zpin));
  Serial.println();




   if(Xvalue>350 ) // The X axis values are used for vertical movement 
  { 

    digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);   
  
/*motorL.run(FORWARD);
motorR.run(FORWARD);
delay(1600);*/
  } 
  else if(Xvalue<=305) 
  {  
                       // wait for a second
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);   
  /*motorL.run(BACKWARD); 
   motorR.run(BACKWARD); // run in reverse
   delay(1600);*/
   } 



   

  // delay before next reading:
  delay(100);
}
