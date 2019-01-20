/* Global variables */
var i = 0;
var n = 10;

var atomId = 0;
var moleculeId = 0;
var reactionId = 0;
var molecule_to_update = 0;

var WORLD_SIZE = 5;

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

addMolecule('glucose');

addMolecule('oxygen');
addMolecule('oxygen');
addMolecule('oxygen');

addMolecule('oxygen');
addMolecule('oxygen');
addMolecule('oxygen');

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
var GLUCOSE_SCALE = 1;

/* Oxygen (O2) Properties */
var OXYGEN_POSITIONS = [
    /* Oxygens (0-1) */
    "-.5 0 0",
    ".5 0 0"
];
var OXYGEN_SCALE = 1;

/* Carbon Dioxide (CO2) Properties */
var CARBON_DIOXIDE_POSITIONS = [
    /* Carbon (0) */
    "0 0 0",
    /* Oxygens (1-2) */
    "-.5 0 .5",
    ".5 0 .5",
]
var CARBON_DIOXIDE_SCALE = 1;

/* WATER (H2O) Properties */
var WATER_POSITIONS = [
    /* Oxygen (0) */
    "0 0 0",
    /* Hydrogens (1-2) */
    "-.5 0 .5",
    ".5 0 .5",
]
var WATER_SCALE = 1;

function resetMolecule() {
    moleculeId = 0;
    atomId = 0;
    console.log(moleculeList);
    for (var i = 0; i < 36; i++) {
        document.getElementById("id" + i).outerHTML = "";

        if (i < reactionId) {
            document.getElementById("reaction" + i).outerHTML = "";
        }
    }
    moleculeList = [];
    reactionId = 0;
    molecule_to_update = 0;
    addMolecule('uranium');
}

function buttonPress() {
    if (moleculeList[0].name == 'glucose') {
        reassignElements(0);
        setTimeout(function () {
            resetMolecule();
        }, 2000);
    }
    else {
        addReaction();
    }
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

function addReaction(reactionId) {
    MAX_SPEED = .6;
    if (moleculeList[0].name == 'glucose') {
        $("#marker").append(
            '<a-sphere id = "reaction' + reactionId + '\"color = "yellow" position = \"' + (Math.random() * WORLD_SIZE - WORLD_SIZE / 2) + " " + 0 + " " + (Math.random() * WORLD_SIZE - WORLD_SIZE / 2) + '\" radius = ".05"><a-animation attribute = "position" to = \"' + (Math.random() * WORLD_SIZE - WORLD_SIZE / 2) + " " + 0 + " " + (Math.random() * WORLD_SIZE - WORLD_SIZE / 2) + '\" from = "0 0 0" direction = "alternate" dur = "300"></a-animation><a-animation attribute = "scale" direction = "alternate" begin = "100" from = "0 0 0" to = "9 9 9" repeat = "indefinite"></a-animation><a-animation attribute = "visible" dur = "2000" from = "true" to = "false"></a-animation></a-sphere>'
        );
    }
    else {
        $("#marker").append(
            '<a-sphere id = "reaction' + reactionId + '\" color =  \"' + getColorOfAtom('helium') + '\" position = \"' + moleculeList[0].posX + " " + 0 + " " + moleculeList[0].posZ + '\" radius = ".1"><a-animation attribute = "position" to = \"' + (Math.random() * WORLD_SIZE - WORLD_SIZE / 2) + " " + 0 + " " + (Math.random() * WORLD_SIZE - WORLD_SIZE / 2) + '\" from = "0 0 0" direction = "normal" dur = "300" </a-animation></a-sphere>'
        );
    }
    // setTimeout(new function() { 
    //     MAX_SPEED = .06
    // }, 500);
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

var MAX_SPEED = .04;
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
var molecule_to_update = 0;
setInterval(function () {
    moleculeList[molecule_to_update].posX = Math.random() * WORLD_SIZE - WORLD_SIZE / 2;
    moleculeList[molecule_to_update++].posZ = Math.random() * WORLD_SIZE - WORLD_SIZE / 2;
    if (molecule_to_update >= moleculeId) molecule_to_update = 0;
}, 200);

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
            var offSet = "0 0 0";
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

                addReaction(reactionId++);
                moleculeId++;
            }
            for (var carbon = 0; carbon < 6; carbon++) {
                moleculeList.push(new Molecule('carbon_dioxide', Math.random() * WORLD_SIZE - WORLD_SIZE / 2, 0, Math.random() * WORLD_SIZE - WORLD_SIZE / 2));
                moleculeList[moleculeId].atomList.push(brokenMolecule.atomList[carbon]);
                addReaction(reactionId++);
                /* Find oxygen to combine with */
                for (var molecule = 0; molecule < moleculeList.length; molecule++) {
                    if (moleculeList[molecule].name == 'oxygen' && moleculeList[molecule].atomList != null) {
                        moleculeList[moleculeId].atomList.push(moleculeList[molecule].atomList[0]);
                        moleculeList[moleculeId].atomList.push(moleculeList[molecule].atomList[1]);
                        addReaction(reactionId++);
                        moleculeList[molecule].atomList = null;
                        break;
                    }
                }
                moleculeId++;
            }
            moleculeList[moleculeIndex].atomList = null;
            break;
        case ('plutonium'):
            break;
    }
    console.log("AFTER Change")
}

axios.get('/api/mData/').then(function (json) {
    //Build Function gets called or I can have it in here.
    console.log(json);
    // console.log(json.data);
    // buildMolecule(symbol);
}).catch(function (error) {
    console.log(error);
});
