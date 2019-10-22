import { get } from 'lodash-es'
import { $firestore } from 'boot/firebase'

export function assert(data, label) {
    const msg = `${label} inválido.`
    const details = { [label]: data }
    // console.assert(data, msg, details)
    if (!data) {
        console.error({ msg, details })
        throw new Error(msg)
    }
}

/**
 * Retorna o ID do usuário (uid) atual (se existente)
 */
export function getCommonsIds({ rootState }) {
    const uid = get(rootState, 'user.currentUser.uid')
    return { uid }
}

export function mapQuerySnapshot(snapshot) {
    return snapshot.forEach((doc) => {
        if (!doc.exists) {
            return null
        }

        return {
            id: doc.id,
            data: doc.data()
        }
    })
}