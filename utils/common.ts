function savePensum(value: PensumMeta) {
  localStorage.setItem("pensumMeta", JSON.stringify(value));
}

function getPensum(): PensumMeta {
  return JSON.parse(localStorage.getItem("pensumMeta") || "{}");
}
