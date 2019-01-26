var text = '\'This sounds rather like physicist Steven Weinberg\'s,' +
    ' \'the more the universe seems comprehensible, the more it seems pointless\' (The First Three Minutes),' +
    ' or William Shakespeare\'s \'a tale told by an idiot, filled with sound and fury, signifying nothing.\'';

document.getElementById('origin').innerText = text;

function replaceQuotes(text) {
    var reg = /\B\'|\'\B/g;

    document.getElementById('replaced').innerText = text.replace(reg, '\"');
}

document.getElementById('replace').addEventListener('click', function () {
    replaceQuotes(text);

    this.innerHTML = 'Quotes replaced';
});

function clearClasses() {
    var errorMessages = document.getElementsByClassName('error');
    for (var i = 0; i < errorMessages.length; i++) {
        if (!errorMessages[i].classList.contains('hidden')) {
            errorMessages[i].classList.add('hidden');
        }
    }
    var input = document.querySelectorAll('input');
    for (var i = 0; i < input.length; i++) {
        if (input[i].classList.contains('fail')) {
            input[i].classList.remove('fail');
        }
    }
}

document.getElementById('submit').addEventListener('click', function () {
    clearClasses();
    var input = document.querySelectorAll('input');
    var reg;
    for (var i = 0; i < input.length; i++) {

        if (input[i].name == 'name') {
            reg = /^[a-zA-ZА-Яа-я ]+$/;
            if (!reg.test(input[i].value)) {
                input[i].nextElementSibling.classList.remove('hidden');
                input[i].classList.add('fail');
            }
        }

        if (input[i].name == 'e-mail') {
            reg = /^[a-zA-Zа-яА-Я0-9]+[-.]?[a-zA-Zа-яА-Я0-9]+@[a-zA-Zа-яА-Я0-9]+\.[a-zA-Zа-яА-Я]{2,6}$/;
            if (!reg.test(input[i].value)) {
                input[i].nextElementSibling.classList.remove('hidden');
                input[i].classList.add('fail');
            }
        }

        if (input[i].name == 'phone') {
            reg = /^\+\d{1,4}\(\d{1,3}\)\d{3}-\d{4}$/;
            if (!reg.test(input[i].value)) {
                input[i].nextElementSibling.classList.remove('hidden');
                input[i].classList.add('fail');
            }
        }

    }
    event.preventDefault();
});

