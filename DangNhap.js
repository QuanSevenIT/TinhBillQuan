const account = [
    {
        username: "admin",
        password: "admin"
    },
    {
        username: "login",
        password: "login"
    },
    {
        username: "duc",
        password: "duc"
    },
]
const eleUserName = document.querySelector('.ipUserName');
const elePassword = document.querySelector('.ipPassword');
const eleLogin= document.querySelector('.btnLogin');

function main(){
    let isLogin = !!localStorage.getItem("token")
    eleLogin.addEventListener('click',()=>{
    function CheckLogin(){
        if(isLogin){
            window.location.href="index.html"
        }
    }   
    function Login(){
        let checkLogin = account.some(value => value.username === eleUserName.value && 
            value.password === elePassword.value)
        if(checkLogin){
            localStorage.setItem("token",eleUserName.value)
            isLogin=true
            CheckLogin()
        }
        else{
            alert("Bạn chưa nhập UserName hoặc Password")
        }
        
    }
    Login()
})

}
main()