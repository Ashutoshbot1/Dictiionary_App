const url=`https://api.dictionaryapi.dev/api/v2/entries/en/`

const result=document.querySelector(".result");
const sound=document.getElementById("sound");
const btn=document.getElementById("search-btn");

const inputElement = document.getElementById('inp-word');

inputElement.addEventListener('keypress', function(event) {
    // Check if the pressed key is "Enter"
    if (event.key === 'Enter') {
      // Your code to handle the "Enter" key press
      getData(inputElement.value);
    }
  });

btn.addEventListener("click",()=>{
    let inpword=document.getElementById("inp-word").value;
    getData(inpword);
});


async function getData(word){

    const response=await fetch(`${url}${word}`);
    // console.log(response);
    if(!response.ok){
        result.innerHTML=`
            <h3 style="margin:3rem 2rem"> WORD NOT FOUND</h3>
        `

        return;
    }
    const data=await response.json();
    showData(data[0]);
    // console.log(data[0]);
    
}

function showData(data){
    // console.log(data);
    console.log(data.phonetics[0].audio);
    result.innerHTML=`
    <div class="word">
        <h3>${data.word}</h3>
        <button onclick="playSound()">
            <i class="fa-solid fa-volume-high"></i>
        </button>
    </div>
    <div class="details">
        <p>${data.meanings[0].partOfSpeech}</p>
        <p>/${data.phonetic}/</p>
    </div>
    <p class="word-meaning">
        ${data.meanings[0].definitions[0].definition}
    </p>
    <p class="word-example">${data.meanings[0].definitions[0].example || ""}</p>
    `

    sound.setAttribute("src",`${data.phonetics[0].audio}`);
    // console.log(sound);
}

function playSound(){
    sound.play();
}


// getData("awesome");