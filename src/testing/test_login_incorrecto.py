from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time


# Inicia el navegador
driver = webdriver.Chrome()

# Abre tu app (ajusta la URL si es distinta)
driver.get("http://localhost:8100")  # o la URL desplegada

# Espera carga de la app
time.sleep(3)

# Ir al login (puede variar si hay un splash o ruta distinta)
# Encuentra los campos (ajusta los selectores según tu HTML)
correo_input = driver.find_element(By.ID, "correo")  # ejemplo ID
password_input = driver.find_element(By.ID, "password")
login_button = driver.find_element(By.ID, "btnLogin")

# Ingresa credenciales inválidas
correo_input.send_keys("usuario@correo.com")
password_input.send_keys("contraseña123")
login_button.click()

# Espera respuesta
time.sleep(2)

# Verifica el mensaje de error (ajusta selector)
error_message = driver.find_element(By.ID, "errorMsg")  # ejemplo ID
assert "credenciales inválidas" in error_message.text.lower()

print("✅ Prueba de login con credenciales incorrectas: PASÓ")

driver.quit()
