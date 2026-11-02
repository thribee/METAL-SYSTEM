
import os
from pathlib import Path

import mysql.connector
from dotenv import load_dotenv

# Carrega o .env da raiz do projeto
load_dotenv(Path(__file__).resolve().parent.parent / ".env")


def conectar():
    conexao = mysql.connector.connect(
        host="127.0.0.1",
        port=3306,
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )

    return conexao
