from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

driver = webdriver.Chrome()
driver.get("http://localhost:8100")
time.sleep(5)

try:
    # Buscar botón "Registrarse"
    btn_registrarse = WebDriverWait(driver, 15).until(
        EC.element_to_be_clickable((By.XPATH, "//ion-button[contains(., 'Registrarse')]"))
    )
    
    # Click mediante JS para evitar problemas con Shadow DOM
    driver.execute_script("arguments[0].click();", btn_registrarse)
    
    # Verificar redirección
    WebDriverWait(driver, 10).until(
        EC.url_contains("/registro")
    )
    print("✅ Redirección a registro exitosa")

except Exception as e:
    print("❌ Error en MTC 020:", e)

finally:
    driver.quit()