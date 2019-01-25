// Задание 3
var xhr = new XMLHttpRequest();
var pictures = [];

xhr.open('GET', 'http://127.0.0.1:8080/text.json');
xhr.send();

xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        pictures = JSON.parse(xhr.responseText);

        var big = document.getElementById('bigPicture');
        var thumbs = document.getElementById('thumbnails');

        var defaultBig = document.createElement('img');
        defaultBig.src = pictures[0].bigPicture;

        big.appendChild(defaultBig);

        for (var i = 0; i < pictures.length; i++) {
            var miniImg = document.createElement('img');
            miniImg.src = pictures[i].thumbnails;

            thumbs.appendChild(miniImg);
        }
        thumbs.addEventListener('click', changeBig);
    }
};

function changeBig(event) {
    var bigPicture = document.getElementById('bigPicture');

    var src = event.target.src;

    var big = document.createElement('img');

    for (var i = 0; i < pictures.length; i++) {
        if (src == pictures[i].thumbnails) {
            bigPicture.removeChild(bigPicture.firstChild);
            big.src = pictures[i].bigPicture;
            bigPicture.appendChild(big);
        }
    }
}


// Задание 4

document.getElementById('response4').addEventListener('click', checkMission);

function checkMission() {
    var xhr1 = new XMLHttpRequest();
    xhr1.open('GET', 'http://127.0.0.1:8080/h4.json');
    xhr1.send();

    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === XMLHttpRequest.DONE) {
            var response = JSON.parse(xhr1.responseText);
            var result = document.getElementById('response4');
            console.log(response);
            if (response[0].result == 'success') {
                result.innerText = 'Mission Completed';
                result.classList.add('green');
                console.log(result);
            }
            if (response[0].result == 'error') {
                result.innerText = 'Mission Failed';
                result.classList.add('red');
            }
        }
    };
}



