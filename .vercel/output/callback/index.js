"use strict";
// Forcing a new deploy with the latest changes
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const node_fetch_1 = __importDefault(require("node-fetch"));
const PINTEREST_CLIENT_ID = process.env.PINTEREST_CLIENT_ID || '1536693';
const PINTEREST_CLIENT_SECRET = process.env.PINTEREST_CLIENT_SECRET || '2af0e09c09b95d3bf56ab6943c4a4533f21cdd97';
const PINTEREST_REDIRECT_URI = process.env.PINTEREST_REDIRECT_URI;
const PLUGIN_SUCCESS_PAGE_URL = process.env.PLUGIN_SUCCESS_PAGE_URL;
async function default_1(req, res) {
    const { code, state: email, error, error_description } = req.query;
    if (!PINTEREST_REDIRECT_URI || !PLUGIN_SUCCESS_PAGE_URL) {
        return res.status(500).send('Server configuration error: Redirect URIs are not set.');
    }
    if (error) {
        console.error('Pinterest Auth Error:', error_description);
        return res.redirect(`${PLUGIN_SUCCESS_PAGE_URL}?error=${encodeURIComponent(error_description?.toString() || 'Authentication failed')}`);
    }
    if (!code || !email) {
        return res.status(400).send('Missing code or state (email) from Pinterest.');
    }
    try {
        const tokenResponse = await (0, node_fetch_1.default)('https://api.pinterest.com/v5/oauth/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${PINTEREST_CLIENT_ID}:${PINTEREST_CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code.toString(),
                redirect_uri: PINTEREST_REDIRECT_URI,
            }).toString(),
        });
        if (!tokenResponse.ok) {
            // Le decimos a TypeScript que esperamos un objeto con una propiedad opcional 'error_description'
            const errorData = await tokenResponse.json();
            console.error('Error exchanging code for token:', errorData);
            // Ahora TypeScript sabe que errorData.error_description es válido.
            return res.redirect(`${PLUGIN_SUCCESS_PAGE_URL}?error=${encodeURIComponent(errorData.error_description || 'Failed to get access token')}`);
        }
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;
        res.redirect(`${PLUGIN_SUCCESS_PAGE_URL}?email=${encodeURIComponent(email.toString())}&token=${encodeURIComponent(accessToken)}`);
    }
    catch (e) {
        console.error('Callback process error:', e);
        return res.redirect(`${PLUGIN_SUCCESS_PAGE_URL}?error=${encodeURIComponent(e.message || 'Internal server error')}`);
    }
}
