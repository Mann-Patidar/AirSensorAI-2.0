#include <WiFi.h>
#include <HTTPClient.h>

// 🔹 WiFi credentials
const char *ssid = "muskan";
const char *password = "muskan346";

// 🔹 Your FastAPI endpoint (UPDATED with your IP)
const char *serverName = "http://192.168.137.206:8000/add_data";

// 🔹 AQI value
float aqi = 0.0;

void setup()
{
    Serial.begin(115200);

    // 🔹 Connect to WiFi
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi");

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println("\n✅ Connected to WiFi!");
    Serial.print("ESP32 IP Address: ");
    Serial.println(WiFi.localIP());
}

void loop()
{

    // 🔹 Simulate AQI (replace later with sensor)
    aqi = random(50, 200) / 1.0;

    if (WiFi.status() == WL_CONNECTED)
    {

        HTTPClient http;

        Serial.println("\n🔄 Sending request...");
        Serial.print("AQI Value: ");
        Serial.println(aqi);

        http.begin(serverName);
        http.addHeader("Content-Type", "application/json");

        // 🔹 JSON data
        String jsonData = "{\"aqi\": " + String(aqi) + "}";

        Serial.print("JSON Sent: ");
        Serial.println(jsonData);

        // 🔹 Send POST request
        int httpResponseCode = http.POST(jsonData);

        // 🔹 Response handling
        Serial.print("HTTP Response Code: ");
        Serial.println(httpResponseCode);

        if (httpResponseCode > 0)
        {
            String response = http.getString();
            Serial.print("Server Response: ");
            Serial.println(response);
        }
        else
        {
            Serial.println("❌ Error sending request");
        }

        http.end();
    }
    else
    {
        Serial.println("❌ WiFi Disconnected");
    }

    delay(5000); // send every 5 seconds
}