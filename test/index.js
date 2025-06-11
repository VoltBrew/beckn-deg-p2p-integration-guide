const Search = require('../specs/search');

class Test{
    
    constructor(testName, ...args){
        console.log('Running test: ', testName, ' with args: ', args);
        this[testName].call(this, ...args);
    }
    
    search(){
        new Search('https://bap-ps-client-prod.deg.voltbrew.energy', 'trade_1.1.0.yaml').build({
            domain: 'p2p-energy-trade-deg',
            country: 'INDIA',
            city: 'UP',
            bap_uri: 'https://bap-ps-client-prod.deg.voltbrew.energy',
            bap_id: 'bap-ps-client-prod.deg.voltbrew.energy'
        }).makeCall();
    }
    
}


const [firstArg, ...remainingArgs] = process.argv.slice(2);
new Test(firstArg, ...remainingArgs);