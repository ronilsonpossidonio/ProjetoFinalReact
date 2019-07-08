import axios from 'axios'

import * as types from './actionTypes'

const URL = 'http://localhost:3001/pedidos'

export function loadDashboard() {
    console.log('loadDashBoard')
    return dispatch => {
        axios.get(URL)
            .then(dash => {
                dispatch(updateDashboard(dash.data))
            }).catch(err => {
                dispatch(initializeDashboard())
            })
    }
}

export function updateDashboard(pedidos) {
    console.log('updateDashboard')
    const dashboard = gerenateDashboard(pedidos)

    return dispatch => {
        dispatch(loadDashboardSuccess(dashboard))
    }
}

export function initializeDashboard() {
    const dashboard = gerenateDashboard([])

    return dispatch => {
        dispatch(loadDashboardSuccess(dashboard))
    }
}

function loadDashboardSuccess(dashboard) {
    return { type: types.LOAD_DASHBOARD_SUCCESS, dashboard }
}

function gerenateDashboard(pedidos) {
    const statusList = ['NOVO', 'EM PREPARAÇÃO', 'PRONTO PARA PAGAMENTO', 'CONCLUÍDO', 'EXCLUÍDO']
    const dashboard = []
    let key = 1;

    statusList.forEach(status => {
        const count = pedidos.filter(p => p.status === status).length || 0
        dashboard.push({ key, status, count })
        key++
    })
    console.log(dashboard);
    return dashboard;
}