const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@#$%^&/-=+?*';
let semrepetição = '';
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// Adicionando um evento de clique para a checkbox de não repetição
checkbox[4].addEventListener('click', function() {
    if (checkbox[4].checked) {
        semrepetição = alfabetoSemRepeticao(letrasMaiusculas + letrasMinusculas + numeros + simbolos);
    } else {
        semrepetição = '';
    }
    geraSenha();
});

geraSenha();

function alfabetoSemRepeticao(alfabeto) {
    return [...new Set(alfabeto)].join('');
}

function geraSenha() {
    let alfabeto = '';
    if (checkbox[0].checked) {
        alfabeto += letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto += letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto += numeros;
    }
    if (checkbox[3].checked) {
        alfabeto += simbolos;
    }
    if (checkbox[4].checked) {
        alfabeto = semrepetição;
    }
    alfabeto = shuffleString(alfabeto); // Embaralhar o alfabeto

    let senha = '';
    let alfabetoLength = alfabeto.length;
    let caracteresUsados = new Set(); // Conjunto para armazenar os caracteres usados

    while (senha.length < tamanhoSenha && caracteresUsados.size < alfabetoLength) {
        let numeroAleatorio = Math.floor(Math.random() * alfabetoLength);
        let caractere = alfabeto[numeroAleatorio];
        if (!caracteresUsados.has(caractere)) {
            senha += caractere;
            caracteresUsados.add(caractere);
        }
    }

    campoSenha.value = senha;
    classificaSenha(senha.length);
}

// Função para embaralhar uma string
function shuffleString(str) {
    let arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

function classificaSenha(tamanhoAlfabeto){
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia);
    forcaSenha.classList.remove('fraca','media','forte');
    if (entropia > 57){
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia < 57 ) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35){
        forcaSenha.classList.add('fraca');
    }
    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = "Um computador pode levar até " + Math.floor(2**entropia/(100e6*60*60*24)) + " dias para descobrir essa senha.";
}
