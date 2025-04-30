from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

driver = webdriver.Chrome()
driver.get("http://localhost:8100")  # Ajusta la URL si es necesario
time.sleep(6)  # Espera inicial para cargar la página

try:
    # Localizar el botón "Registrate aqui" por su clase
    btn_registro = WebDriverWait(driver, 15).until(
        EC.element_to_be_clickable((By.CLASS_NAME, "linkazul"))
    )
    
    # Hacer clic normalmente (no necesita Shadow DOM)
    btn_registro.click()
    
    # Verificar que la URL cambie a la página de registro
    WebDriverWait(driver, 10).until(
        EC.url_contains("/registro")  # Ajusta la ruta según tu app
    )
    print("✅ MTC 020: Redirección a registro exitosa")

except Exception as e:
    print(f"❌ MTC 020 - Error: {str(e)}")

finally:
    driver.quit()