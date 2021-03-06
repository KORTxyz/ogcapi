# KORTxyz - ogcapi

This is a Open Source [OGC API](http://www.ogcapi.org/) implemented in [Node.js®](https://nodejs.org/en/).
The goal of the process is to make a capability API useable for connecting the spatial data of the web.
The HTML side is made using [KORTxyz](https://kort.xyz) webcomponents found [here](https://www.npmjs.com/package/kortxyz-components).


## Development
Data used in the project is stored in different [NeDB](https://github.com/louischatriot/nedb) files.

### Collections Database
Contains data about the different sources to the OGC API. The columns are as follows:


| Columns        | Description           | Example  |
| ------------- |:-------------:| -----:|
| name      | unique name | Jordbrugsanalyser:CHR16 |
| title      | title      |   CHR16 |
| group      | group      |   LBST |
| desc | description     |    Det centrale husdyrregister 2016 |
| type | type of source    |    Webservice/File  |
| format | format    |    [sqlite]  |
| source | source to the layer      |    http://geodata.fvm.dk/geoserver/ows? OR d:\\data\\CHR16  |
| geomCol | column containing geometry | shape
| bbox | spatial extent     |    [-80.632,57.8602,2.55999,84.6441] |
| temporal | time extent      |    `{"interval":["2020-02-24T15:00:00Z","2020-02-24T16:00:00Z"]}` |

### Styles Database
Contains data about the different styles in the OGC API. The columns are as follows:

| Columns        | Description           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |


### Users Database
Contains data about the users in the OGC API. The columns are as follows:

| Columns        | Description           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
