/**
 * @see https://www.codingame.com/training/easy/rock-paper-scissors-lizard-spock
 *
 An international Rock Paper Scissors Lizard Spock tournament is organized, all players receive a number when they register.

 Each player chooses a sign that he will keep throughout the tournament among:
 Rock (R)
 Paper (P)
 sCissors (C)
 Lizard (L)
 Spock (S)

 Scissors cuts Paper
 Paper covers Rock
 Rock crushes Lizard
 Lizard poisons Spock
 Spock smashes Scissors
 Scissors decapitates Lizard
 Lizard eats Paper
 Paper disproves Spock
 Spock vaporizes Rock
 Rock crushes Scissors
 and in case of a tie, the player with the lowest number wins (it's scandalous but it's the rule).
 */

class Player {

    number: number;
    sign: string;
    opponents: Array<number>;

    constructor(number: number, sign: string) {
        this.number = number;
        this.sign = sign;
        this.opponents = [];
    }

    addOpponent(opponent: Player): void {
        this.opponents.push(opponent.number)
    }

    toString(): string {
        return `${this.number}:${this.sign}`
    }
}

// Collect data
const N: number = parseInt(readline());
let players: Array<Player> = [];
for (let i = 0; i < N; i++) {
    let inputs: string[] = readline().split(' ');
    players.push(
        new Player(
            parseInt(inputs[0]),
            inputs[1]
        )
    )
}

const aWins = new Set('CP CL PR PS RL RC LS LP SC SR'.split(' '))

// Game Loop
while (players.length > 1) {
    const qualified: typeof players = []
    console.error(`players: ${players.length}`)
    while (players.length) {
        const a = players.pop()
        const b = players.pop()
        console.error(`${a.toString()} vs ${b.toString()}`)
        const aWon = a.sign == b.sign ? a.number < b.number : aWins.has(a.sign+b.sign)
        const [winner,loser] = aWon ? [a,b] : [b,a]
        winner.addOpponent(loser)
        qualified.push(winner)
    }
    players = qualified
}

console.log(players[0].number);
console.log(players[0].opponents.join(' '));