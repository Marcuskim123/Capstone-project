

export async function GET() {
    return Response.json({message:"Hello World"})
}

export async function POST(req) {
    const {message} = await req.json()
    const result = await 
    
}