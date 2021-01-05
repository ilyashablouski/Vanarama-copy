export const scrollingSteps = (currentStep: number) => {
  // start interval for find currentStep html element
  const checkExist = setInterval(() => {
    const htmlElement = document.getElementById(`step_${currentStep}`);
    if (htmlElement) {
      // get currentStep html element position
      const elementPosition = htmlElement.getBoundingClientRect();
      // set scroll to let on progress-indicator to current step
      document.getElementById('progress-indicator')!.scrollLeft =
        elementPosition.left;
      // exit from interval
      clearInterval(checkExist);
    }
  }, 100);
  // exit from interval after 5 sec if we don't find element in document
  setTimeout(() => clearInterval(checkExist), 5000);
};

export default scrollingSteps;
