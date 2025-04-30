from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time

def test_correo_no_institucional():
    driver = webdriver.Chrome()
    driver.maximize_window()
    driver.get("http://localhost:8100/registro")
    
    try:
        # 1. Rellenar formulario con correo inválido
        datos = {
            "rut": "9.974.197-k",
            "nombre": "Usuario Test",
            "email": "correo_invalido@gmail.com",  # Correo no DUOC
            "fechanac": "15-05-2000",
            "pass1": "Judas123",
            "pass2": "Judas123"
        }
        
        # Función reutilizable del MTC030 (ajustada)
        def fill_field(field, value):
            container = WebDriverWait(driver, 15).until(
                EC.visibility_of_element_located((By.CSS_SELECTOR, f"ion-input[formcontrolname='{field}']")))
            ActionChains(driver).move_to_element(container).click().send_keys(value).perform()
            time.sleep(0.3)
        
        for field, value in datos.items():
            fill_field(field, value)
        
        # 2. Verificar mensaje de error
        error_message = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//*[contains(text(), 'Correo no institucional')]")))
        
        # 3. Validar que el botón sigue deshabilitado
        btn_registrar = driver.find_element(By.CSS_SELECTOR, "ion-button[type='submit']")
        assert "disabled" in btn_registrar.get_attribute("class"), "¡Error! Botón habilitado con correo inválido"
        
        print("✅ MTC050: Validación de correo institucional funciona correctamente")
        driver.save_screenshot("MTC050_exito.png")
        
    except Exception as e:
        driver.save_screenshot("MTC050_error.png")
        raise AssertionError(f"❌ MTC050 Falló: {str(e)}")
    
    finally:
        driver.quit()

if __name__ == "__main__":
    test_correo_no_institucional()