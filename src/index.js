// Definição dos jogadores
const player1 = {
    nome : "Mario",
    velocidade : 4,
    manobrabilidade : 3,
    poder: 3,
    pontos : 0
}
const player2 = {
    nome : "Luigi",
    velocidade : 3,
    manobrabilidade : 4,
    poder: 4,
    pontos : 0
}

// Função para rolar o dado
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Função para gerar blocos
async function getRandomBlock() {
    
    let random = Math.random();
    let result;

    switch(true){
        case random < 0.33:
            result = "RETA";
        break;

        case random < 0.66:
            result = "CURVA";
        break;

        default:
            result = "CONFRONTO";
        break;
    }

    return result;

}

// Função para logar o resultado do dado
async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${attribute + diceResult}`);
}

// Função para iniciar a corrida
async function playRaceEngine(character1, character2) {

    //Realiza 5 rodadas
    for(let round = 1; round <= 5; round++){

        console.log(`🏁 Rodada ${round}`);

        // Gera um bloco aleatório
        let block = await getRandomBlock();

        console.log(`Bloco: ${block}`);

        // Rola o dado para cada jogador
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        // Calcula o resultado do teste de habilidade com base no bloco
        if(block === "RETA"){
            totalTestSkill1 = character1.velocidade + diceResult1;
            totalTestSkill2 = character2.velocidade + diceResult2;

            await logRollResult(character1.nome, "velocidade", diceResult1, character1.velocidade);
            await logRollResult(character2.nome, "velocidade", diceResult2, character2.velocidade);
        }
        if(block === "CURVA"){
            totalTestSkill1 = character1.manobrabilidade + diceResult1;
            totalTestSkill2 = character2.manobrabilidade + diceResult2;

            await logRollResult(character1.nome, "manobrabilidade", diceResult1, character1.manobrabilidade);
            await logRollResult(character2.nome, "manobrabilidade", diceResult2, character2.manobrabilidade);
        }
        if(block === "CONFRONTO"){

            let powerResult1 = character1.poder + diceResult1;
            let powerResult2 = character2.poder + diceResult2;
            
            console.log(`${character1.nome} confrontou com ${character2.nome} ! 🥊`);

            await logRollResult(character1.nome, "poder", diceResult1, character1.poder);
            await logRollResult(character2.nome, "poder", diceResult2, character2.poder);

            if(powerResult1 > powerResult2 && character2.pontos > 0){

                console.log(`${character1.nome} venceu o confronto ! ${character2.nome} perdeu 1 ponto 🐢`);
                character2.pontos--;

            }
            if(powerResult2 > powerResult1 && character1.pontos > 0){

                console.log(`${character2.nome} venceu o confronto ! ${character1.nome} perdeu 1 ponto 🐢`);
                character1.pontos--;

            }

            console.log(powerResult1 === powerResult2 ? "Confronto empatado ! Nenhum ponto foi perdido" : "");

        }

        // Determina o vencedor da rodada e atualiza os pontos
        if(totalTestSkill1 > totalTestSkill2){

            console.log(`${character1.nome} marcou um ponto !`);
            character1.pontos++;

        }else if(totalTestSkill2 > totalTestSkill1){

            console.log(`${character2.nome} marcou um ponto !`);
            character2.pontos++;

        }

        console.log("______________________________");
    }
}

// Função para declarar o vencedor
async function declareWinner(character1, character2) {

    console.log(`Resultado final:`);

    console.log(`${character1.nome}: ${character1.pontos} ponto(s)`);
    console.log(`${character2.nome}: ${character2.pontos} ponto(s)`);

    if(character1.pontos > character2.pontos){

        console.log(`\n${character1.nome} venceu a corrida ! Parabéns 🏆`);

    }else if(character2.pontos > character1.pontos){

        console.log(`\n${character2.nome} venceu a corrida ! Parabéns 🏆`);

    }else{

        console.log(`\nA corrida terminou em empate`);

    }
}

// Função de entrada
(async function main(){

    console.log(`🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} começando...\n`);

    // Inicia a corrida
    await playRaceEngine(player1, player2);

    // Declara o vencedor
    await declareWinner(player1, player2);

})();