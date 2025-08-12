export async function GET(request) {
  // Create a simple response object
  const responseData = {
    message: "Hello from Next.js backend!",
    timestamp: new Date().toISOString(),
    method: "GET"
  };

  // Return a JSON response with a 200 status code
  return Response.json(responseData);
}


export async function POST(request){
    // backend logic
    try{
        // dummy data=>{
        //     "username": "john_doe",
        //     "email": "myemail.com"
        // }

        

        const data = await request.json();
        console.log("my data")
        // Here you would typically handle the registration logic, e.g., saving user data to a database
        // For now, we will just return the received data as a response

        // passs it as a tool to Ai
        return Response.json({ message: "User registered successfully", userData: data }, { status: 201 });
        

    }catch{
        // handle errord
        return Response.json({ error: "An error occurred" }, { status: 500 });
    }
}


export async function PUT(request) {
  // Handle PUT request logic here
  try {
    const data = await request.json();
    // Process the data as needed, e.g., updating user information
    return Response.json({ message: "User updated successfully", userData: data }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "An error occurred while updating user" }, { status: 500 });
  }
}

export async function DELETE(request) {
  // Handle DELETE request logic here
  try {
    const { userId } = await request.json();
    // Process the deletion logic, e.g., removing user from the database
    return Response.json({ message: `User with ID ${userId} deleted successfully` }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "An error occurred while deleting user" }, { status: 500 });
  }
}   
