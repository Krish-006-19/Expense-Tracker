export let useInfo=()=>{
    let {userID,name,profilePic,isLogged} = JSON.parse(localStorage.getItem('auth'))
    return { userID, name, profilePic, isLogged }
}