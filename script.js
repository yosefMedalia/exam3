"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//לתפוס מהכפתור ולשלוחאת כל הערכים
document.getElementById('search-form').addEventListener('submit', function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const position = document.getElementById('position').value;
        const points = document.getElementById('points').value;
        const twoPercent = document.getElementById('twoPercent').value;
        const threePercent = document.getElementById('threePercent').value;
        // שליחת בקשה לאי פי איי
        const response = yield fetch('https://nbaserver-q21u.onrender.com/api/filter/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                position: position,
                twoPercent: parseInt(twoPercent),
                threePercent: parseInt(threePercent),
                points: parseInt(points)
            })
        });
        const players = yield response.json();
        displayPlayers(players);
    });
});
// הזרקה לטבלת השחקנים
function displayPlayers(players) {
    const resultsBody = document.getElementById('results-body');
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
function addToTeam(name, position, points, twoPercent, threePercent) {
    const positionDiv = document.getElementById(position.toLowerCase());
    if (positionDiv) {
        //יוצר דיב חדש ומוסיף ילד בשביל לא לדרוס את הכותרת
        const ourDiv = document.createElement("div");
        ourDiv.textContent = `${name} twoPercent: ${twoPercent} threePercent: ${threePercent} points: ${points}`;
        positionDiv.appendChild(ourDiv);
    }
}
// הסלייד של הנקודות
document.addEventListener('DOMContentLoaded', () => {
    const pointsInput = document.getElementById('points');
    const pointsValue = document.getElementById('pointsValue');
    const twoPercentInput = document.getElementById('twoPercent');
    const twoPercentValue = document.getElementById('twoPercenttt');
    const threePercentInput = document.getElementById('threePercent');
    const threePercentValue = document.getElementById('threePercenttt');
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
