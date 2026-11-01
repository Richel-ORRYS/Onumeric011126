// le bouton GetStarted : scroll → play → plein écran
let startBtn = document.querySelector('.cta-button');
let video = document.querySelector("video");
// Quand la vidéo se termine
video.addEventListener("ended", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  startBtn.focus();
});
// Quand on quitte le plein écran (desktop)
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    video.pause();
  }
});
// Quand on quitte le plein écran (iOS Safari)
video.addEventListener("webkitendfullscreen", () => {
  video.pause();
});
// Au clic sur le bouton GetStarted
startBtn.addEventListener("click", () => {
  if (video.webkitEnterFullscreen) {
    // Safari mobile
    video.play();
    video.webkitEnterFullscreen();
  } else if (video.requestFullscreen) {
    // Desktop et autres navigateurs
    setTimeout(() => {
      video.play().then(() => {
        video.requestFullscreen();
      });
    }, 500);
  }
});

// le modal
const modal = document.querySelector('.modal');
const toggleTriggers = document.querySelectorAll('.toggle-modal');

toggleTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));

function toggleModal() {
  modal.classList.toggle("active");
}
// arreter la propation du toggle au niveau de la modal-content
const modalContent = document.querySelector('.modal-content');
modalContent.addEventListener('click', handleModal);

function handleModal(event) {
  event.stopPropagation();
}

const modalDetail = document.getElementById("inscriptionModal");
const closeBtnDetail = document.getElementById("closeModal");
const formationInput = document.getElementById("formationChoisie");
const detailChoisi = document.getElementById("detail");
// Pour chaque bouton "Je m'inscris"
document.querySelectorAll(".bas button").forEach(button => {
  button.addEventListener("click", () => {
    const title = button.parentElement.querySelector("h3").textContent;
    const detail = button.parentElement.querySelector("p").textContent;
    formationInput.textContent = title;
    detailChoisi.textContent = detail;

    modalDetail.style.display = "block";
    // alert(formationInput.textContent);
  });
});

// Fermer la modale
closeBtnDetail.addEventListener("click", () => {
  modalDetail.style.display = "none";
  form.reset();
  confirmation.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modalDetail.style.display = "none";
    form.reset();
    confirmation.style.display = "none";
  }
});
/**fin du bloc 1 */

document.getElementById('newsForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const form = this;
  const button = form.querySelector('button');
  const data = {
    email: form.email.value
  };

  // Feedback visuel
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
  button.disabled = true;

  try {
    const response = await fetch('https://onumeric-backend.onrender.com/newsLetter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      form.reset();
      Swal.fire({
        title: 'Inscription réussie !',
        text: 'Merci pour votre abonnement.',
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
      text: 'Impossible d\'envoyer l\'email. Veuillez réessayer plus tard.',
      icon: 'error',
      confirmButtonColor: '#DC2626'
    });
    console.error(err);
  } finally {
    button.innerHTML = '<i class="fas fa-paper-plane"></i> OK';
    button.disabled = false;
  }
});


