const processes = (processes) => {
    return {
        "processes": [processes.map(process => {
            return {
                "id": process.id,
                "title": process.title,
                "version": process.version,
                "jobControlOptions": process.jobControlOptions,
                "outputTransmission": process.outputTransmission,
                "links": [
                    {
                        "href": global.baseUrl + "/processes/"  +process.id,
                        "type": "application/json",
                        "rel": "process-desc",
                        "title": "process description"
                    }
                ]
            }
        })],
        "links": [
            {
                "href": global.baseUrl + "/processes?f=json",
                "rel": "self",
                "type": "application/json",
                "title": "This document as JSON"
            }
        ]
    }
}

const process = (processId,process) => {
    return {
        "id": processId,
        "title": process.title,
        "version": process.version,
        "jobControlOptions": process.jobControlOptions,
        "outputTransmission": process.outputTransmission,
        "inputs":process.inputs,
        "outputs":process.outputs,
        "links": [
            {
                "href": global.baseUrl + "/processes/"  + processId,
                "type": "application/json",
                "rel": "self",
                "title": "process description"
                
            },
            {
                "href": global.baseUrl + "/processes/"+processId+"/jobs",
                "rel": "execute",
                "title": "Execute endpoint"
            }
        ]
    }
};


module.exports = {
    processes,
    process,
};

/*
{
  "process": {
    "id": "buffer",
    "title": "Buffer process",
    "description": "Buffer process",
    "keywords": [
      "process",
      "buffer"
    ],
    "inputs": [
      {
        "id": "features",
        "title": "features",
        "description": "The features to buffer",
        "formats": [
          {
            "mimeType": "application/json",
            "maximumMegabytes": 3,
            "default": true
          },
          {
            "mimeType": "application/x-zipped-shp",
            "maximumMegabytes": 4
          }
        ]
      },
      {
        "id": "width",
        "title": "width",
        "description": "The width of the buffer",
        "formats": [
          {
            "mimeType": "text/plain"
          }
        ],
        "literalDataDomain": {
          "dataType": "double",
          "valueDefinition": {
            "defaultValue": "1000"
          },
          "uom": "meters"
        }
      }
    ],
    "outputs": [
      {
        "id": "result",
        "title": "result",
        "description": "The buffered features",
        "formats": [
          {
            "mimeType": "application/json",
            "default": true
          },
          {
            "mimeType": "application/x-zipped-shp"
          }
        ]
      }
    ],
    "version": 1.1,
    "jobControlOptions": [
      "sync-execute",
      "async-execute"
    ],
    "outputTransmission": [
      "value",
      "reference"
    ],
    "executeEndpoint": "https://virtserver.swaggerhub.com/geoprocessing/WPS/0.01/processes/buffer"
  }
}
*/