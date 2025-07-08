// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const util = require('util');

const app = express();
const PORT = 9686; // Port where the server will listen

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to log every incoming request
app.use((req, res, next) => {
    console.log("=== New Request ===");
    console.log("URL:", req.url);
    console.log("Method:", req.method);

    if (Object.keys(req.body).length > 0) {
        console.log("Parsed Body:", req.body);
    } else {
        console.log("Parsed Body: [No Body in Request]");
    }

    console.log("===================");

    // Proceed to the next middleware/route handler
    //next();

    const respBody = (
        {
            "context": {
                ...req.body.context,
                action: "on_search",
                "bpp_id": "bpp-ps-network-prod.deg.voltbrew.energy",
                "bpp_uri": "https://bpp-ps-network-prod.deg.voltbrew.energy",
            },
            "message": {
                "catalog": {
                    "providers": [
                        {
                            "id": "p1072",
                            "items": [
                                {
                                    "id": "uid_xyz",
                                    "descriptor": {
                                        "code": "energy"
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
        }
    );
    console.log(JSON.stringify(respBody, null, 4))

    axios.post("https://bpp-ps-client-prod.deg.voltbrew.energy/on_search", respBody).then(response => {
        console.log("POST Response:", response.data);
        res.json({ message: { ack: { status: "ACK" } } });

    }).catch(error => {
        console.error("POST Error:", error);
        if (error.response) {
            console.error('Response Error Body:', util.inspect(error.response.data, {depth: null, colors: true}));
        }
        res.json({ message: { ack: { status: "NACK" } } });

    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});