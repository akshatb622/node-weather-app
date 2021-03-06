console.log('Client side javascript file is loaded!');
 
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');
const clear = document.querySelector('#clearbtn');
const img = document.createElement("img");

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = search.value;
    msg1.textContent = "Loading...";
    msg2.textContent = "";

    fetch('/weather?address=' + location).then((response)=>{
        response.json().then((data) => {
            if(data.error){
                msg1.textContent = data.error;
            }
            else{
                img.src = data.weatherIcon;
                document.getElementById('container').appendChild(img);
                msg1.textContent = data.location;
                msg2.textContent = data.forecast;
            }
        });
    });

});

clear.addEventListener('click',()=>{
    msg1.textContent = "";
    msg2.textContent = "";
    document.getElementById('myInput').value = "";
    document.getElementById('container').removeChild(img);
});