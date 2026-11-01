document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = this;
  const button = form.querySelector('button');
  const success = document.getElementById('successMessage');

  // Récupération des valeurs du formulaire
  const data = {
    name: form.name.value,
    tel: form.tel.value,
    email: form.email.value,
    message: form.message.value
  };

  // Affichage du spinner
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
  button.disabled = true;

  try {
    const response = await fetch('https://onumeric-backend.onrender.com/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    // Si l'envoi est réussi
    if (response.ok) {
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
