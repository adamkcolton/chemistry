
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


