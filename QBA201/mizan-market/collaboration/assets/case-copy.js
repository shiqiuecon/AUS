'use strict';

document.addEventListener('copy', event => {
  if (event.target.closest?.('input, textarea, [contenteditable="true"]')) return;

  const selection = document.getSelection();
  if (!selection || selection.isCollapsed) return;

  const protectedSections = document.querySelectorAll('[data-case-copy]');
  for (let index = 0; index < selection.rangeCount; index++) {
    const range = selection.getRangeAt(index);
    for (const section of protectedSections) {
      if (!section.closest('[hidden]') && range.intersectsNode(section)) {
        event.preventDefault();
        return;
      }
    }
  }
}, {capture: true});
