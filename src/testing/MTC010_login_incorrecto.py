from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

driver = webdriver.Chrome()
driver.get("http://localhost:8100")
time.sleep(8)

try:
    # Espera los inputs e ingresa usuario y clave
    correo_input = WebDriverWait(driver, 15).until(
        EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Ingrese su correo']"))
    )
    password_input = driver.find_element(By.XPATH, "//input[@placeholder='Ingrese su contraseña']")
    correo_input.send_keys("correo@falso.com")
    password_input.send_keys("clavefalsa")

    # Espera el componente ion-button que actúa como shadow host
    ion_btn = WebDriverWait(driver, 17).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "ion-button"))
    )

    # Usa JS para abrir el shadowRoot y clickear el <button> interno
    driver.execute_script("""
        const host = arguments[0];
        const btn = host.shadowRoot.querySelector('button');
        btn.click();
    """, ion_btn)
    time.sleep(5)
    print("✅ MTC 010: Login incorrecto Exitoso")

except Exception as e:
    print("❌ Error en la prueba MTC 010:", e)

finally:
    driver.quit()
