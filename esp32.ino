#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

const char* ssid = "muskan";
const char* password = "muskan346";
const char* serverName = "http://192.168.137.206:8000/add_data";

LiquidCrystal_I2C lcd(0x27, 16, 2);

float aqi = 0.0;

void setup() {
  Serial.begin(115200);

  Wire.begin(21, 22);

  lcd.init();
  lcd.backlight();

  lcd.setCursor(0, 0);
  lcd.print("Connecting...");

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  lcd.clear();
  lcd.print("WiFi Connected");
  delay(2000);
}

void loop() {
  aqi = random(50, 200);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("AQI: ");
  lcd.print(aqi);

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    lcd.setCursor(0, 1);
    lcd.print("Sending...");

    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");

    String jsonData = "{\"aqi\": " + String(aqi) + "}";

    int httpResponseCode = http.POST(jsonData);

    lcd.clear();

    if (httpResponseCode > 0) {
      lcd.print("Sent OK");
    } else {
      lcd.print("Send Failed");
    }

    http.end();
  }

  delay(5000);
}
