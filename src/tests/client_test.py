# client_test.py
import requests


def test_client(name, endpoint):
    resp = requests.post(
        f"http://localhost:8000{endpoint}", json={"card": "1234"})
    print(f"{name} -> {endpoint}")
    print("Status:", resp.status_code)
    print("Headers:", resp.headers)
    print("Body:", resp.json())
    print("-" * 40)


test_client("Burger Chain", "/v1/charge")
test_client("Hotel App", "/v2/charge")
test_client("T-Shirt Store", "/v1/charge")
