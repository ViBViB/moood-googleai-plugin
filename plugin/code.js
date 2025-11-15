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
console.log("Plugin 'code.ts' cargado y UI mostrada.");
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
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
});
