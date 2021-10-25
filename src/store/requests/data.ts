import axios from 'axios';

export function requestGetData() {
  return axios.request({
    method: 'get',
    url: 'http://localhost:9000/',
  });
}

export function requestPostData(action) {
  return axios.request({
    method: 'post',
    url: 'http://localhost:9000/',
    data: { ...action.payload, isDone: false },
  });
}

export function requestGetDataById(action) {
  console.log(action.payload.id);
  return axios.request({
    method: 'get',
    url: `http://localhost:9000/${action.payload.id}`,
  });
}

export function requestDeleteDataById(action) {
  console.log(action.payload);
  return axios.request({
    method: 'delete',
    url: `http://localhost:9000/${action.payload}`,
  });
}

export function requestUpdateDataById(action) {
  console.log(action.payload);
  return axios.request({
    method: 'patch',
    url: `http://localhost:9000/updateValue/${action.payload.id}`,
    data: {
      value: action.payload.value,
    },
  });
}

export function requestUpdateCheckBoxById(action) {
  console.log(action.payload);
  return axios.request({
    method: 'patch',
    url: `http://localhost:9000/updateCheckBox/${action.payload.id}`,
    data: {
      isDone: action.payload.value,
    },
  });
}

export function requestUpdateSourceDnd(action) {
  console.log(action.payload.destination.sortOrder);
  return axios.request({
    method: 'patch',
    url: `http://localhost:9000/updateSortOrder/${action.payload.source.id}`,
    data: {
      sortOrder: action.payload.destination.sortOrder,
    },
  });
}

export function requestUpdateDestinationDnd(action) {
  console.log(action.payload.source.sortOrder);
  return axios.request({
    method: 'patch',
    url: `http://localhost:9000/updateSortOrder/${action.payload.destination.id}`,
    data: {
      sortOrder: action.payload.source.sortOrder,
    },
  });
}
