const button=document.getElementById('submitbutton')
button.addEventListener('click' ,
async function(e){
    e.preventDefault()
    const email=document.getElementById('emailfield').value
    console.log('This is the value we get from field',email)

    const request=await fetch(`http://127.0.0.1:8000/sendEmail/${email}`,{
        method:'POST'
    })
    const res=await request.json()
    console.log(res)
    alert('Email was sent successfully')
}
)

