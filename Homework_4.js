$(document).ready(function () {
    $('#bookmarks').on('click', function () {
        var $text = event.target.id.replace('bookmark', 'text');

        var $mainboard = document.getElementById($text);

        if ($mainboard.classList.contains('hidden')) {
            $mainboard.classList.remove('hidden');
        }

        var $textAll = document.getElementsByClassName('text');

        for (var i = 0; i < $textAll.length; i++) {
            if ($textAll[i].id !== $text) {
                if (!$textAll[i].classList.contains('hidden')) {
                    $textAll[i].classList.add('hidden');
                }
            }
        }
    });
    $('#bookmarks > div').on('mouseenter mouseleave', function () {
        $(event.target).toggleClass('active');
    })
});

$.ajax({
    url: 'http://127.0.0.1:8080/towns.json',
    dataType: 'json',
    success: function (data) {
        var $datalist = document.getElementById('townsJSON');
        data.towns.forEach(function (town) {
            var option = document.createElement('option');
            option.value = town;
            $datalist.appendChild(option);
        })
    }
});

function clearClasses() {
    var $errorMessages = document.getElementsByClassName('error');
    for (var i = 0; i < $errorMessages.length; i++) {
        if (!$errorMessages[i].classList.contains('invis')) {
            $errorMessages[i].classList.add('invis');
        }
    }
    var $input = document.querySelectorAll('input');
    for (var i = 0; i < $input.length; i++) {
        if ($input[i].classList.contains('fail')) {
            $input[i].classList.remove('fail');
        }
    }
}

document.getElementById('submit').addEventListener('click', function () {
    clearClasses();
    var $input = document.querySelectorAll('input');
    var reg;
    for (var i = 0; i < $input.length; i++) {

        if ($input[i].name == 'name') {
            reg = /^[a-zA-ZА-Яа-я ]+$/;
            if (!reg.test($input[i].value)) {
                $input[i].nextElementSibling.classList.remove('invis');
                $input[i].classList.add('fail');
            }
        }

        if ($input[i].name == 'e-mail') {
            reg = /^[a-zA-Zа-яА-Я0-9]+[-.]?[a-zA-Zа-яА-Я0-9]+@[a-zA-Zа-яА-Я0-9]+\.[a-zA-Zа-яА-Я]{2,6}$/;
            if (!reg.test($input[i].value)) {
                $input[i].nextElementSibling.classList.remove('invis');
                $input[i].classList.add('fail');
            }
        }

        if ($input[i].name == 'phone') {
            reg = /^\+\d{1,4}\(\d{1,3}\)\d{3}-\d{4}$/;
            if (!reg.test($input[i].value)) {
                $input[i].nextElementSibling.classList.remove('invis');
                $input[i].classList.add('fail');
            }
        }

    }
    event.preventDefault();
});
