import TeamsService from "../../../shared/services/teams.service.js";
import TeamRequest from "../../../shared/models/request/team.request.js";

const teamsService = new TeamsService();

const form = document.getElementById("team-form");
const tableBody = document.getElementById("teams-table-body");

let editingId = null;

async function buildTable() {

    const teams = await teamsService.get();

    tableBody.innerHTML = "";

    teams.forEach(team => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${team.id}</td>
            <td>${team.name}</td>
            <td>${team.description}</td>
            <td>${team.memberCount}</td>
        `;

        const actionsTd = document.createElement("td");

        const editButton = document.createElement("button"); editButton.textContent = "Edit";

        editButton.addEventListener("click", () => { editingId = team.id;

            document.getElementById("team-id").value = team.id;
            document.getElementById("team-name").value = team.name;
            document.getElementById("team-description").value = team.description;

        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", async () => {

            try {

                await teamsService.delete(team.id);

                alert("Team deleted successfully");

                buildTable();

            } catch (error) {

                console.error(error);
                alert("Error deleting team");

            }

        });

        actionsTd.appendChild(editButton);
        actionsTd.appendChild(deleteButton);

        row.appendChild(actionsTd);

        tableBody.appendChild(row);
    });
}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const teamRequest = new TeamRequest(
        document.getElementById("team-name").value,
        document.getElementById("team-description").value
    );

    try {

        if (editingId) {

            await teamsService.update(editingId, teamRequest);

            alert("Team updated successfully");

        } else {

            await teamsService.create(teamRequest);

            alert("Team created successfully");

        }

        form.reset();

        editingId = null;

        buildTable();

    } catch (error) {

        console.error(error);
        alert("Operation failed");

    }

});

buildTable();