#include <Keyboard.h>

const int buttonPin = 2;
int buttonState = 0;
int lastButtonState = HIGH;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  Keyboard.begin();
}

void loop() {
  buttonState = digitalRead(buttonPin);

  if (buttonState == LOW && lastButtonState == HIGH) {
    Keyboard.write(KEY_RETURN);
    delay(50);
  }




  lastButtonState = buttonState;
}
