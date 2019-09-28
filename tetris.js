const cvs = document.getElementById('tetris');
const ctx = cvs.getContext('2d');
const SQ = 20;
const COLUNAS = 10;
const LINHAS = 20;
const VAGO = "white";
const scoreElement = document.getElementById("score");
var score = 0;
const PECAS = [
    [Z, "DarkGreen"],
    [S, "DarkRed"],
    [T, "GoldenRod"],
    [O, "DarkBlue"],
    [L, "purple"],
    [I, "DarkCyan"],
    [J, "DarkOrange"]
];

Criar_Tabuleiro();
var p = Gerar_Peca_Aleatoria(); // cria objeto peça
p.pintar();
Ativar_Controle();
p.drop(700); // @param velocidade da queda em milisegundos