export function obtenerLocalizacion(callback: Function) {

  navigator.geolocation.getCurrentPosition((position) => {
    const latitud = position.coords.latitude;
    const longitud = position.coords.longitude;
    callback(latitud, longitud);
  }, (error) => {
    console.log(error);
  });

}
