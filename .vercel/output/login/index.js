"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const PINTEREST_CLIENT_ID = process.env.PINTEREST_CLIENT_ID || '1536693';
const PINTEREST_REDIRECT_URI = process.env.PINTEREST_REDIRECT_URI; // Usaremos la variable de entorno de Vercel
const PINTEREST_SCOPE = 'boards:read,pins:read';
function default_1(req, res) {
    const { email } = req.query;
    if (!email) {
        return res.status(400).send('Email is required.');
    }
    if (!PINTEREST_REDIRECT_URI) {
        return res.status(500).send('Server configuration error: PINTEREST_REDIRECT_URI is not set.');
    }
    const pinterestAuthUrl = new URL('https://www.pinterest.com/oauth/');
    pinterestAuthUrl.searchParams.append('client_id', PINTEREST_CLIENT_ID);
    pinterestAuthUrl.searchParams.append('redirect_uri', PINTEREST_REDIRECT_URI);
    pinterestAuthUrl.searchParams.append('scope', PINTEREST_SCOPE);
    pinterestAuthUrl.searchParams.append('response_type', 'code');
    pinterestAuthUrl.searchParams.append('state', email.toString());
    res.redirect(pinterestAuthUrl.toString());
}
