function copyToClipboard(el) {
    el.select();
    document.execCommand("copy");
  }