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
        data.messageId = data.messageId || this.randomStr('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
        data.transactionId = data.transactionId || this.randomStr('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
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
                "version": data.version,
                "bap_id": data.bap_id,
                "bap_uri": data.bap_uri,
                // "bpp_id": "bpp-ps-network-prod.deg.voltbrew.energy",
                // "bpp_uri": "https://bpp-ps-network-prod.deg.voltbrew.energy",
                "transaction_id": data.transactionId,
                "message_id": data.messageId,
                "timestamp": new Date().toISOString(),
                // "ttl": new Date(+new Date() + 1000 * data.ttlSecs).toISOString()
                // "ttl": '2025-06-11T14:42:36.774Z'
                // "ttl": 'PT30M'
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
                                "type": "END",
                                "location": {
                                    "address": "der://ssf.meter/98765456"
                                },
                                "time": {
                                    "range": {
                                        "start": data.startTime,
                                        "end": data.endTime
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