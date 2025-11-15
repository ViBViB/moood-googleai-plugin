figma.showUI(__html__, { width: 320, height: 200, title: 'Moood-GoogleAI Connect' });

console.log("Plugin 'code.ts' cargado y UI mostrada.");

figma.ui.onmessage = async (msg) => {
  console.log("Mensaje recibido en code.ts:", msg); // LOG 1: Ver si llega CUALQUIER mensaje

  if (msg.type === 'connect-pinterest') {
    console.log("Mensaje 'connect-pinterest' detectado. Procesando..."); // LOG 2: Ver si entra al IF

    figma.ui.postMessage({ type: 'auth-in-progress', message: 'Construyendo URL de autorización...' });

    const PROXY_URL = 'https://moood-googleai-plugin.vercel.app'; // Asegúrate de que este dominio es correcto
    const userEmail = 'test@moood-googleai.app';

    const authUrl = `${PROXY_URL}/api/login?email=${encodeURIComponent(userEmail)}`;
    console.log("URL de autenticación construida:", authUrl); // LOG 3: Ver la URL

    // Le pedimos a la UI que abra la ventana.
    figma.ui.postMessage({ type: 'open-auth-window', url: authUrl });
    console.log("Mensaje 'open-auth-window' enviado a la UI."); // LOG 4: Ver si se envía la respuesta
  }

  if (msg.type === 'auth-success' || msg.type === 'auth-error') {
     console.log('Resultado de autenticación recibido DE VUELTA en code.ts:', msg);
  }
};