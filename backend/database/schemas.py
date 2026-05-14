
def individual_data(todo):
    return {
        "id": str(todo["_id"]),
        "aqi": todo["aqi"],
        # "temp": todo["temp"],
        # "humidity": todo["humidity"]
        # "date_time": todo["date_time"]
    }

def list_data(todos):
    return [individual_data(todo) for todo in todos]