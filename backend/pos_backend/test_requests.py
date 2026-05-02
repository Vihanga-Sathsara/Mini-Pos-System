import requests
import threading

URL = 'http://localhost:8000/api/purchase/'

def make_purchase():
    response = requests.post(URL, json={'product_id': 1})
    print(response.json())
threads = []

for i in range(100):
    thread = threading.Thread(target=make_purchase)
    threads.append(thread)
    thread.start()

for thread in threads:
    thread.join()