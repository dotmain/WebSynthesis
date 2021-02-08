#!/usr/bin/env node
const { Model, KaldiRecognizer } = require('..');
const fs = require("fs");

try {
    fs.accessSync("./model", fs.constants.R_OK);
} catch (err) {
    console.error("Please make sure to have a model");
    process.exit(1);
}
const sampleRate = 16000

function sineWaveAt(sampleNumber, tone) {
    var x = 0
    if (tone !== 0) {
        var sampleFreq = sampleRate / tone
        x = Math.sin(sampleNumber / (sampleFreq / (Math.PI * 2)))
    }
    return x
}


function freq() {
    var frequencies = [0, 0, 256.87, 272.14, 288.33, 305.47, 323.63, 342.88, 363.27, 384.87, 407.75, 432, 457.69, 484.90, 513.74];
    var frequency = frequencies[(Math.random() * frequencies.length) | 0];
    return frequency
}

var p = freq()
let idx = 0
let idxD = 2 

//Set channel to something
async function noise(frame = 5120, channels = 1) {
    return new Promise((res) => {
			let data = new Uint8Array(channels * frame);

			if (Math.floor(Math.random() * 100) > 8) {
				if (idx > idxD) {
					p = freq();
					idx = 0;
					idxD = Math.floor(Math.random() * 3) + 1;
				}

				for (let i = 0; i < data.length; i++) {
					var d = sineWaveAt(i, p) + 1;
					d = Math.ceil((d * 255) / 2);
					data[i] = d;
				}
				idx++;
			} 
			return res(data);
		});
}


model = new Model("model");
const rec = new KaldiRecognizer(model, sampleRate);


let t = 0
let buffers = 128

async function test() {
    
    t++
    const result = await rec.AcceptWaveform(await noise());
    if (result != 0) {
        let d = JSON.parse(await rec.Result())
        if (d.text) {
            console.log(':RESULT        > ' + d.text + ' <  ')
        }
    } else {
        let d = JSON.parse(await rec.PartialResult())
        if (d.partial) {
            console.log(':PARTIAL      >' + d.partial )
        }
    }  
    
    if (t < buffers) {
        await test()
    } else { 
        let d = JSON.parse(await rec.FinalResult())
        if (d.text) {
            console.log(':FINAL >       ' + d.text )
            console.log()
        }
    }
}

test()


console.log('Hello synthesis')

console.log('.')
console.log('.')
console.log('.')
console.log('.')

console.log('Synthesis initialized')
console.log('Language modelling initialized')
console.log('Synthsis buffers initialized')



console.log('Status: Operational')