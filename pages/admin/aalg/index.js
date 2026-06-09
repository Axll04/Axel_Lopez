import TeamsService from "../../../shared/services/teams.service.js";

const teamsService = new TeamsService();

document
    .getElementById("update-team-form")
    .addEventListener("submit", async (e) => {

        e.preventDefault();

        const id = document.getElementById("team-id").value;
        //Para actualizar se obtiene el Id

        // se ontiene los enpoints del formulario para actualizar 
        const team = {
            name: document.getElementById("team-name").value,
            description: document.getElementById("team-description").value,
            memberCount: parseInt(
                document.getElementById("team-member-count").value
            )
        };

        try {
            await teamsService.update(id, team);

            alert("Team updated successfully");
        } catch (error) {
            console.error(error);
            alert("Error updating team");
        }
    });