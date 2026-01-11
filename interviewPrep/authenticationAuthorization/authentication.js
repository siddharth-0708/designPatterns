/*
🔹 What is JSON?

JSON is a text-based data format

Used to store and exchange data

Language-independent (not only JavaScript)
*/

function formSubmit(event){
    event.preventDefault();
    const username = event.target.username.value;//by name
    const password = event.target.password.value;//by password
    
    callFetchAPI(username, password);
}

function callFetchAPI(username, password){
    //fetch(url, options)
    //options is a object
    const URL = 'https://api.escuelajs.co/api/v1/auth/login';
    const options = {
        method: "POST",
        //The data in body i am passing is of json format
        headers: {
            "Content-Type": "application/json"
        },
        //body should always be sent as a sting
        body: JSON.stringify({
            "email": "john@mail.com",
            "password": "changeme"
        }),
        cache: "no-cache",
    }
    const fetchAuth = fetch(URL, options);
    fetchAuth.then((result)=>{
        /*result is a object and it contains body as ReadableStream.

        A ReadableStream in JavaScript is an abstraction representing a source of data that can be read incrementally, 
        often used for HTTP responses, files, or any streaming data. Its contents are raw bytes (usually UTF-8 text for JSON or HTML), not immediately usable as a string or object. 
        You can read it chunk by chunk using a reader (getReader()), or use helper methods like .text() or .json() to consume the entire stream. 
        Reading is asynchronous, which is why .json() and .text() return Promises. Once the stream is consumed (bodyUsed: true), it cannot be read again, and it only targets the body of the response, leaving other metadata (status, headers, url) intact. 
        Essentially, a ReadableStream allows efficient, asynchronous handling of potentially large or delayed data.
        */
        console.log(result);
        if(result.ok){
            /*result.json() only targets the body of the response, not the other parts of the Response object.
            result.json() is a method on the Response object in the Fetch API that reads the response body (a ReadableStream), parses it as JSON, and returns a Promise that resolves to a JavaScript object.

            - It only targets the response body, not metadata like status, ok, or headers.
            - It reads the stream asynchronously, because the body may arrive in chunks over the network.
            - It returns a Promise, which resolves to the parsed JS object once the stream is fully read.
            - Once called, the stream is consumed (bodyUsed: true) and cannot be read again.
            */
            return result.json();
        }else{
            new Error("login failed");
        }
    }).then((data)=>{
        console.log(data);
        callAuthoAPI(data.access_token);
    }).catch((e)=>{
        console.log("error ",e);
    })
}
/*
    Authorization
    HTTP authorization schemes define how credentials are sent to a server using the Authorization header. 
    The header follows the format Authorization: <scheme> <credentials>, where the scheme tells the server how to interpret and 
    validate the credentials. Common schemes include Basic, Digest, and Bearer, each designed for different security needs and eras of web development.

    Basic authorization sends credentials as a Base64-encoded username:password on every request. It is simple to implement and widely supported but inherently insecure if not used with HTTPS, since Base64 is not encryption. Basic auth is mainly used for internal tools, quick testing, or legacy systems. Digest authorization improves on Basic by never sending the password directly; instead, it sends a hashed response using a server-provided nonce. While more secure than Basic, Digest is complex, poorly supported, and largely obsolete today due to widespread HTTPS adoption.

Bearer authorization is the modern and most widely used scheme for APIs and web applications. Instead of sending credentials, the client sends an access token using Authorization: Bearer <token>. Possession of the token grants access, making it stateless and scalable. Bearer tokens (often JWTs) can include expiry times, roles, and permissions, and are validated cryptographically by the server. Because anyone holding the token can use it, Bearer authentication must always be used over HTTPS and is the standard approach in OAuth 2.0–based systems.
*/
function callAuthoAPI(token){
    const URL = 'https://api.escuelajs.co/api/v1/auth/profile';
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }
    const fetchAuth = fetch(URL, options);
    fetchAuth.then((result)=>{
        if(result.ok){
            return result.json();
        }else{
            new Error("login failed");
        }
    }).then((data)=>{
        console.log(data);
    }).catch((e)=>{
        console.log("error ",e);
    })
}