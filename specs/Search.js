const BecknAction = require('./base/BecknAction');

exports = module.exports = class Search extends BecknAction {

    static name = 'search';

    static params = {
        'domain': {description: "Domain to call", required: true, default: 'p2p-energy-trade-deg'},
        'country': {description: "Country Code", required: true, default: 'INDIA'},
        'city': {description: "City Code", required: true},
        'bap_id': {description: "Bap ID", required: true},
        'bap_uri': {description: "Bap URI", required: true},

    }

    static body(data) {
        return {
            "context": {
                "domain": data.domain,
                "action": "search",
                "location": {
                    "country": {
                        "code": data.country
                    },
                    "city": {
                        "code": data.city
                    }
                },
                "version": "1.1.0",
                "bap_id": data.bap_id,
                "bap_uri": data.bap_uri,
                "transaction_id": this.randomStr('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'),
                "message_id": "search-" + data.bap_id + this.randomStr('-xxxxxxxx-xxxx-xxxxxxxxx').toLowerCase(),
                "timestamp": new Date().toISOString()
            },
            "message": {
                "intent": {
                    "item": {
                        "descriptor": {
                            "name": "Solar Surplus Energy"
                        }
                    },
                    "fulfillment": {
                        "agent": {
                            "organization": {
                                "descriptor": {
                                    "name": "PG&E Grid Services"
                                }
                            }
                        },
                        "stops": [
                            {
                                "type": "end",
                                "location": {
                                    "address": "der://ssf.meter/98765456"
                                },
                                "time": {
                                    "range": {
                                        "start": "2024-10-04T10:00:00",
                                        "end": "2024-10-04T18:00:00"
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        }

    }
}