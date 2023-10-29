import requests
from faker import Faker
import random
import requests
import json
from datetime import date
import time

url = "https://api-frota.onrender.com/driver"

fake = Faker()

from random import randint

i = 0

def cpf_generate():
    #  Gera os primeiros nove dígitos (e certifica-se de que não são todos iguais)
    while True:
        cpf = [randint(0, 9) for i in range(9)]
        if cpf != cpf[::-1]:
            break

    #  Gera os dois dígitos verificadores
    for i in range(9, 11):
        value = sum((cpf[num] * ((i + 1) - num) for num in range(0, i)))
        digit = ((value * 10) % 11) % 10
        cpf.append(digit)

    #  Retorna o CPF como string
    result = ''.join(map(str, cpf))
    return result



while True:
    i += 1

    headers = {"Content-Type": "application/json"}



    payload = {
        "name": fake.name() + fake.name().split('  ')[-1],    
        "cpf": cpf_generate(),
        "rg": str(fake.random_int(min=1000000000, max=9999999999)),
        "workload": fake.job(),
        "supervisor": fake.name().split('  ')[-1],
        "cnh_number": str(fake.random_int(min=1000000000, max=9999999999)),
        "cnh_category": fake.random_element(elements=("A", "B", "C", "D", "E")),
        "cnh_expiration": fake.date_of_birth().strftime('%Y-%m-%d'),  # Converter data de nascimento em string
        "address": fake.address(),
        "neighborhood": fake.name().split('  ')[-1],
        "number_address": str(fake.random_int(min=0, max=99999)),
        "state": fake.random_element(elements=("BA", "MG")),
        "city": fake.city(),
        "email": fake.email(),
        "cell_phone": '9' + ''.join(random.choice("0123456789") for _ in range(10)),
        "whatsapp": '9' + ''.join(random.choice("0123456789") for _ in range(10)),
        "integration_code": fake.bothify(text="??##??"),
}

    start_time = time.time()  # Marcar o tempo de início


    response = requests.request("POST", url, json=payload, headers=headers)
    end_time = time.time()  # Marcar o tempo de término



    print(response.status_code, " | ", i, " | ", f'{(end_time - start_time):.3f} ms')


 
