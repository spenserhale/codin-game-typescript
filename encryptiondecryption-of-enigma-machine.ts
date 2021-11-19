/**
 * @see https://www.codingame.com/ide/puzzle/encryptiondecryption-of-enigma-machine

 Goal

 During World War II, the Germans were using an encryption code called Enigma – which was basically an encryption machine that encrypted messages for transmission. The Enigma code went many years unbroken. Here's How the basic machine works:

 First Caesar shift is applied using an incrementing number:
 If String is AAA and starting number is 4 then output will be EFG.
 A + 4 = E
 A + 4 + 1 = F
 A + 4 + 1 + 1 = G

 Now map EFG to first ROTOR is BDFHJLCPRTXVZNYEIWGAKMUSQO such as:
 ABCDEFGHIJKLMNOPQRSTUVWXYZ
 BDFHJLCPRTXVZNYEIWGAKMUSQO
 So EFG becomes JLC. Then it is passed through 2 more rotors to get the final value.

 If the second ROTOR is AJDKSIRUXBLHWTMCQGZNPYFVOE, we apply the substitution step again thus:
 ABCDEFGHIJKLMNOPQRSTUVWXYZ
 AJDKSIRUXBLHWTMCQGZNPYFVOE
 So JLC becomes BHD.

 If the third ROTOR is EKMFLGDQVZNTOWYHXUSPAIBRCJ, then the final substitution is:
 ABCDEFGHIJKLMNOPQRSTUVWXYZ
 EKMFLGDQVZNTOWYHXUSPAIBRCJ
 So BHD becomes KQF.

 Final output is sent via Radio Transmitter.
 **/

declare function readline(): string;

const operation: string = readline();
const pseudoRandomNumber: number = parseInt(readline());

const alpha: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const rotors: Array<string> = [];
for (let i = 0; i < 3; i++) {
    rotors.push(readline());
}
const message: string = readline();

if (operation === 'ENCODE') {
    console.log(encode(message))
} else if (operation === 'DECODE') {
    console.log(decode(message))
}

function encode(message: string): string {
    console.error(`Message to encode: ${message}`)
    let characters: Array<string> = [...message];

    console.error(`Offset: ${pseudoRandomNumber}`)
    let offset: number = pseudoRandomNumber;
    characters.forEach(function (char, idx, arr) {
        const alphaIdx: number = (alpha.indexOf(char) + offset) % 26;

        arr[idx] = alpha.substr(alphaIdx, 1)
        offset++;
    });
    console.error(`Message shifted: ${characters.join('')}`)

    for (const rotor of rotors) {
        console.error(`Rotor: ${rotor}`)
        characters.forEach(function (char: string, idx, arr) {
            arr[idx] = rotor[alpha.indexOf(char)]
        })
        console.error(`Message shifted: ${characters.join('')}`)
    }

    return characters.join('');
}

function decode(message: string): string {
    console.error(`Message to decode: ${message}`)
    let characters: Array<string> = [...message];

    for (const rotor of rotors.reverse()) {
        console.error(`Rotor: ${rotor}`)
        characters.forEach(function (char, idx, arr) {
            arr[idx] = alpha[rotor.indexOf(char)]
        })
        console.error(`Message shifted: ${characters.join('')}`)
    }

    console.error(`Offset: ${pseudoRandomNumber}`)
    let offset: number = pseudoRandomNumber;
    characters.forEach(function (char, idx, arr) {
        let alphaIdx: number = (alpha.indexOf(char) - offset) % 26;

        arr[idx] = alpha.substr(alphaIdx, 1)
        offset++;
    });
    console.error(`Message shifted: ${characters.join('')}`)

    return characters.join('');
}


