setTimeout(() => {
  const modalButtons = document.querySelectorAll('[data-modal-target]')
  const modalCloseButtons = document.querySelectorAll('[data-close-button]')

  modalButtons.forEach((button) => {
    button.addEventListener('click', () => {
      console.log('button clicked')
      const modal = document.querySelector(button.dataset.modalTarget)
      console.log(modal)
      openModal(modal)
    })
  })

  modalCloseButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal')
      closeModal(modal)
    })
  })

  function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
  }

  function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
  }
}, 1000)
