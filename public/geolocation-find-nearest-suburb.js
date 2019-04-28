var testRedlandBayPoint = turf.point([-27.639948699999998,153.3121453]);
var testMacleayPoint = turf.point([-27.6224184,153.3627793]);
var macleayIslandPolygon = turf.polygon([[
        [
          153.36081360914454,
          -27.57974950492049
        ],
        [
          153.35652207472071,
          -27.583020789199452
        ],
        [
          153.35308884718165,
          -27.5916169548565
        ],
        [
          153.34845399000392,
          -27.602494322291054
        ],
        [
          153.34622239210353,
          -27.622648827289204
        ],
        [
          153.3616719160293,
          -27.63314291220224
        ],
        [
          153.36785172559962,
          -27.6313939679145
        ],
        [
          153.37351655103907,
          -27.624778143259334
        ],
        [
          153.37325905897364,
          -27.620443420664976
        ],
        [
          153.3766922865127,
          -27.619378725707083
        ],
        [
          153.37686394788966,
          -27.61740140760731
        ],
        [
          153.37334488966212,
          -27.60933966435684
        ],
        [
          153.36802338697657,
          -27.587889496746563
        ],
        [
          153.36450432874904,
          -27.581651426257483
        ],
        [
          153.36081360914454,
          -27.57974950492049
        ]
]]);

const nearbyCities = require("nearby-cities")
const query = {latitude: -27.639948699999998, longitude: -153.3121453}
const cities = nearbyCities(query)
 
assert.equal(cities[0].name, 'Redland Bay')
assert.equal(cities[1].name, 'Macleay Island')
assert.equal(cities[2].name, 'Karragarra Island')
assert.equal(cities[3].name, 'Lamb Island')
assert.equal(cities[4].name, 'Russell Island')
 
console.log(cities[0])
