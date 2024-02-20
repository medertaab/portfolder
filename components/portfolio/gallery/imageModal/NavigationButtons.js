import React from "react";

export default function NavigationButtons(props) {
  const { portfolioData, router } = props;

  const { id } = router.query;

  function handleNext(e) {
    e.stopPropagation();
    const currentImageIndex = Object.keys(portfolioData.images).indexOf(id);
    const nextImageIndex = currentImageIndex + 1;
    if (nextImageIndex >= Object.keys(portfolioData.images).length) {
      return;
    }
    const nextImageId = Object.keys(portfolioData.images)[nextImageIndex];
    const nextImage = portfolioData.images[nextImageId];
    router.replace(
      {
        query: { ...router.query, work: nextImage.title, id: nextImageId },
      },
      undefined,
      { scroll: false }
    );
  }

  function handlePrev(e) {
    e.stopPropagation();
    const currentImageIndex = Object.keys(portfolioData.images).indexOf(id);
    const prevImageIndex = currentImageIndex - 1;
    if (prevImageIndex < 0) {
      return;
    }
    const prevImageId = Object.keys(portfolioData.images)[prevImageIndex];
    const prevImage = portfolioData.images[prevImageId];
    router.replace(
      {
        query: { ...router.query, work: prevImage.title, id: prevImageId },
      },
      undefined,
      { scroll: false }
    );
  }

  return (
    <>
      <button
        onClick={handlePrev}
        type="button"
        className="absolute top-[50%] -translate-x-[50%] left-10 sm:left-12 bg-primaryLight text-primaryLight shadowy sm:text-6xl text-3xl bg-opacity-20 rounded-full h-10 w-10 sm:h-14 sm:w-14 sm:hover:bg-textPrimary sm:hover:bg-opacity-50 sm:hover:text-white duration-150 flex items-center justify-center"
      >
        <i className="ri-arrow-left-s-line sm:mr-0.5"></i>
      </button>
      <button
        onClick={handleNext}
        type="button"
        className="absolute top-[50%] -translate-x-[50%] right-0 bg-primaryLight text-primaryLight shadowy sm:text-6xl text-3xl bg-opacity-20 rounded-full h-10 w-10 sm:h-14 sm:w-14 sm:hover:bg-textPrimary sm:hover:bg-opacity-50 sm:hover:text-white duration-150 flex items-center justify-center"
      >
        <i className="ri-arrow-right-s-line ml-[10%]"></i>
      </button>
    </>
  );
}
