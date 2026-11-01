const buttons = document.querySelectorAll(".filters button");
    const cards = document.querySelectorAll(".formation-card");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const category = btn.getAttribute("data-category");

        cards.forEach(card => {
          card.style.display = category === "all" || card.dataset.category === category
            ? "block"
            : "none";
        });
      });
    });

     const modal = document.getElementById("inscriptionModal");
  const closeBtn = document.getElementById("closeModal");
  const form = document.getElementById("preinscriptionForm");
  const formationInput = document.getElementById("formationChoisie");
  const confirmation = document.getElementById("confirmationMessage");

  // Pour chaque bouton "Je m’inscris"
  document.querySelectorAll(".formation-card button").forEach(button => {
    button.addEventListener("click", () => {
      const title = button.parentElement.querySelector("h3").textContent;
      formationInput.value = title;
      modal.style.display = "block";
    });
  });

  // Fermer la modale
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    form.reset();
    confirmation.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      form.reset();
      confirmation.style.display = "none";
    }
  });

document.getElementById('preinscriptionForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = this;
  const button = form.querySelector('button');
  const success = document.getElementById('successMessage');
  const modal = document.getElementById('inscriptionModal');

  // Récupération des valeurs du formulaire
  const data = {
    name: form.name.value,
    tel: form.tel.value,
    email: form.email.value,
    formation: form.formation.value
  };

  // Affichage du spinner
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
  button.disabled = true;

  try {
    const response = await fetch('https://onumeric-backend.onrender.com/formations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    // Si l'envoi est réussi
    if (response.ok) {
      modal.style.display='none';
      success.style.display = 'block'; // Affiche le message de succès
      form.reset(); // Réinitialise le formulaire

      Swal.fire({
        title: 'Message envoyé !',
        text: 'Nous reviendrons vers vous rapidement.',
        icon: 'success',
        confirmButtonColor: '#1E3A8A'
      });
    } else {
       
      Swal.fire({
        title: 'Erreur',
        text: result.message || 'Une erreur est survenue.',
        icon: 'error',
        confirmButtonColor: '#DC2626'
      });
    }
  } catch (err) {
    modal.style.display='none';
    
    Swal.fire({
      title: 'Erreur serveur',
      text: 'Impossible d\'envoyer le message. Veuillez réessayer plus tard.',
      icon: 'error',
      confirmButtonColor: '#DC2626'
    });
    console.error(err);
  } finally {
    // Réinitialisation du bouton
    button.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer';
    button.disabled = false;
  }
});
