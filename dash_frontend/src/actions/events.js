import eventApi from '../services/eventApi'

export const ADD_EVENT = "ADD_EVENT"
export const FETCHING_EVENT = "FETCHING_EVENT"
export const FETCHED_EVENT = "FETCHED_EVENT"

export function fetchEvent(id) {
  return function(dispatch) {
    dispatch({ type: FETCHING_EVENT })
    eventApi.fetchEvent(id).then(event => {
      dispatch({
        type: FETCHED_EVENT,
        payload: event
      })
    })
  }
}

export function addEvent(event) {
  return {
    type: ADD_EVENT,
    payload: event
  }
}
