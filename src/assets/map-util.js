// map-util.js
export function getBuildingName(item) {
  return item.apartmentName;
}

export function getSidoNames() {
  return fetch('/apt/sido')
    .then((res) => res.json())
    .then((json) =>
      json.map((v) => [v.sidoName, v.dongCode]).sort((a, b) => stringCompare(a[0], b[0]))
    );
}

export function getGugunNames(sidoName) {
  return fetch(`/apt/gugun?sidoName=${sidoName.trim()}`)
    .then((res) => res.json())
    .then((json) =>
      json.map((v) => [v.gugunName, v.dongCode]).sort((a, b) => stringCompare(a[0], b[0]))
    );
}

export function getDongNames(sidoName, gugunName) {
  return fetch(`/apt/dong?sidoName=${sidoName.trim()}&gugunName=${gugunName.trim()}`)
    .then((res) => res.json())
    .then((json) =>
      json.map((v) => [v.dongName, v.dongCode]).sort((a, b) => stringCompare(a[0], b[0]))
    );
}

function stringCompare(a, b) {
  return a.localeCompare(b);
}
