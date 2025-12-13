import 'server-only'


const firebase_session_token = process.env.CLIENT_SESSION_KEY;


export default async function createSession(expireTime) {
    const expiresAt = Date.now() + expireTime; 

    
}