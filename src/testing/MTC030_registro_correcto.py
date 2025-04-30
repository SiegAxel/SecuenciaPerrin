from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time

def fill_ionic_input(driver, field_name, value):
    try:
        # Localizar el contenedor del input
        container = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, f"ion-input[formcontrolname='{field_name}'], [formcontrolname='{field_name}']")))
        
        # Desplazar el elemento a la vista
        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", container)
        time.sleep(0.5)
        
        # Localizar el input real dentro del componente
        input_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, f"ion-input[formcontrolname='{field_name}'] input, [formcontrolname='{field_name}'] input"))
        )
        
        # Limpiar y escribir usando ActionChains
        ActionChains(driver)\
            .move_to_element(input_element)\
            .click()\
            .pause(0.3)\
            .key_down('\ue009')\
            .send_keys('a')\
            .key_up('\ue009')\
            .send_keys(value)\
            .perform()
            
        print(f"✓ Campo {field_name} llenado: {value}")
        return True
        
    except Exception as e:
        print(f"✗ Error en campo {field_name}: {str(e)}")
        driver.save_screenshot(f"error_{field_name}.png")
        return False

driver = webdriver.Chrome()
driver.maximize_window()
driver.get("http://localhost:8100/registro")

try:
    # Esperar a que el formulario esté completamente cargado
    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "ion-input[formcontrolname='rut']")))
    
    # Datos de prueba
    test_data = {
        "rut": "21.112.450-4",
        "nombre": "Felipe Andrade",
        "email": "elchelipeandrade@duocuc.cl",
        "fechanac": "15-05-1999",  # Formato DD-MM-YYYY
        "pass1": "Judas123",
        "pass2": "Judas123"
    }

    # Llenar formulario
    for field, value in test_data.items():
        if not fill_ionic_input(driver, field, value):
            raise Exception(f"Fallo al llenar {field}")

    # Esperar validación del formulario
    WebDriverWait(driver, 15).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "ion-button[type='submit']:not([disabled])")))
    
    # Tomar screenshot pre-registro
    driver.save_screenshot("pre_registro.png")
    
    # Click con JavaScript para evitar problemas de intercepción
    submit_btn = driver.find_element(By.CSS_SELECTOR, "ion-button[type='submit']")
    driver.execute_script("arguments[0].click();", submit_btn)
    
    time.sleep(1.5)
    
    print("✅ Registro completado correctamente")
    driver.save_screenshot("registro_exitoso.png")

except Exception as e:
    print(f"❌ Error crítico: {str(e)}")
    driver.save_screenshot("error_fatal.png")
    raise

finally:
    driver.quit()