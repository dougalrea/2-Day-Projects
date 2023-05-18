import time
import json

def respond(status, message):
    return {
        "statusCode": status,
        "body": json.dumps(
            {
                "message": message,
            }
        ),
    }

def lambda_handler(event, context):
    # Log the input payload
    for key, value in event.items():
        print(f'{key}: {value}')
    
    # Test error response
    if event.get('Version') == "5":
        return respond(400, f"ERROR: Bad request")

    # Count for ten seconds
    for i in range(1, 11):
        print(f'Counting: {i}')
        time.sleep(1)
    
    return respond(200, "Deployment Successful")
