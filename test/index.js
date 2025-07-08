const Search = require('../specs/search');

class Test{
    
    constructor(testName, ...args){
        console.log('Running test: ', testName, ' with args: ', args);
        this[testName].call(this, ...args);
    }
    
    search(){
        new Search('https://bap-ps-client-prod.deg.voltbrew.energy', 'trade_1.1.0.yaml').build({
            domain: 'p2p-energy-trade-deg',
            version: '1.1.0',
            country: 'IND',
            city: 'std:522',
            bap_uri: 'https://bap-ps-network-prod.deg.voltbrew.energy',
            bap_id: 'bap-ps-client-prod.deg.voltbrew.energy',
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
            ttlSecs: 300
        }).makeCall();
    }
    
}


const [firstArg, ...remainingArgs] = process.argv.slice(2);
new Test(firstArg, ...remainingArgs);