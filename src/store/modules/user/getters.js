
export const currentUser = state => state.currentUser
export const isAuthenticated = state => !!state.currentUser
export const cards = state => state.cards
export const cla = state => state.cla
export const jornada = state => state.jornada
export const block = state => state.block
export const loja = state => state.loja
export const usuarios = state => state.usuarios

export const coordenacao = getters => {
    let a = getters.cards[0] * 1
    let b = getters.cards[1] * 0.5
    let c = getters.cards[2] * 0.5
    let d = getters.cards[3] * 0.8
    let e = getters.cards[4] * 0.4
    let f = getters.cards[5] * 0.9
    let g = getters.cards[6] * 0.9
    let h = getters.cards[7] * 0.7
    let i = getters.cards[8] * 0.5
    let j = getters.cards[9] * 0.8
    
    let ptn = (a+b+c+d+e+f+g+h+i+j)/70
    return ptn/10
}
export const aprendizado = getters => {
    let a = getters.cards[0] * 0.5
    let b = getters.cards[1] * 1
    let c = getters.cards[2] * 0.9
    let d = getters.cards[3] * 0.5
    let e = getters.cards[4] * 0.6
    let f = getters.cards[5] * 0.5
    let g = getters.cards[6] * 0.5
    let h = getters.cards[7] * 0.9
    let i = getters.cards[8] * 0.9
    let j = getters.cards[9] * 0.7
    
    let ptn = (a+b+c+d+e+f+g+h+i+j)/70
    
    return ptn/10
}
export const criatividade = getters => {
    let a = getters.cards[0] * 0.5
    let b = getters.cards[1] * 0.9
    let c = getters.cards[2] * 1
    let d = getters.cards[3] * 0.4
    let e = getters.cards[4] * 0.7
    let f = getters.cards[5] * 0.6
    let g = getters.cards[6] * 0.8
    let h = getters.cards[7] * 0.6
    let i = getters.cards[8] * 0.9
    let j = getters.cards[9] * 0.6
    
    let ptn = (a+b+c+d+e+f+g+h+i+j)/70
    
    return ptn/10
}
export const negociacao = getters => {
    let a = getters.cards[0] * 0.8
    let b = getters.cards[1] * 0.5
    let c = getters.cards[2] * 0.4
    let d = getters.cards[3] * 1
    let e = getters.cards[4] * 0.9
    let f = getters.cards[5] * 0.7
    let g = getters.cards[6] * 0.6
    let h = getters.cards[7] * 0.6
    let i = getters.cards[8] * 0.7
    let j = getters.cards[9] * 0.8
    
    let ptn = (a+b+c+d+e+f+g+h+i+j)/70
    
    return ptn/10
}
export const pensamento = getters => {
    let a = getters.cards[0] * 0.4
    let b = getters.cards[1] * 0.6
    let c = getters.cards[2] * 0.7
    let d = getters.cards[3] * 0.9
    let e = getters.cards[4] * 1
    let f = getters.cards[5] * 0.7
    let g = getters.cards[6] * 0.7
    let h = getters.cards[7] * 0.9
    let i = getters.cards[8] * 0.5
    let j = getters.cards[9] * 0.6
    
    let ptn = (a+b+c+d+e+f+g+h+i+j)/70
    
    return ptn/10
}
export const gestao = getters => {
    let a = getters.cards[0] * 0.9
    let b = getters.cards[1] * 0.5
    let c = getters.cards[2] * 0.6
    let d = getters.cards[3] * 0.7
    let e = getters.cards[4] * 0.7
    let f = getters.cards[5] * 1
    let g = getters.cards[6] * 0.8
    let h = getters.cards[7] * 0.6
    let i = getters.cards[8] * 0.5
    let j = getters.cards[9] * 0.7
    
    let ptn = (a+b+c+d+e+f+g+h+i+j)/70
    
    return ptn/10
}
export const servir = getters => {
    let a = getters.cards[0] * 0.9
    let b = getters.cards[1] * 0.5
    let c = getters.cards[2] * 0.8
    let d = getters.cards[3] * 0.6
    let e = getters.cards[4] * 0.7
    let f = getters.cards[5] * 0.8
    let g = getters.cards[6] * 1
    let h = getters.cards[7] * 0.5
    let i = getters.cards[8] * 0.6
    let j = getters.cards[9] * 0.6
    
    let ptn = (a+b+c+d+e+f+g+h+i+j)/70
    
    return ptn/10
}
export const emocao = getters => {
    let a = getters.cards[0] * 0.7
    let b = getters.cards[1] * 0.9
    let c = getters.cards[2] * 0.6
    let d = getters.cards[3] * 0.6
    let e = getters.cards[4] * 0.9
    let f = getters.cards[5] * 0.6
    let g = getters.cards[6] * 0.5
    let h = getters.cards[7] * 1
    let i = getters.cards[8] * 0.6
    let j = getters.cards[9] * 0.6
    
    let ptn = (a+b+c+d+e+f+g+h+i+j)/70
    
    return ptn/10
}
export const problema = getters => {
    let a = getters.cards[0] * 0.5
    let b = getters.cards[1] * 0.9
    let c = getters.cards[2] * 0.9
    let d = getters.cards[3] * 0.7
    let e = getters.cards[4] * 0.5
    let f = getters.cards[5] * 0.5
    let g = getters.cards[6] * 0.6
    let h = getters.cards[7] * 0.6
    let i = getters.cards[8] * 1
    let j = getters.cards[9] * 0.8
    
    let ptn = (a+b+c+d+e+f+g+h+i+j)/70
    
    return ptn/10
}
export const decisao = getters => {
    let a = getters.cards[0] * 0.8
    let b = getters.cards[1] * 0.7
    let c = getters.cards[2] * 0.6
    let d = getters.cards[3] * 0.8
    let e = getters.cards[4] * 0.6
    let f = getters.cards[5] * 0.7
    let g = getters.cards[6] * 0.6
    let h = getters.cards[7] * 0.6
    let i = getters.cards[8] * 0.8
    let j = getters.cards[9] * 0.8
    
    let ptn = (a+b+c+d+e+f+g+h+i+j)/70
    
    return ptn/10
}

export const mediaCla = (state, getters) => {
    let a = getters.cla[0]
    let b = getters.cla[1]
    let c = getters.cla[2]
    let d = getters.cla[3]
    let e = getters.cla[4]
    let f = getters.cla[5]
    let g = getters.cla[6]
    let h = getters.cla[7]
    let i = getters.cla[8]
    let j = getters.cla[9]
    
    let ptn = (a+b+c+d+e+f+g+h+i+j)
    return ptn
}
