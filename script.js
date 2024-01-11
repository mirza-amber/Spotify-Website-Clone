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
    var i = Math.floor(Math.random() * songi.length)
    console.log(i)
    // var i = 0
    var voice = false

    // console.log(song_ki_name_list)

    function name_allot() {
        const ele = song_ki_name_list[man_ki_list];
        // console.log(ele)

        var list_filling = ''
        for (let ind = 0; ind < ele.length; ind++) {
            const songs_names_dispersed = ele[ind];
            // console.log(songs_names_dispersed)
            list_filling = list_filling + `<li class="song_list_items">${songs_names_dispersed.replaceAll('.mp3', '')}<img style="display: none;" src="audiowave.gif" alt=""></li>`
        }

        // console.log(list_filling)
        document.querySelector('.the_ul_list').innerHTML = `${list_filling}`
    }

    name_allot()

    function make_list_clickable() {
        for (let induindu = 0; induindu < songi.length; induindu++) {
            document.querySelectorAll('.song_list_items')[induindu].addEventListener('click', () => {
                document.querySelector('.the_ul_list').children[i].classList.remove('currentsong_highlighter');
                pausing();
                audio.removeEventListener('timeupdate', updateTime);
                i = induindu
                audio = new Audio(songi[i]);
                audio.addEventListener('canplay', function onCanPlay() {
                    audio.removeEventListener('canplay', onCanPlay);
                    playing();
                    audio.addEventListener('timeupdate', updateTime);
                });
            })
        }
    }

    make_list_clickable()

    function name_highlight() {
        document.querySelector('.the_ul_list').children[i].classList.add('currentsong_highlighter');
        document.querySelector('.current_song_box').innerHTML = document.querySelector('.the_ul_list').children[i].innerHTML;
    }

    // name_highlight()


    var audio = new Audio(songi[i]);
    audio.preload = 'auto';

    function playing() {
        audio.play();
        voice = true
        document.querySelector('.play_waala_button').innerHTML = '<img src="pause.svg" alt="">'
        // return('done')
        name_highlight();

        audio.addEventListener('ended', ()=>{ // So if the playback ends while the audio loop is inside the play() function, ended event occurs here.
            setTimeout(() => {
                song_skip();
            }, 1500);
        }); 
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
        document.querySelector('.the_ul_list').children[i].classList.remove('currentsong_highlighter');
        pausing();
        audio.removeEventListener('timeupdate', updateTime);  // Remove existing timeupdate listener
        if (i != (songi.length - 1)) {
            i = i + 1;
            audio = new Audio(songi[i]);
            audio.preload = 'auto';
            audio.addEventListener('canplay', function onCanPlay() {
                audio.removeEventListener('canplay', onCanPlay);
                playing();
                audio.addEventListener('timeupdate', updateTime);  // Add a new timeupdate listener
            });
        } else if (i === (songi.length - 1)) {
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
        document.querySelector('.the_ul_list').children[i].classList.remove('currentsong_highlighter')
        pausing();
        // audio.pause();
        audio.removeEventListener('timeupdate', updateTime);
        if (i === 0) {
            i = songi.length;
            i = i - 1;
            audio = new Audio(songi[i]);
            audio.addEventListener('canplay', function onCanPlay() {
                audio.removeEventListener('canplay', onCanPlay);
                playing();
                audio.addEventListener('timeupdate', updateTime);
            });
        } else if (i != 0) {
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
        // console.log(Math.floor((audio.currentTime/audio.duration)*100) + '%') // We can use this as well but because we are using Math.floor(), we will only be able to 'seek' songs at the percentage markers.
        document.querySelector('.for_song_progress_show').style.width = (audio.currentTime/audio.duration)*100 + '%'
    }

    function list_switch(list_number) {
        document.querySelector('.the_ul_list').children[i].classList.remove('currentsong_highlighter')  //Remove song highilight from current playlist
        pausing();
        // audio.pause();
        audio.removeEventListener('timeupdate', updateTime);
        man_ki_list = (list_number);
        songi = song_list_to_be_selected[man_ki_list];
        // console.log(songi)
        i = 0
        audio = new Audio(songi[i]);
        audio.preload = 'auto'; audio.addEventListener('canplay', function onCanPlay() {
            audio.removeEventListener('canplay', onCanPlay);
            playing();
            audio.addEventListener('timeupdate', updateTime);
        })
        name_allot();
    }

    
    // audio.addEventListener('ended', ()=>{
    //     setTimeout(() => {
    //         song_skip();
    //     }, 1500);
    // }); // So this ended event listener was not working, so somehow i figured the audio loop might be getting stuck inside the play() function when playback ends.


    audio.addEventListener('timeupdate', updateTime);

    document.querySelector('.previous_waala_button').addEventListener('click', song_back);
    document.querySelector('.play_waala_button').addEventListener('click', playcheck);
    document.querySelector('.next_waala_button').addEventListener('click', song_skip);
    document.querySelector('.album_card1').addEventListener("click", () => {
        console.log('click is working');
        list_switch(0);
        name_allot();
        make_list_clickable();
    })
    document.querySelector('.album_card2').addEventListener("click", () => {
        console.log('click is working');
        list_switch(1);
        name_allot();
        make_list_clickable();
    })
    document.querySelector('.playbar_strip').addEventListener('click', (e)=>{
        console.log(e)
        // console.log(e.target)
        // console.log(e.currentTarget.id)
        // console.log(e.target.getBoundingClientRect(), e.offsetX)
        // console.log(e.target.getBoundingClientRect().width, e.offsetX)
        // console.log(Math.floor((e.offsetX/e.target.getBoundingClientRect().width)*100) + '%')  // Had to drop (e.target) because this considers the element it is clicked on
        document.querySelector('.for_song_progress_show').style.width = (Math.floor((e.offsetX/document.querySelector('.playbar_strip').getBoundingClientRect().width)*100) + '%')
        let perrcent = Math.floor((e.offsetX/document.querySelector('.playbar_strip').getBoundingClientRect().width)*100)
        // console.log(perrcent)
        audio.currentTime = (perrcent * audio.duration)/ 100
        playing();
    })
    
}

main();
