console.log('Chalo Shuru Karte h!')

async function get_songs() {

    let a = await fetch('http://127.0.0.1:3000/songs/');
    let response = await a.text();
    console.log(response);

    let div_new = document.createElement('div')  // When you use document.createElement('div') in JavaScript, it creates a new HTMLDivElement object in memory, but it doesn't automatically add it to the document. The new div element exists in memory, and you can manipulate it using JavaScript before deciding where in the document to append it.
    div_new.innerHTML = response
    let a_collection = div_new.getElementsByTagName('a')


    // -----------------------------------------------------------------------------------------------------------------
    // console.log(a_collection) // Returns a HTML Collection
    // console.log(await a.text());
    // let tds = div_new.getElementsByTagName('td')
    // console.log(as[0].href)
    // document.querySelector('.strip_circle').appendChild(div_new)
    // -----------------------------------------------------------------------------------------------------------------


    song_list = []
    for (let index = 0; index < a_collection.length; index++) {
        const element = a_collection[index];
        if (element.href.endsWith('.mp3')) {
            song_list.push(element.href)
        }
    }

    // let name_collection = []
    // for (let index = 0; index < a_collection.length; index++) {
    //     var name_of_song = a_collection[index].innerText
    //     if (name_of_song.endsWith('.mp3')){
    //         name_collection.push(name_of_song)
    //     }
        
    // }

    // let song_with_string = ''
    // for (let index = 0; index < name_collection.length; index++) {
    //     song_with_string += `<li  class="song_list_items">${name_collection[index]}</li>`
    // }
    // console.log(song_with_string)
    
    // document.querySelector('.song_list').getElementsByTagName('ul')[0].innerHTML = `${song_with_string}`


    return song_list
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<
// get_songs().then((a)=>{
//     console.log(a);
//  }
// );
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// ================== ALTERNATIVELY ================> we can make another async function and await the first in the second.

async function main() {
    var songi = await get_songs();
    console.log(songi)
    var i = 0
    var voice = false

    var audio = new Audio(songi[i]);

    async function playing() {
        audio.play();
        voice = true
        document.querySelector('.play_waala_button').innerHTML = '<img src="pause.svg" alt="">'

    }

    function pausing(){
        audio.pause()
        voice = false
        document.querySelector('.play_waala_button').innerHTML = '<img src="play.svg" alt="">'
    }

    function playcheck(){
        if (voice===false){
            playing()
        }
        else if(voice === true){
            pausing()
        }
    }

    // function song_skip() {
    //     if (i != (songi.length-1)){
    //         pausing()
    //         i = i+1
    //         audio = new Audio(songi[i]); 
    //         playing()
    //     }
    //     else if (i === (songi.length-1)){
    //         pausing()
    //         i = 0
    //         audio = new Audio(songi[i]);
    //         playing()
    //     }
    // }

    // function song_back(){
    //     if (i === 0 ){
    //         pausing()
    //         i = songi.length
    //         i = i-1
    //         audio = new Audio(songi[i]);
    //         playing()
    //     }
    //     else if ( i != 0 ){
    //         pausing()
    //         i = i-1
    //         audio = new Audio(songi[i]);
    //         playing()
    //     }
    // }

    function song_skip() {
        if (i != (songi.length - 1)) {
            pausing();
            audio.pause();
            audio.removeEventListener('timeupdate', updateTime);  // Remove existing timeupdate listener
            i = i + 1;
            audio = new Audio(songi[i]);
            audio.addEventListener('canplay', function onCanPlay() {
                audio.removeEventListener('canplay', onCanPlay);
                playing();
                audio.addEventListener('timeupdate', updateTime);  // Add a new timeupdate listener
            });
        } else if (i === (songi.length - 1)) {
            pausing();
            audio.pause();
            audio.removeEventListener('timeupdate', updateTime);
            i = 0;
            audio = new Audio(songi[i]);
            audio.addEventListener('canplay', function onCanPlay() {
                audio.removeEventListener('canplay', onCanPlay);
                playing();
                audio.addEventListener('timeupdate', updateTime);
            });
        }
    }
    
    function song_back() {
        if (i === 0) {
            pausing();
            audio.pause();
            audio.removeEventListener('timeupdate', updateTime);
            i = songi.length;
            i = i - 1;
            audio = new Audio(songi[i]);
            audio.addEventListener('canplay', function onCanPlay() {
                audio.removeEventListener('canplay', onCanPlay);
                playing();
                audio.addEventListener('timeupdate', updateTime);
            });
        } else if (i != 0) {
            pausing();
            audio.pause();
            audio.removeEventListener('timeupdate', updateTime);
            i = i - 1;
            audio = new Audio(songi[i]);
            audio.addEventListener('canplay', function onCanPlay() {
                audio.removeEventListener('canplay', onCanPlay);
                playing();
                audio.addEventListener('timeupdate', updateTime);
            });
        }
    }

    

    document.querySelector('.previous_waala_button').addEventListener('click', song_back);
    document.querySelector('.play_waala_button').addEventListener('click', playcheck);
    document.querySelector('.next_waala_button').addEventListener('click', song_skip);
}

main();
