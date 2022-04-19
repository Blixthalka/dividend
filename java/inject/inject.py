import requests
import random

def fetch_dividends(avanza_id, local_id):
    url = "https://www.avanza.se/_api/market-guide/stock/" + str(avanza_id)

    r = requests.get(url = url)

    if r.status_code != 200:
        print(r.status_code)
        exit()
    data = r.json()

    for event in [*data['dividends']['events'], *data['dividends']['pastEvents']]:

        if not 'paymentDate' in event:
            continue

        body = {
            'exDate': event['exDate'],
            'valueDate': event['paymentDate'],
            'currency': event['currencyCode'],
            'amount': event['amount']
        }

        post_r = requests.post( url = "http://localhost:8080/api/instruments/" + str(local_id) + "/dividends", json = body)

        if post_r.status_code != 200:

            exit()

        print("Created " + str(post_r.json()))


def create_instrument(name, currency):

    body = {
        'name': name,
        'currency': currency
    }

    post_r = requests.post( url = "http://localhost:8080/api/instruments/", json = body)

    if post_r.status_code != 200:
        exit()

    return post_r.json()


def create_transaction(instrument_id, quantity):
    body = {
        'instrumentId': instrument_id,
        'quantity': quantity,
        'type': 'BUY',
        'date': '2022-01-01'
    }

    post_r = requests.post( url = "http://localhost:8080/api/transactions", json = body)

    if post_r.status_code != 200:
        exit()

    return post_r.json()


def create(name, avanza_id, quantity, currency = "SEK"):
    inst = create_instrument(name, currency)
    fetch_dividends(avanza_id, inst['id'])
    create_transaction(inst['id'], quantity)
    print("created " + name)


create("Evolution", 549768, 30)
create("Castellum", 5353, 102)
create("Swedish Match", 5266, 284)
#create("Nordea", 5249)
create("LVMH", 745862, 1, "EUR")
#create("Johnson & Johnson", 3666, "USD")
create("Investor", 5246, 57)
#create("Latour", 5321),
#create("Cibus Nordic Real Estate", 831975)



