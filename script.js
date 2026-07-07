let teamCount = 2

function createTeam() {
    if (teamCount >= 10) {
        alert("Maximum 10 teams");
        return;
    }
    teamCount++;

    const teamName = String.fromCharCode(64 + teamCount);
    const div = document.createElement("div");
    div.className = "team-container";

    const title = document.createElement("h3");
    title.innerText = "Team " + teamName;
    const inputs = document.createElement("div");
    inputs.className = "inputs-container";

    // label - from
    const fromLabel = document.createElement("label");
    fromLabel.className = "input-label";
    fromLabel.innerText = "From";
    const fromInput = document.createElement("input");
    fromInput.className = "from-input";
    fromInput.id = teamName.toLowerCase() + "-from-input";
    fromInput.type = "number";
    fromLabel.appendChild(fromInput);

    // label - to
    const toLabel = document.createElement("label");
    toLabel.className = "input-label";
    toLabel.innerText = "To";
    const toInput = document.createElement("input");
    toInput.className = "to-input";
    toInput.id = teamName.toLowerCase() + "-to-input";
    toInput.type = "number";
    toLabel.appendChild(toInput);

    inputs.appendChild(fromLabel);
    inputs.appendChild(toLabel);
    div.appendChild(title);
    div.appendChild(inputs);
    document.querySelector(".teams-container").appendChild(div)
}

/* Main Logics */

function makePair(a, b) {
    return [a, b].sort((x, y) => x - y).join("-");
}

function saveCombination(history, team) {
    for (let i = 0; i < team.length; i++) {
        for (let j = i + 1; j < team.length; j++) {
            history.push(makePair(team[i], team[j]));
        }
    }
}

function countRepeatedPairs(history, team) {
    let count = 0;

    for (let i = 0; i < team.length; i++) {
        for (let j = i + 1; j < team.length; j++) {
            const pair = makePair(team[i], team[j]);
            if (history.includes(pair)) {
                count++;
            }
        }
    }
    return count;
}

function getRange(from, to) {
    const arr = [];
    for (let i = Number(from); i <= Number(to); i++) {
        arr.push(i);
    }
    return arr;
}

function initStats(players) {
    const stats = {};
    players.forEach(p => stats[p] = 0);
    return stats;
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function pickTeam(players, stats, teamSize) {
    const groups = new Map();

    for (const player of players) {
        const c = stats[player];
        if (!groups.has(c)) {
            groups.set(c, []);
        }
        groups.get(c).push(player);
    }

    const levels = [...groups.keys()].sort((a, b) => a - b);
    const selected = [];

    for (const level of levels) {
        const pool = shuffle(groups.get(level));
        for (const p of pool) {
            if (selected.length < teamSize) {
                selected.push(p);
            } else {
                break;
            }
        }
        if (selected.length === teamSize) {
            break;
        }
    }
    return selected;
}

function generate() {
    const outputElement = document.getElementById("output");

    const rounds = parseInt(document.getElementById("rounds").value, 10);
    let teamSize = parseInt(document.getElementById("team-size").value, 10);
    if (!teamSize || teamSize <= 0) {
        teamSize = 4
    }
    if (!rounds) {
        outputElement.innerText = "Rounds shouldn't be 0 and shouldn't be empty!"
        return;
    }
    if (rounds <= 0) {
        outputElement.innerText = "Rounds should be bigger than 0!"
        return;
    }

    // initialize teams
    let ranges = new Map();
    let stats = new Map();
    let history = new Map();

    for (let id = 1; id < teamCount + 1; id++) {
        const teamName = String.fromCharCode(64 + id);
        let from = parseInt(document.getElementById(teamName.toLowerCase() + "-from-input").value, 10);
        let to = parseInt(document.getElementById(teamName.toLowerCase() + "-to-input").value, 10);
        if (Number.isNaN(from) || Number.isNaN(to)) {
            outputElement.innerText = "All inputs shouldn't be 0 and shouldn't be empty!";
            return
        }
        if (from <= 0 || to <= 0) {
            outputElement.innerText = "All inputs should be bigger than 0!";
            return;
        }
        if (to <= from) {
            outputElement.innerText = `Team ${teamName}: 'To' input should be bigger than 'From' input!`;
            return;
        }
        if ((to - from + 1) < teamSize) {
            outputElement.innerText = `Team ${teamName}: Each team must have at least ${teamSize} players!`;
            return;
        }

        let range = getRange(from, to);
        ranges.set(teamName, range)
        stats.set(teamName, initStats(range));
        history.set(teamName, []);
    }

    // build output

    let warningCount = 0;
    let output = "";
    for (let i = 0; i < rounds; i++) {
        output += `Round ${i + 1}\n`;
        for (let key of ranges.keys()) {
            let stat = stats.get(key);

            let team;
            let attempts = 0;
            do {
                team = pickTeam(ranges.get(key), stat, teamSize);
                attempts++;
            } while (countRepeatedPairs(history.get(key), team) > 5 && attempts < 10);

            if (attempts === 10) {
                warningCount++;
            }

            team.forEach(p => stat[p]++);
            saveCombination(history.get(key), team);
            output += `${key}: ${team.join(" ")}\n`;
        }
        output += "\n";
    }
    output += "=== Appearance Statistics ===\n";
    for (let key of stats.keys()) {
        output += `\nTeam ${key}:\n`;

        let stat = stats.get(key);
        let total = 0;
        let min = Infinity;
        let max = -Infinity;

        for (let k in stat) {
            const count = stat[k];
            output += `${k}: ${count}\n`;
            total += count;

            if (count < min) {
                min = count;
            }
            if (count > max) {
                max = count;
            }
        }
        const average = total / Object.keys(stat).length;

        output += `Average: ${average.toFixed(2)}\n`;
        output += `Range: ${min}-${max}\n`;
        output += `Difference: ${max - min}\n`;
        output += "------------------------"
    }

    if (warningCount > 0) {
        output += "\n\nSome repeated teammate combinations exist"
    }
    outputElement.innerText = output;
}