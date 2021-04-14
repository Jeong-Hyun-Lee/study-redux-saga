import { types, actions } from './index'
import { all, put, call, takeLeading, debounce } from 'redux-saga/effects'
import { callApiLike } from '../../common/api'

export function* fetchData(action) {
	yield put(actions.setLoading(true))
	yield put(actions.addLike(action.timeline.id, 1))
	yield put(actions.setValue('error', ''))
	try {
		yield call(callApiLike)
	} catch (error) {
		yield put(actions.setValue('error', error))
		yield put(actions.addLike(action.timeline.id, -1))
	}
	yield put(actions.setLoading(false))
}

export function* trySetText(action) {
	yield put(actions.setValue('text', action.text))
}

export default function* () {
	yield all([
		takeLeading(types.REQUEST_LIKE, fetchData),
		debounce(500, types.TRY_SER_TEXT, trySetText),
	])
}
