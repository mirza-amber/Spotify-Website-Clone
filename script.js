console.log('Chalo Shuru Karte h!')


var name_collection = []
var name_list_1 = []
var name_list_2 = []

name_collection.push(name_list_1);
name_collection.push(name_list_2);

function timing(seconds) {

    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    var minutes = Math.floor(seconds / 60);
    var remaining_seconds = (seconds % 60);

    var formattedMinutes = (mi) => {
        if (mi < 10) {
            return mi = '0' + mi;
        }
        else {
            return mi;
        }
    }
    var formattedSeconds = (rem_seconds) => {
        if (rem_seconds < 10) {
            return rem_seconds = '0' + Math.floor(rem_seconds);
        }
        else {
            return Math.floor(rem_seconds);
        }
    }
    return formattedMinutes(minutes) + ':' + formattedSeconds(remaining_seconds);
}

async function get_songs() {

    let a0 = await fetch('http://127.0.0.1:3000/songs/');
    let a1 = await fetch('http://127.0.0.1:3000/songs2/');
    let response0 = await a0.text();
    let response1 = await a1.text();
    var response = [];
    response.push(response0, response1)
    // console.log(response[1]);

    // let array_of_playlist = [response0, response1]
    let a_collection = []
    
    for (let indexing = 0; indexing < response.length; indexing++) {
        
        div_new = document.createElement('div');
        div_new.innerHTML = response[indexing];
        a_collection.push(div_new.getElementsByTagName('a'));
    }

    // console.log(a_collection[0]);
    // console.log(a_collection[1]);

    song_list_1 = [];
    song_list_2 = [];

    var real_song_list = [];
    real_song_list.push(song_list_1);
    real_song_list.push(song_list_2);

    for (var indexila = 0; indexila < a_collection.length; indexila++) {
        const element = a_collection[indexila];
        // console.log(`this is ${indexila} index of `)

        for (let i = 0; i < element.length; i++) {
            
            const e1 = element[i]

            if (element[i].innerHTML.endsWith('.mp3')) {
                name_collection[indexila].push(e1.innerHTML);
            }

            if (element[i].href.endsWith('.mp3')) {
                
                // console.log(e1.href)
                real_song_list[indexila].push(e1.href);
            }
        }
    }
    //     console.log(naming_technique)



    // for (let index = 0; index < a_collection.length; index++) {
    //     const element = a_collection[index];
    //     if (element.href.endsWith('.mp3')) {
    //         song_list.push(element.href);
    //     }
    // }

    badi_wali_list = []
    // console.log(name_collection)
    // return real_song_list;
    badi_wali_list.push(real_song_list);
    badi_wali_list.push(name_collection);
    return badi_wali_list
}


async function main() {
    var function_ka_wait_kro = await get_songs()
    var song_list_to_be_selected = function_ka_wait_kro[0]
    var song_ki_name_list = function_ka_wait_kro[1]
    var man_ki_list = 0
    var songi = song_list_to_be_selected[man_ki_list]
    console.log(songi)
    var i = 0
    var voice = false

    console.log(song_ki_name_list)

    function name_allot(){
            const ele = song_ki_name_list[man_ki_list];
            console.log(ele)
            
            var list_filling = ''
            for (let ind = 0; ind < ele.length; ind++) {
                const songs_names_dispersed = ele[ind];
                // console.log(songs_names_dispersed)
                list_filling = list_filling + `<li class="song_list_items">${songs_names_dispersed.replaceAll('.mp3', '')}</li>`
            }

            // console.log(list_filling)
            document.querySelector('.the_ul_list').innerHTML = `${list_filling}`
    }

    // name_allot()
    

    var audio = new Audio(songi[i]);
    audio.preload = 'auto';

    function playing() {
        audio.play();
        voice = true
        document.querySelector('.play_waala_button').innerHTML = '<img src="pause.svg" alt="">'
        // return('done')
    }

    function pausing() {
        audio.pause()
        voice = false
        document.querySelector('.play_waala_button').innerHTML = '<img src="play.svg" alt="">'
    }

    function playcheck() {
        if (voice === false) {
            playing()
        }
        else if (voice === true) {
            pausing()
        }
    }

    function song_skip() {
        if (i != (songi.length - 1)) {
            pausing();
            audio.removeEventListener('timeupdate', updateTime);  // Remove existing timeupdate listener
            i = i + 1;
            audio = new Audio(songi[i]);
            audio.preload = 'auto';
            audio.addEventListener('canplay', function onCanPlay() {
                audio.removeEventListener('canplay', onCanPlay);
                playing();
                audio.addEventListener('timeupdate', updateTime);  // Add a new timeupdate listener
            });
        } else if (i === (songi.length - 1)) {
            pausing();
            audio.removeEventListener('timeupdate', updateTime);
            i = 0;
            audio = new Audio(songi[i]);
            audio.preload = 'auto';
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

    function updateTime() {
        // console.log('Current Time:', audio.currentTime);
        // console.log('Duration:', audio.duration);
        var real_time = timing(audio.currentTime);
        var duration_of_song = timing(audio.duration);
        document.querySelector('.time_box').innerHTML = `${real_time} / ${duration_of_song}`;
    }

    function list_switch(list_number){
        pausing()
        audio.pause();
        audio.removeEventListener('timeupdate', updateTime);
        man_ki_list = (list_number);
        songi = song_list_to_be_selected[man_ki_list];
        console.log(songi)
        audio = new Audio(songi[i]);
        audio.preload = 'auto';audio.addEventListener('canplay', function onCanPlay() {
            audio.removeEventListener('canplay', onCanPlay);
            playing();
            audio.addEventListener('timeupdate', updateTime);
        })
        // playing()
        name_allot()
    }


    audio.addEventListener('ended', ()=>{
        console.log('YAYAYAYAYAY');
    });
    
    // audio.onended = function() {
    //     alert("The audio has ended");
    // };

    audio.addEventListener('timeupdate',updateTime);

    
    // document.querySelector('.the_ul_list').innerHTML = `${naming_technique}`
    document.querySelector('.previous_waala_button').addEventListener('click', song_back);
    document.querySelector('.play_waala_button').addEventListener('click', playcheck);
    document.querySelector('.next_waala_button').addEventListener('click', song_skip);
    document.querySelector('.album_card1').addEventListener("click", ()=>{
        console.log('click is working');
        list_switch(0)
        name_allot()
    })
    document.querySelector('.album_card2').addEventListener("click", ()=>{
        console.log('click is working');
        list_switch(1)
        name_allot()
    })
}

main();
