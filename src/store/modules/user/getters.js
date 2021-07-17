
export const verificaMembers = state => {
  const currentUser = state.currentUser
  if (currentUser && state.selectProject && state.selectProject.data.members.length > 0) {
    const uid = currentUser.uid
    let lista = state.selectProject.data.members
    let result = lista.find(function getId(id) {
      return id === uid
    })
    if (result) {
      return true
    } else return false

  } else return false
}
