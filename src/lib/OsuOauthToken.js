// This is just temp caches
var cachedToken = null;
var tokenExpiresAt = null;


export async function getToken(){
    return cachedToken;
}

export async function setCookie(expiresInSeconds) {
    tokenExpiresAt = Date.now() + expiresInSeconds * 1000;
}

export async function isTokenExpired()
{
    if (!cachedToken || !tokenExpiresAt) {
        return true;
    }
    return Date.now() >= tokenExpiresAt;
}