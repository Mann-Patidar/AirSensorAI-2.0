def individual_data(todo):
    return {
        "id": str(todo["_id"]),
        "aqi": todo["aqi"],
        # "temp": todo["temp"],
        # "humidity": todo["humidity"]
    }

def list_data(todos):
    return [individual_data(todo) for todo in todos]