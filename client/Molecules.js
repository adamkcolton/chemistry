
/* List of molecules on screen*/
function Molecule(name, posX, posY, posZ) {
    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.posZ = posZ
    this.atomList = [];
}
var moleculeList = [];
var reactionList = [];
/* Replace with axios request */


//TODO : Do these on a button press.
// addMolecule('glucose');
// addMolecule('oxygen');
// addMolecule('oxygen');
// addMolecule('oxygen');
// addMolecule('oxygen');
// addMolecule('oxygen');
// addMolecule('oxygen');
/* Glucose (C6H12O6) Properties */
var GLUCOSE_POSITIONS = [
    /* Carbons (0-5) */
    "-2.5 0 -.5",
    "-1.5 0 .5",
    "-.5 0 -.5",
    ".5 0 .5",
    "1.5 0 -.5",
    "2.5 0 .5",
    /* Oxygens (6-11) */
    "-2.5 0 -1.5",
    "-1.5 0 1.5",
    "-.5 0 -1.5",
    ".5 0 1.5",
    "1.5 0 -1.5",
    "2.5 0 1.5",
    /* Hydrogens (12-23) */
    "-2.75 0 -1.75",
    "-2.25 0 -1.75",
    "-1.75 0 1.75",
    "-1.25 0 1.75",
    "-.75 0 -1.75",
    "-.25 0 -1.75",
    ".75 0 1.75",
    ".25 0 1.75",
    "1.75 0 -1.75",
    "1.25 0 -1.75",
    "2.75 0 1.75",
    "2.25 0 1.75",
];
/* Oxygen (O2) Properties */
var OXYGEN_POSITIONS = [
    /* Oxygens (0-1) */
    "-.5 0 0",
    ".5 0 0"
];
/* Carbon Dioxide (CO2) Properties */
var CARBON_DIOXIDE_POSITIONS = [
    /* Carbon (0) */
    "0 0 0",
    /* Oxygens (1-2) */
    "-.5 0 .5",
    ".5 0 .5",
]
/* WATER (H2O) Properties */
var WATER_POSITIONS = [
    /* Oxygen (0) */
    "0 0 0",
    /* Hydrogens (1-2) */
    "-.5 0 .5",
    ".5 0 .5",
]
var HELIUM_POSITIONS = [
    "0 0 0"
];

var num_oxygen = 0;
var num_glucose = 0;
var num_uranium = 0;
var is_cleared = false;

setInterval(function () {
    axios.get('https://kex84xe01m.execute-api.us-east-1.amazonaws.com/prod/entries').then(function (json) {
        serverJson = json;
        console.log(serverJson);
        for (var entry = 0; entry < serverJson.data.Items.length; entry++) {
            switch (serverJson.data.Items[entry].element) {
                case "Oxygen":
                    if (num_oxygen < serverJson.data.Items[entry].amount) {
                        var num_new_oxygens = serverJson.data.Items[entry].amount - num_oxygen;
                        for (var new_items = 0; new_items < num_new_oxygens; new_items++) {
                            addMolecule('oxygen');
                        }
                        num_oxygen = serverJson.data.Items[entry].amount;
                    }
                    break;
                case "Glucose":
                    if (num_glucose < serverJson.data.Items[entry].amount) {
                        var num_new_glucoses = serverJson.data.Items[entry].amount - num_glucose;
                        for (var new_items = 0; new_items < num_new_glucoses; new_items++) {
                            addMolecule('glucose');
                        }
                        num_glucose = serverJson.data.Items[entry].amount;
                    }
                    break;
                case "Uranium":
                    if (num_uranium < serverJson.data.Items[entry].amount) {
                        var num_new_uraniums = serverJson.data.Items[entry].amount - num_uranium;
                        for (var new_items = 0; new_items < num_new_uraniums; new_items++) {
                            addMolecule('uranium');
                        }
                        num_uranium = serverJson.data.Items[entry].amount;
                    }
                    break;
                case "Clear":
                    if (!is_cleared) {
                        is_cleared = true;
                        resetMolecules();
                    }
                    break;
                case "React":
                    var index = getIdFromMoleculeType('glucose');
                    if (index == -1) {
                        index = getIdFromMoleculeType('uranium');
                        if (index != -1) {
                            document.getElementById('myModal').style.display = "block";
                            document.getElementById('modal-content-p').innerHTML = "Uranium 238 is highly radioactive!";
                        }
                    }
                    else {
                        document.getElementById('myModal').style.display = "block";
                        document.getElementById('modal-content-p').innerHTML = "C6H12O6 + 6 O2 -> 6 H20 + 6 CO2";
                    }
                    reassignElements(index);

                    setTimeout(function () {
                        document.getElementById('myModal').style.display = "none";
                    }, 900);
                    break;
            }
        }
    }).catch(function (error) {
        console.log(error);
    });
}, 1000);

function resetMolecules() {
    moleculeId = 0;
    atomId = 0;
    while (document.getElementById("id" + i) != null) {
        document.getElementById("id" + i).outerHTML = "";

        if (i < reactionId) {
            document.getElementById("reaction" + i).outerHTML = "";
        }
        i++;
    }
    moleculeList = [];
    reactionId = 0;
    molecule_to_update = 0;
}
function buttonPress() {
    var index = getIdFromMoleculeType('glucose');
    if (index == -1) {
        index = getIdFromMoleculeType('uranium');
        if (index != -1) {
            document.getElementById('myModal').style.display = "block";
        }
    }
    else {
        document.getElementById('myModal').style.display = "block";
    }
    setTimeout(function () {
        document.getElementById('myModal').style.display = "none";
    }, 1000);
    reassignElements(index);
}

function addGlucose() {
    addMolecule('glucose');
}

function addOxygen() {
    addMolecule('oxygen');
}
function addUranium() {
    addMolecule('uranium');
}

function addMolecule(molecule) {
    moleculeList.push(new Molecule(molecule, Math.random() * WORLD_SIZE - WORLD_SIZE / 2, 0, Math.random() * WORLD_SIZE - WORLD_SIZE / 2));
    switch (moleculeList[moleculeId].name) {
        case 'glucose':
            var offSet = GLUCOSE_POSITIONS[molecule_element_index].split(" ");
            break;
        case 'oxygen':
            var offSet = OXYGEN_POSITIONS[molecule_element_index].split(" ");
            break;
        case 'water':
            var offSet = WATER_POSITIONS[molecule_element_index].split(" ");
            break;
        case 'carbon_dioxide':
            var offSet = CARBON_DIOXIDE_POSITIONS[molecule_element_index].split(" ");
            break;
        case 'uranium':
            var offSet = HELIUM_POSITIONS[0].split(" ");
            break;
        case 'helium':
            var offSet = HELIUM_POSITIONS[0].split(" ");
            break;
    }
    targetPosition[0] = moleculePosition[0] + parseFloat(offSet[0]) / 5;
    targetPosition[1] = 0;
    targetPosition[2] = moleculePosition[2] + parseFloat(offSet[2]) / 5;
    return targetPosition;
}
function reassignElements(moleculeIndex) {
    brokenMolecule = moleculeList[moleculeIndex];
    switch (brokenMolecule.name) {
        case ('glucose'):
            for (var water = 0; water < 6; water++) {
                /* Break off water molecules */
                moleculeList.push(new Molecule('water', Math.random() * WORLD_SIZE - WORLD_SIZE / 2, 0, Math.random() * WORLD_SIZE - WORLD_SIZE / 2));
                moleculeList[moleculeId].atomList.push(brokenMolecule.atomList[6 + water]);
                moleculeList[moleculeId].atomList.push(brokenMolecule.atomList[(6 + water) * 2]);
                moleculeList[moleculeId].atomList.push(brokenMolecule.atomList[(6 + water) * 2 + 1]);
                addReaction(reactionId++, true);
                moleculeId++;
            }
        }
    }
}, 30);
/* Move molecules around */

setInterval(function () {
    if (moleculeId > 0) {
        moleculeList[molecule_to_update].posX = Math.random() * WORLD_SIZE - WORLD_SIZE / 2;
        moleculeList[molecule_to_update++].posZ = Math.random() * WORLD_SIZE - WORLD_SIZE / 2;
        if (molecule_to_update >= moleculeId) molecule_to_update = 0;
    }
}, 2000 / moleculeId);


function getIdFromMoleculeType(type) {
    for (var i = 0; i < moleculeId; i++) {
        if (moleculeList[i].atomList != null) {
            for (var j = 0; j < moleculeList[i].atomList.length; j++) {
                if (moleculeList[i].name == type) {
                    return i;
                }
    var targetPosition = [];
    var molecule_type = getMoleculeFromId(elementNumber);
    var molecule_element_index = getAtomIndexFromId(elementNumber);
    switch (molecule_type) {
        case 'glucose':
            var offSet = GLUCOSE_POSITIONS[molecule_element_index].split(" ");
            break;
        case 'oxygen':
            var offSet = OXYGEN_POSITIONS[molecule_element_index].split(" ");
            break;
        case 'water':
            var offSet = WATER_POSITIONS[molecule_element_index].split(" ");
            break;
        case 'carbon_dioxide':
            var offSet = CARBON_DIOXIDE_POSITIONS[molecule_element_index].split(" ");
            break;
        case 'uranium':
            var offSet = HELIUM_POSITIONS[0].split(" ");
            break;
        case 'helium':
            var offSet = HELIUM_POSITIONS[0].split(" ");
            break;
    }
    targetPosition[0] = moleculePosition[0] + parseFloat(offSet[0]) / 5;
    targetPosition[1] = 0;
    targetPosition[2] = moleculePosition[2] + parseFloat(offSet[2]) / 5;
    return targetPosition;
}
function reassignElements(moleculeIndex) {
    brokenMolecule = moleculeList[moleculeIndex];
    switch (brokenMolecule.name) {
        case ('glucose'):
            for (var water = 0; water < 6; water++) {
                /* Break off water molecules */
                moleculeList.push(new Molecule('water', Math.random() * WORLD_SIZE - WORLD_SIZE / 2, 0, Math.random() * WORLD_SIZE - WORLD_SIZE / 2));
                moleculeList[moleculeId].atomList.push(brokenMolecule.atomList[6 + water]);
                moleculeList[moleculeId].atomList.push(brokenMolecule.atomList[(6 + water) * 2]);
                moleculeList[moleculeId].atomList.push(brokenMolecule.atomList[(6 + water) * 2 + 1]);
                addReaction(reactionId++, true);
                moleculeId++;
            }
            for (var carbon = 0; carbon < 6; carbon++) {
                moleculeList.push(new Molecule('carbon_dioxide', Math.random() * WORLD_SIZE - WORLD_SIZE / 2, 0, Math.random() * WORLD_SIZE - WORLD_SIZE / 2));
                moleculeList[moleculeId].atomList.push(brokenMolecule.atomList[carbon]);
                addReaction(reactionId++, true);
                /* Find oxygen to combine with */
                for (var molecule = 0; molecule < moleculeList.length; molecule++) {
                    if (moleculeList[molecule].name == 'oxygen' && moleculeList[molecule].atomList != null) {
                        moleculeList[moleculeId].atomList.push(moleculeList[molecule].atomList[0]);
                        moleculeList[moleculeId].atomList.push(moleculeList[molecule].atomList[1]);
                        addReaction(reactionId++, true);
                        moleculeList[molecule].atomList = null;
                        break;
                    }
                }
                moleculeId++;
            }
            moleculeList[moleculeIndex].atomList = null;
            break;
        case ('uranium'):
            setInterval(addReaction, 500);
            break;
    }
}
// axios.get('/api/alexaData/').then(function (json) {
//     //Build Function gets called or I can have it in here.
//     console.log(json);
//     // console.log(json.data);
//     // buildMolecule(symbol);
// }).catch(function (error) {
//     console.log(error);
// });



    var targetPosition = [];
    var molecule_type = getMoleculeFromId(elementNumber);
    var molecule_element_index = getAtomIndexFromId(elementNumber);
    switch (molecule_type) {
        case 'glucose':
            var offSet = GLUCOSE_POSITIONS[molecule_element_index].split(" ");
            break;
        case 'oxygen':
            var offSet = OXYGEN_POSITIONS[molecule_element_index].split(" ");
            break;
        case 'water':
            var offSet = WATER_POSITIONS[molecule_element_index].split(" ");
            break;
        case 'carbon_dioxide':
            var offSet = CARBON_DIOXIDE_POSITIONS[molecule_element_index].split(" ");
            break;
        case 'uranium':
            var offSet = HELIUM_POSITIONS[0].split(" ");
            break;
        case 'helium':
            var offSet = HELIUM_POSITIONS[0].split(" ");
            break;
    }
    targetPosition[0] = moleculePosition[0] + parseFloat(offSet[0]) / 5;
    targetPosition[1] = 0;
    targetPosition[2] = moleculePosition[2] + parseFloat(offSet[2]) / 5;
    return targetPosition;
}
function reassignElements(moleculeIndex) {
    brokenMolecule = moleculeList[moleculeIndex];
    switch (brokenMolecule.name) {
        case ('glucose'):
            for (var water = 0; water < 6; water++) {
                /* Break off water molecules */
                moleculeList.push(new Molecule('water', Math.random() * WORLD_SIZE - WORLD_SIZE / 2, 0, Math.random() * WORLD_SIZE - WORLD_SIZE / 2));
                moleculeList[moleculeId].atomList.push(brokenMolecule.atomList[6 + water]);
                moleculeList[moleculeId].atomList.push(brokenMolecule.atomList[(6 + water) * 2]);
                moleculeList[moleculeId].atomList.push(brokenMolecule.atomList[(6 + water) * 2 + 1]);
                addReaction(reactionId++, true);
                moleculeId++;
            }
            for (var carbon = 0; carbon < 6; carbon++) {
                moleculeList.push(new Molecule('carbon_dioxide', Math.random() * WORLD_SIZE - WORLD_SIZE / 2, 0, Math.random() * WORLD_SIZE - WORLD_SIZE / 2));
                moleculeList[moleculeId].atomList.push(brokenMolecule.atomList[carbon]);
                addReaction(reactionId++, true);
                /* Find oxygen to combine with */
                for (var molecule = 0; molecule < moleculeList.length; molecule++) {
                    if (moleculeList[molecule].name == 'oxygen' && moleculeList[molecule].atomList != null) {
                        moleculeList[moleculeId].atomList.push(moleculeList[molecule].atomList[0]);
                        moleculeList[moleculeId].atomList.push(moleculeList[molecule].atomList[1]);
                        addReaction(reactionId++, true);
                        moleculeList[molecule].atomList = null;
                        break;
                    }
                }
    var targetPosition = [];
    var molecule_type = getMoleculeFromId(elementNumber);
    var molecule_element_index = getAtomIndexFromId(elementNumber);
    switch (molecule_type) {
        case 'glucose':
            var offSet = GLUCOSE_POSITIONS[molecule_element_index].split(" ");
            break;
        case 'oxygen':
            var offSet = OXYGEN_POSITIONS[molecule_element_index].split(" ");
            break;
        case 'water':
            var offSet = WATER_POSITIONS[molecule_element_index].split(" ");
            break;
        case 'carbon_dioxide':
            var offSet = CARBON_DIOXIDE_POSITIONS[molecule_element_index].split(" ");
            break;
        case 'uranium':
            var offSet = HELIUM_POSITIONS[0].split(" ");
            break;
        case 'helium':
            var offSet = HELIUM_POSITIONS[0].split(" ");
            break;
    }
    targetPosition[0] = moleculePosition[0] + parseFloat(offSet[0]) / 5;
    targetPosition[1] = 0;
    targetPosition[2] = moleculePosition[2] + parseFloat(offSet[2]) / 5;
    return targetPosition;
}
function reassignElements(moleculeIndex) {
    brokenMolecule = moleculeList[moleculeIndex];
    switch (brokenMolecule.name) {
        case ('glucose'):
            for (var water = 0; water < 6; water++) {
                /* Break off water molecules */
                moleculeList.push(new Molecule('water', Math.random() * WORLD_SIZE - WORLD_SIZE / 2, 0, Math.random() * WORLD_SIZE - WORLD_SIZE / 2));
                moleculeList[moleculeId].atomList.push(brokenMolecule.atomList[6 + water]);
                moleculeList[moleculeId].atomList.push(brokenMolecule.atomList[(6 + water) * 2]);
                moleculeList[moleculeId].atomList.push(brokenMolecule.atomList[(6 + water) * 2 + 1]);
                addReaction(reactionId++, true);
                moleculeId++;
            }
            for (var carbon = 0; carbon < 6; carbon++) {
                moleculeList.push(new Molecule('carbon_dioxide', Math.random() * WORLD_SIZE - WORLD_SIZE / 2, 0, Math.random() * WORLD_SIZE - WORLD_SIZE / 2));
                moleculeList[moleculeId].atomList.push(brokenMolecule.atomList[carbon]);
                addReaction(reactionId++, true);
                /* Find oxygen to combine with */
                for (var molecule = 0; molecule < moleculeList.length; molecule++) {
                    if (moleculeList[molecule].name == 'oxygen' && moleculeList[molecule].atomList != null) {
                        moleculeList[moleculeId].atomList.push(moleculeList[molecule].atomList[0]);
                        moleculeList[moleculeId].atomList.push(moleculeList[molecule].atomList[1]);
                        addReaction(reactionId++, true);
                        moleculeList[molecule].atomList = null;
                        break;
                    }
                }
                moleculeId++;
            }
            moleculeList[moleculeIndex].atomList = null;
            break;
        case ('uranium'):
            setInterval(addReaction, 500);
            break;
    }
}
// axios.get('/api/alexaData/').then(function (json) {
//     //Build Function gets called or I can have it in here.
//     console.log(json);
//     // console.log(json.data);
//     // buildMolecule(symbol);
// }).catch(function (error) {
//     console.log(error);
// });


