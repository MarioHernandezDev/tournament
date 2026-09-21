// Estado global de carga: false hasta que la animación de salida del preloader termina.
// useState vive en memoria: se resetea al recargar (el preloader vuelve a salir) pero
// se conserva al navegar entre páginas internas (no vuelve a salir).
export const useAppLoaded = () => useState('isAppLoaded', () => false)

// Ejecuta `cb` en cuanto el preloader ha terminado (al instante si ya lo hizo).
// Recibe el ref ya resuelto porque useState solo puede llamarse de forma síncrona en setup.
// Devuelve la función para cancelar la espera.
export const whenAppLoaded = (isAppLoaded, cb) => {
  if (isAppLoaded.value) {
    cb()
    return () => {}
  }
  return watch(isAppLoaded, (loaded) => { if (loaded) cb() }, { once: true })
}

// Versión en promesa de whenAppLoaded, para setups asíncronos (tras un await ya no hay instancia de componente).
export const waitForAppLoaded = (isAppLoaded) => new Promise((resolve) => whenAppLoaded(isAppLoaded, resolve))
