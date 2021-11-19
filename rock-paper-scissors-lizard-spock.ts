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

    play(opponent: Player): number {
        if(this.isScissors()) {
            if(opponent.isPaper() || opponent.isLizard()) {
                return 1;
            }
            if(opponent.isRock() || opponent.isSpock() ) {
                return -1;
            }

            return 0;
        }
        if(this.isPaper()) {
            if(opponent.isRock() || opponent.isSpock()) {
                return 1;
            }
            if(opponent.isScissors() || opponent.isLizard() ) {
                return -1;
            }

            return 0;
        }
        if(this.isRock()) {
            if(opponent.isLizard() || opponent.isScissors()) {
                return 1;
            }
            if(opponent.isPaper() || opponent.isSpock() ) {
                return -1;
            }

            return 0;
        }
        if(this.isLizard()) {
            if(opponent.isSpock() || opponent.isPaper()) {
                return 1;
            }
            if(opponent.isRock() || opponent.isScissors() ) {
                return -1;
            }

            return 0;
        }
        if(this.isSpock()) {
            if(opponent.isScissors() || opponent.isRock()) {
                return 1;
            }
            if(opponent.isLizard() || opponent.isPaper() ) {
                return -1;
            }

            return 0;
        }
    }

    setOpponent(opponent: Player): void {
        this.opponents.push(opponent.number)
    }

    isRock(): boolean {
        return this.sign === 'R';
    }

    isPaper(): boolean {
        return this.sign === 'P';
    }

    isScissors(): boolean {
        return this.sign === 'C';
    }

    isLizard(): boolean {
        return this.sign === 'L';
    }

    isSpock(): boolean {
        return this.sign === 'S';
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

// Game Loop
while (players.length > 1) {
    let roundOfPlayers = players;
    let loopLength: number = players.length;
    console.error(`Remaining players: ${loopLength}`)
    for(let i = 0; i < loopLength; i += 2) {
        let p1 = roundOfPlayers[i];
        let p2 = roundOfPlayers[i + 1];

        p1.setOpponent(p2)
        p2.setOpponent(p1)
        let result = p1.play(p2);

        console.error(`${p1.toString()} vs ${p2.toString()}`)
        if(result === 1) {
            players = players.filter(player => player.number !== p2.number);
        }
        if(result === -1) {
            players = players.filter(player => player.number !== p1.number);
        }
        if(result === 0) {
            players = players.filter(player => player.number !== Math.max(p1.number, p2.number));
        }
    }
}

console.log(players[0].number);
console.log(players[0].opponents.join(' '));