

//לתפוס מהכפתור ולשלוחאת כל הערכים
document.getElementById('search-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const position = (document.getElementById('position') as HTMLSelectElement).value;
    const points = (document.getElementById('points') as HTMLInputElement).value;
    const twoPercent = (document.getElementById('twoPercent') as HTMLInputElement).value;
    const threePercent = (document.getElementById('threePercent') as HTMLInputElement).value;
    // שליחת בקשה לאי פי איי
    const response = await fetch('https://nbaserver-q21u.onrender.com/api/filter/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            position: position,
            twoPercent: parseInt(twoPercent),
            threePercent: parseInt(threePercent),
            points: parseInt(points)
        })
    });

    const players = await response.json();
    displayPlayers(players);
});

    // הזרקה לטבלת השחקנים
function displayPlayers(players: any[]) {
    const resultsBody = document.getElementById('results-body') as HTMLElement;
    resultsBody.innerHTML = '';  

    players.forEach(player => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${player.playerName}</td>
            <td>${player.position}</td>
            <td>${player.points}</td>
            <td>${player.twoPercent}</td>
            <td>${player.threePercent}</td>
            <td><button onclick="addToTeam('${player.playerName}', '${player.position}', ${player.points}, ${player.twoPercent}, ${player.threePercent})">Add ${player.playerName} to Current Team</button></td>
        `;

        resultsBody.appendChild(row);
    });
}


// להוסיף את השחקן לקוביות
function addToTeam(name: string, position: string, points: number, twoPercent: number, threePercent: number) {
    const positionDiv = document.getElementById(position.toLowerCase());
    if (positionDiv) {
        //יוצר דיב חדש ומוסיף ילד בשביל לא לדרוס את הכותרת
        const ourDiv = document.createElement("div")

        ourDiv.textContent = `${name} twoPercent: ${twoPercent} threePercent: ${threePercent} points: ${points}`;
        positionDiv.appendChild(ourDiv);
        

    }
}



// הסלייד של הנקודות

document.addEventListener('DOMContentLoaded', () => {
    const pointsInput = document.getElementById('points') as HTMLInputElement;
    const pointsValue = document.getElementById('pointsValue') as HTMLSpanElement;
    const twoPercentInput = document.getElementById('twoPercent') as HTMLInputElement;
    const twoPercentValue = document.getElementById('twoPercenttt') as HTMLSpanElement;
    const threePercentInput = document.getElementById('threePercent') as HTMLInputElement;
    const threePercentValue = document.getElementById('threePercenttt') as HTMLSpanElement;
    //בספאן עדכון נקודות
    pointsInput.addEventListener('input', () => {
        pointsValue.textContent = pointsInput.value;
    });

    twoPercentInput.addEventListener('input', () => {
        twoPercentValue.textContent = twoPercentInput.value;
    });

    threePercentInput.addEventListener('input', () => {
        threePercentValue.textContent = threePercentInput.value;
    });
});