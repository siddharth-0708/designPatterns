//callbackHell
const getUser = function(callback){
    setTimeout(() => {
        console.log("user fetched");
        callback({id: 'siddharth'});
    }, 1000);
}
const getPost = function(user, callback){
    setTimeout(() => {
        console.log("posts fetched for ", user.id);
        callback({desc: 'How to be happy'});
    }, 1000);
}
const getLikes = function(post, callback){
    setTimeout(() => {
        console.log("likes fetched for ", post.desc);
        callback({likes: 30});
    }, 1000);
}
function getUserInfo(){
    getUser((user)=>{
        getPost(user, (post)=>{
            getLikes(post, (likes)=>{
                console.log(likes.likes);
            })
        })
    })
}
// getUserInfo();

//Promises:
const getUserP = function(){
    return new Promise((resolve)=>{
        setTimeout(() => {
            console.log("user fetched");
            resolve({id: 'siddharth'});
        }, 1000);
    })
}
const getPostP = function(user){
    return new Promise((resolve)=>{
        setTimeout(() => {
            console.log("posts fetched for ", user.id);
            resolve({desc: 'How to be happy'});
        }, 1000);
    })
}
const getLikesP = function(post){
    return new Promise((resolve)=>{
        setTimeout(() => {
            console.log("likes fetched for ", post.desc);
            resolve({likes: 30});
        }, 1000);
    })
}
function getUserInfoP(){
    const a = getUserP().then((user)=>{
        return getPostP(user)
    }).then((post)=>{
        return getLikesP(post);
    }).then((likes)=>{
        console.log(likes.likes);
    })
}
// getUserInfoP();
async function getUserInfoA(){ //await can only be used in a async function
    const a = await getUserP();
    console.log(a); //returns whatever then returns (resolved value)
    const b = await getPostP(a);
    console.log(b);
    const c = await getLikesP(b);
    console.log(c.likes);

}
getUserInfoA();
