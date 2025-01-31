// TODO : configurable root via CSS selector
const observerRoot = document.getElementsByTagName("body")[0];

const observer = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    if (mutation.type === "childList" || mutation.type === "characterData") {
      const target =
        mutation.target instanceof HTMLElement && mutation.target.classList
          ? mutation.target
          : mutation.target.parentElement;

      if (!target) return;

      target.animate(
        [
          { boxShadow: "inset 0 0 0 1px red" },
          { boxShadow: "inset 0 0 0 1px transparent" },
        ],
        { duration: 1000, easing: "ease-out" }
      );
    }
  });
});

if (observerRoot) {
  observer.observe(observerRoot, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  });
}
