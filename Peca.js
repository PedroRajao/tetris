class Peca {
    // Propriedades
    constructor(tetromino, color) {
        this.tetromino = tetromino;
        this.tetrominoN = 0;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.color = color;
        // posicao inicial
        this.x = 3;
        this.y = -2;
    }

    // MÃƒÂ©todos
    colisao(x, y, peca) {
        for (let linha = 0; linha < peca.length; linha++) {
            for (let coluna = 0; coluna < peca.length; coluna++) {
                if (!peca[linha][coluna]) { continue; }

                let newX = this.x + coluna + x;
                let newY = this.y + linha + y;

                if (newY < 0) {
                    continue;
                }
                if (newX < 0 || newX >= COLUNAS || newY >= LINHAS) {    // Colidiu => pÃƒÂ¡ra
                    throw new Error;
                }
                if (tabuleiro[newY][newX] != VAGO) {
                    throw new Error;
                }
            }
        }
        return;     // NÃƒÂ£o Colidiu => continua
    }

    colisaoBaixo(x, y, peca) {
        for (let linha = 0; linha < peca.length; linha++) {
            for (let coluna = 0; coluna < peca.length; coluna++) {
                if (!peca[linha][coluna]) { continue; }

                let newX = this.x + coluna + x;
                let newY = this.y + linha + y;

                if (newY < 0) {
                    continue;
                }
                if (newX < 0 || newX >= COLUNAS || newY >= LINHAS) {
                    return true;
                }
                if (tabuleiro[newY][newX] != VAGO) {
                    return true;
                }
            }
        }
        return false;
    }

    pintar() {
        for (let linha = 0; linha < this.activeTetromino.length; linha++) {
            for (let coluna = 0; coluna < this.activeTetromino.length; coluna++) {
                // Se matriz|tetramino for 1, entÃƒÂ£o pinta
                if (this.activeTetromino[linha][coluna]) {
                    Pintar_Quadrado(this.x + coluna, this.y + linha, this.color);
                }
            }
        }
    }
    limpar() {
        for (let linha = 0; linha < this.activeTetromino.length; linha++) {
            for (let coluna = 0; coluna < this.activeTetromino.length; coluna++) {
                // Se matriz|tetramino for 1, entÃƒÂ£o pinta
                if (this.activeTetromino[linha][coluna]) {
                    Pintar_Quadrado(this.x + coluna, this.y + linha, VAGO);
                }
            }
        }
    }

    lock() {
        for (let linha = 0; linha < this.activeTetromino.length; linha++) {
            for (let coluna = 0; coluna < this.activeTetromino.length; coluna++) {

                if (this.activeTetromino[linha][coluna]) {
                    tabuleiro[this.y + linha][this.x + coluna] = this.color;
                }
                if (this.y + linha < 0) {
                    alert("Game Over");
                    break;
                }
            }
        }
    }

    removeFullRow() {
        for (let linha = 0; linha < LINHAS; linha++) {
            var linhaCheia = true;

            for (let coluna = 0; coluna < COLUNAS; coluna++) {
                if (tabuleiro[linha][coluna] == VAGO) {
                    linhaCheia = false;
                }
            }

            if (linhaCheia) {
                for (let y = linha; y > 1; y--) {                      // pega todas as linhas acima da linha cheia
                    for (let coluna = 0; coluna < COLUNAS; coluna++) {
                        tabuleiro[y][coluna] = tabuleiro[y - 1][coluna];  // decrementa 1
                    }
                }
                for (let coluna = 0; coluna < COLUNAS; coluna++) {
                    tabuleiro[0][coluna] = VAGO;
                }
                score += 10;
            }
        }
        desenhaTabuleiro();
        scoreElement.innerHTML = score;
    }

    moveLeft() {
        this.colisao(-1, 0, this.activeTetromino);
        this.limpar();
        this.x--;
        this.pintar();
    }

    moveRight() {
        this.colisao(1, 0, this.activeTetromino);
        this.limpar();
        this.x++;
        this.pintar();
    }
    moveDown() {
        if (!this.colisaoBaixo(0, 1, this.activeTetromino)) {
            this.limpar();
            this.y++;
            this.pintar();
        } else {
            this.lock();
            this.removeFullRow();

            p = Gerar_Peca_Aleatoria();
        }

    }

    rotate() {
        let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
        this.colisao(0, 0, nextPattern);
        this.limpar();
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length; // incrementa no intervalo de "0" a "quantidade de variaÃƒÂ§ÃƒÂµes do tetromino"
        this.activeTetromino = this.tetromino[this.tetrominoN]; // Ex: Z[0], Z[1] ...
        this.pintar();
    }

    drop(milisegundos) {
        window.setInterval(function () {
            p.moveDown();
        }, milisegundos);
    }

}