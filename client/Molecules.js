/* Global variables */
var atomId = 0;
var moleculeId = 0;
var reactionId = 0;
var molecule_to_update = 0;
var WORLD_SIZE = 5;
var MAX_SPEED = .04;
var serverJson;

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
                    }
                    reassignElements(index);
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
    }
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
            addAtoms('carbon', 6);
            addAtoms('oxygen', 6);
            addAtoms('hydrogen', 12);
            break;
        case 'water':
            addAtoms('oxygen', 1);
            addAtoms('hydrogen', 2);
            break;
        case 'oxygen':
            addAtoms('oxygen', 2);
            break;
        case 'uranium':
            addAtom('uranium', 1);
        case 'helium':
            addAtom('helium', 1);
    }
    moleculeId++;
}
function addAtoms(atom, number) {
    for (var i = 0; i < number; i++) {
        addAtom(atom);
    }
}
function addAtom(atom) {
    moleculeList[moleculeId].atomList.push(atomId);
    $("#marker").append(
        '<a-sphere id =\"' + "id" + (atomId++) + '\"color = "' + getColorOfAtom(atom) + '" position = "0 ' + getYOfAtom(atom) + ' 0" radius = \"' + getRadiusOfAtom(atom) / 6 + '\"></a-sphere>'
    );
}
function addReaction(reactionId, combustion_flag) {
    MAX_SPEED = .6;
    if (combustion_flag) {
        $("#marker").append(
            '<a-sphere id = "reaction' + reactionId + '\"color = "yellow" position = \"' + (Math.random() * WORLD_SIZE - WORLD_SIZE / 2) + " " + 0 + " " + (Math.random() * WORLD_SIZE - WORLD_SIZE / 2) + '\" radius = ".05"><a-animation attribute = "position" to = \"' + (Math.random() * WORLD_SIZE - WORLD_SIZE / 2) + " " + 0 + " " + (Math.random() * WORLD_SIZE - WORLD_SIZE / 2) + '\" from = "0 0 0" direction = "alternate" dur = "300"></a-animation><a-animation attribute = "scale" direction = "alternate" begin = "100" from = "0 0 0" to = "9 9 9" repeat = "indefinite"></a-animation><a-animation attribute = "visible" dur = "2000" from = "true" to = "false"></a-animation></a-sphere>'
        );
    }
    else {
        addMolecule('helium');
        var uranium_index = getIdFromMoleculeType('uranium') - 1;
        document.getElementById("id" + uranium_index).setAttribute("radius", document.getElementById("id" + uranium_index).getAttribute("radius") * .9);
    }
}
function getColorOfAtom(atom) {
    switch (atom) {
        case 'carbon': return "black";
        case 'oxygen': return "red";
        case 'hydrogen': return "white";
        case 'uranium': return "green";
        case 'helium': return 'pink';
    }
}
function getRadiusOfAtom(atom) {
    switch (atom) {
        case 'carbon': return .9;
        case 'oxygen': return .6;
        case 'hydrogen': return .3;
        case 'uranium': return 3;
        case 'helium': return .3;
    }
}
function getYOfAtom(atom) {
    switch (atom) {
        case 'carbon': return -.15;
        case 'oxygen': return -.05;
        case 'hydrogen': return 0;
        case 'uranium': return 0;
        case 'helium': return 0;
    }
}
function calcPosChange(pos, targetPos) {
    if (Math.abs(pos - targetPos) > .01) pos -= clampSpeed((pos - targetPos) * 0.05);
    return pos;
}
function clampSpeed(value) {
    if (value > MAX_SPEED) return MAX_SPEED;
    if (value < -MAX_SPEED) return -MAX_SPEED;
    return value;
}
/* Animate particles to calculated positions */
setInterval(function () {
    for (var i = 0; i < atomId; i++) {
        var moleculeId = getMoleculeIndexFromId(i);
        if (moleculeId != -1) {
            var moleculePosition = [moleculeList[moleculeId].posX, moleculeList[moleculeId].posY, moleculeList[moleculeId].posZ];
            var element = document.getElementById("id" + i);
            if (element != null) {
                var position = (document.getElementById("id" + i).getAttribute("position"));
                var targetPosition = calcTargetPosition(moleculePosition, i);
                document.getElementById("id" + i).setAttribute("position", calcPosChange(position.x, targetPosition[0]) + " " + position.y + " " + calcPosChange(position.z, targetPosition[2]));
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
}, 2000/moleculeId);


function getIdFromMoleculeType(type) {
    for (var i = 0; i < moleculeId; i++) {
        if (moleculeList[i].atomList != null) {
            for (var j = 0; j < moleculeList[i].atomList.length; j++) {
                if (moleculeList[i].name == type) {
                    return i;
                }
            }
        }
    }
    return -1;
}
function getMoleculeFromId(elementNumber) {
    for (var i = 0; i < moleculeId; i++) {
        if (moleculeList[i].atomList != null) {
            for (var j = 0; j < moleculeList[i].atomList.length; j++) {
                if (moleculeList[i].atomList[j] == elementNumber) {
                    return moleculeList[i].name;
                }
            }
        }
    }
    return "not found";
}


function getAtomIndexFromId(elementNumber) {
    for (var i = 0; i < moleculeId; i++) {
        if (moleculeList[i].atomList != null) {
            for (var j = 0; j < moleculeList[i].atomList.length; j++) {
                if (moleculeList[i].atomList[j] == elementNumber) {
                    return j;
                }
            }
        }
    }
    return -1;
}
function getMoleculeIndexFromId(elementNumber) {
    for (var i = 0; i < moleculeId; i++) {
        if (moleculeList[i].atomList != null) {
            for (var j = 0; j < moleculeList[i].atomList.length; j++) {
                if (moleculeList[i].atomList[j] == elementNumber) {
                    return i;
                }
            }
        }
    }
    return -1;
}
function calcTargetPosition(moleculePosition, elementNumber) {
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


