document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('date');
    const heureSelect = document.getElementById('heure');

    // Bloquer les dates passées
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Charger les heures disponibles dynamiquement
    dateInput.addEventListener('change', function () {
        const selectedDate = this.value;

        // Réinitialiser les options
        heureSelect.innerHTML = '';

        if (selectedDate) {
            fetch(`/api/heures-disponibles?date=${selectedDate}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        data.forEach(hour => {
                            const option = document.createElement('option');
                            option.value = hour;
                            option.textContent = hour;
                            heureSelect.appendChild(option);
                        });
                    } else {
                        const option = document.createElement('option');
                        option.textContent = 'Aucune heure disponible';
                        option.disabled = true;
                        heureSelect.appendChild(option);
                    }
                })
                .catch(error => console.error('Erreur lors du chargement des heures :', error));
        }
    });
});


