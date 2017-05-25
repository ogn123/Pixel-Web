import {
    HOME_TIMELINE,
    REFRESH
} from '../mutations-type'

import * as api from '../../api/impl/home-timeline'
import { logger } from '../../utils/logger'

const state = {
    statuses: [],
    refresh: false
}

const mutations = {

    [HOME_TIMELINE](state, data) {
        //save in state
        state.statuses = data
        logger('home-timeline', 'save store succeed !')
    },

    [REFRESH](state, refresh) {
        state.refresh = refresh
        logger('home-timeline-refresh', refresh)
    }


}

const actions = {

    getHomeTimeline: ({ commit }, page) => {

        if (page == 1){
            commit(REFRESH, true)
        } else{
            commit(REFRESH, false)
        }

        api.getHomeTimeline(
            page,
            response => {
                commit(HOME_TIMELINE, response.statuses)
                commit(REFRESH, false)
            },
            err => {
                console.log(err);
            }
        )
    }
}

export default {
    state,
    actions,
    mutations
}