from faker import Faker
import random
import requests
import json
from datetime import date
import time

fake = Faker()


def cpf_generate():
    #  Gera os primeiros nove dígitos (e certifica-se de que não são todos iguais)
    while True:
        cpf = [random.randint(0, 9) for i in range(9)]
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



def gerate():

    return {
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
        "integration_code": fake.bothify(text="??##??")
}


# URL da API
url = 'http://localhost:3001/driver'  # Substitua pela URL real da sua API


while True:
    # Dados para o corpo JSON
    data = gerate()


    # URL do arquivo de imagem na internet
    url_da_imagem = f'https://i.pravatar.cc/150?img={random.randint(1, 70)}'  # Substitua pela URL real da imagem

    # Faça o download do arquivo de imagem
    response_imagem = requests.get(url_da_imagem)

    if response_imagem.status_code == 200:
        # Salve o arquivo de imagem localmente
        with open('arquivo.jpg', 'wb') as file:
            file.write(response_imagem.content)

        # Arquivo de imagem a ser enviado
        files = {'photo': ('avatar.jpg', open('arquivo.jpg', 'rb'))}

        # Faça a solicitação POST com os dados e o arquivo
        response = requests.post(url, data=data, files=files)

        # Verifique a resposta
        if response.status_code == 200:
            print('Sucesso:', response.json())
        else:
            print('Erro:', response.text)
    else:
        print('Erro ao fazer o download da imagem')
