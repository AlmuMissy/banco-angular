export function esJSON(datos: string): boolean {

    try {
      JSON.parse(datos);
  
      // esta línea se ejecutará si JSON.parse no genera ninguna excepción. En ese caso datos posee formato JSON
      return true;
    } catch(e) {
      // este catch se ejecutando la variable datos no posee formato JSON
      return false;
    }
  }
  