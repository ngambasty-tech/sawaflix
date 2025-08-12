export async function GET(request, {params}){
    const param=await params
    console.log('params: ', param.id)


    // const id=await params.id
    // console.log("id", id)
    return Response.json({data:"my data arrived"})
}