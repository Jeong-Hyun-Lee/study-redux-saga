import React from 'react'
import { getNextFriend } from '../../common/mockData'
import { actions } from '../state'
import FriendList from '../component/FriendList'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import NumberSelect from '../component/NumberSelect'
import { MAX_AGE_LIMIT, MAX_SHOW_LIMIT } from '../common'
import {
	getAgeLimit,
	getFriendsWithAgeLimit,
	getFriendsWithAgeShowLimit,
	getShowLimit,
} from '../state/selector'

export default function FriendMain() {
	// const friends = useSelector(state => state.friend.friends)
	const [
		ageLimit,
		showLimit,
		friendsWithAgeLimit,
		friendsWithAgeShowLimit,
	] = useSelector(
		state => [
			getAgeLimit(state),
			getShowLimit(state),
			getFriendsWithAgeLimit(state),
			getFriendsWithAgeShowLimit(state),
		],
		shallowEqual,
	)
	const dispatch = useDispatch()
	function onAdd() {
		const friend = getNextFriend()
		dispatch(actions.addFriend(friend))
	}
	console.log('FriendMain render')
	return (
		<div>
			<button onClick={onAdd}>친구 추가</button>
			<NumberSelect
				onChange={v => dispatch(actions.setValue('ageLimit', v))}
				value={ageLimit}
				options={AGE_LIMIT_OPTIONS}
				postfix='세 이하만 보기'
			></NumberSelect>
			<FriendList friends={friendsWithAgeLimit}></FriendList>
			<NumberSelect
				onChange={v => dispatch(actions.setValue('showLimit', v))}
				value={showLimit}
				options={SHOW_LIMIT_OPTIONS}
				postfix='명 이하만 보기 (연령제한 적용)'
			></NumberSelect>
			<FriendList friends={friendsWithAgeShowLimit}></FriendList>
		</div>
	)
}

const AGE_LIMIT_OPTIONS = [15, 20, 25, MAX_AGE_LIMIT]
const SHOW_LIMIT_OPTIONS = [2, 4, 6, MAX_SHOW_LIMIT]
