//Exit modal if clicked outside
function exitModal(e, modalRef) {
  const dialogDimensions = modalRef.current.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
   ) {
    modalRef.current.close()
  }
}

export {exitModal}