const desc = () => {
    return {
        "title": "EchoProcess",
        "version": "1.0.0",
        "jobControlOptions": ["sync-execute"],
        "outputTransmission": ["value"],
        "inputs": [{
            "id": "text",
            "title": "Text",
            "abstract": "text to be echoed",
            "minOccurs": 1,
            "maxOccurs": 1,
            "input": {
                "literalDataDomains": [
                    {
                        "dataType": {
                            "name": "string"
                        },
                        "valueDefinition": {
                            "anyValue": true
                        }
                    }
                ],
                "metadata": null,
            },
        }],
        "outputs": [{
            "id": "text",
            "title": "Echoed text",
            "description": "The text that is echoed",
            "output": {
                "formats": [
                    {
                        "dataType": {
                            "name": "string"
                        },
                        "valueDefinition": {
                            "anyValue": true
                        }
                    }
                ]
            },
        }]
    }
}

const run = input => {
    return input.inputs.find(e => e.id == "text").value
}

module.exports = {
    desc,
    run
};