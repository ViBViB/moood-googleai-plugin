var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 320, height: 200, title: 'Moood-GoogleAI Connect' });
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    if (msg.type === 'connect-pinterest') {
        figma.ui.postMessage({ type: 'auth-in-progress', message: 'Abriendo Pinterest para autorización...' });
        // *** IMPORTANTE ***
        // Reemplaza 'YOUR_VERCEL_APP_DOMAIN' con el dominio que te dé Vercel al desplegar tu API.
        // Por ejemplo: 'https://moood-googleai-auth.vercel.app'
        const PROXY_URL = 'https://YOUR_VERCEL_APP_DOMAIN'; // ¡Cámbialo!
        // Simulamos un email de usuario por ahora.
        const userEmail = 'test@moood-googleai.app';
        // Abrir una nueva ventana del navegador para la autenticación de Pinterest
        // Figma no puede abrir ventanas emergentes directamente, así que le pedimos a la UI que lo haga.
        // El método más confiable es que la UI abra una nueva pestaña del navegador.
        // La UI escuchará el 'window.onmessage' de la página de redirección final.
        figma.showUI(`
      <script>
        window.open('${PROXY_URL}/api/login?email=${encodeURIComponent(userEmail)}');
        
        window.onmessage = (event) => {
          if (event.data && event.data.pluginMessage) {
            // Reenviar el mensaje al plugin principal (code.ts)
            parent.postMessage({ pluginMessage: event.data.pluginMessage }, '*');
          }
        };
      </script>
    `, { visible: false }); // Abrimos una UI invisible solo para ejecutar el script
    }
});
