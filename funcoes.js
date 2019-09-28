// Declarações de Funções
function Ativar_Controle() {
    document.addEventListener("keydown", CONTROL);
    var key = {
        37: () => {
            p.moveLeft();
            dropStart = Date.now();
        },
        38: () => {
            p.rotate();
            dropStart = Date.now();
        },
        39: () => {
            p.moveRight();
            dropStart = Date.now();
        },
        40: () => {
            p.moveDown();
            dropStart = Date.now();
        }
    }

    function CONTROL(event) {
        try {
            key[event.keyCode]();
        } catch (ex) {
            // console.error("tecla nao mapeada");
        }   
    }

}


function Gerar_Peca_Aleatoria() {
    let r = Math.floor(Math.random() * PECAS.length) // 0 -> 6
    return new Peca(PECAS[r][0], PECAS[r][1]);
}

function Criar_Tabuleiro() {    
    tabuleiro = [];    

    for (let linha = 0; linha < LINHAS; linha++) {
        tabuleiro[linha] = [];
        for (let coluna = 0; coluna < COLUNAS; coluna++) {
            tabuleiro[linha][coluna] = VAGO;
        }
    }
    // desenha_tabuleiro
    for (let linha = 0; linha < LINHAS; linha++) {
        for (let coluna = 0; coluna < COLUNAS; coluna++) {
            Pintar_Quadrado(coluna, linha, tabuleiro[linha][coluna]);
        }
    }
}

// draw the board
function desenhaTabuleiro(){
    for( r = 0; r <LINHAS; r++){
        for(c = 0; c < COLUNAS; c++){
            Pintar_Quadrado(c,r,tabuleiro[r][c]);
        }
    }
}


function Pintar_Quadrado(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

    ctx.strokeStyle = "BLACK";
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}