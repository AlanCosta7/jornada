import { $auth, $firestore, firebase, $functions, $storage } from "boot/firebase";
import { Dialog, Loading, QSpinnerOval } from "quasar";

// Functions AUTH
export const createUserWithEmailAndPassword = ({ commit }, payload) => {
  commit("clearError");
  $auth
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then(user => handleSuccess(commit, user))
    .then(Loading.hide())
    .catch(error => handleError(commit, error));
};

export const signInWithEmailAndPassword = ({ commit, dispatch }, payload) => {
  commit("clearError");
  return $auth
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then(user => handleSuccess(commit, user))
    .then(Loading.hide())
    .catch(error => handleError(commit, error));
};

export const signInWithPopup = ({ commit }) => {
  commit("clearError");
  return $auth
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(user => handleSuccess(commit, user))
    .catch(error => handleError(commit, error));
};

export const logout = async ({ commit }) => {
  await $auth.signOut();
  commit("setCurrentUser", null);
  commit("setUser", null);
};

// Functions USER
export const loadUser = async ({ state, commit }) => {
  if (!state.currentUser) {
    return null;
  } else {
    const uid = state.currentUser.uid;
    Loading.show({ spinner: QSpinnerOval, message: "Atualizando..." });

    return await $firestore
      .collection("users")
      .doc(uid)
      .onSnapshot(doc => {
        commit("setUser", doc.data());
        Loading.hide();
      });
  }
};

export const addGamersProjeto = async ({ state, dispatch, getters }) => {
  Loading.show({
    spinner: QSpinnerOval,
    message: "Aguarde! Estamos adicionando você nesse projeto..."
  });
  return new Promise((resolve, reject) => {
    let verificaMembers = getters.verificaMembers;

    if (!state.currentUser || verificaMembers) {
      Loading.hide();
      reject();
    } else {
      var uid = state.selectProject.id;
      var value = {
        projectID: uid
      };

      var refAddGamersProjeto = $functions.httpsCallable("addGamersProjeto");
      refAddGamersProjeto(value)
        .then(function(result) {
          Loading.hide();
          resolve(result);
        })
        .catch(function(error) {
          Loading.hide();
          reject(error);
        });
    }
  });
};

export const uploadPhotoURL = async ({ state }, payload) => {
  Loading.show({
    spinner: QSpinnerOval,
    message: "Aguarde! Estamos salvando sua imagem..."
  });
  const uid = payload.uid;
  const collectionName = payload.collectionName;
  const files = payload.files;
  const type = payload.type;

  if (!files) {
    return;
  } else {
    const ref = `${collectionName}/${uid}/${type}/`;
    const projetoRef = $storage.ref().child(ref);
    const uploadTask = projetoRef.put(files);

    uploadTask.on(
      "state_changed",
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            break;
        }
      },
      function(error) {
        Loading.hide();
        // Handle unsuccessful uploads
        console.log(error);
      },
      function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          var value = null;

          if (type === "photoURL") {
            value = {
              photoURL: downloadURL
            };
          } else if (type === "capa") {
            value = {
              capa: downloadURL
            };
          }
          //("uploadCapa:", value);
          $firestore
            .collection(collectionName)
            .doc(uid)
            .update(value)
            .then(Loading.hide())
            .catch(error => handleError(commit, error));
        });
      }
    );
    return uploadTask;
  }
};

export const updateCadastroUser = async ({ state, commit }, payload) => {
  Loading.show({
    spinner: QSpinnerOval,
    message: "Aguarde! Estamos salvando seus dados..."
  });
  const { uid } = state.currentUser;
  return await $firestore
    .collection("users")
    .doc(uid)
    .update({
      ...payload
    })
    .then(commit("sucess", true))
    .then(Loading.hide())
    .catch(error => handleError(commit, error));
};

// Functions PROJECT
export const loadProject = async ({ commit, state }) => {
  Loading.show({ spinner: QSpinnerOval, message: "Procurando..." });

  $firestore
    .collection("project")
    .limit(25)
    .onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        var value = {
          id: change.doc.id,
          data: change.doc.data()
        };

        if (change.type === "added") {
          commit("setProjects", value);
          Loading.hide();
        }
        if (change.type === "modified") {
          commit("updateProjects", value);
          Loading.hide();
        }
        if (change.type === "removed") {
          commit("deleteProjects", value);
          Loading.hide();
        }
      });
    });
};

// Carrega dados do app
export const addSelectProject = async ({ commit, dispatch }, payload) => {
  var nickname = payload;
  const isClientSide = typeof window !== "undefined";

  if (isClientSide && !window.navigator.onLine) {

    Loading.hide();
    Dialog.create({
      dark: true,
      title: "Modo Off-line",
      message:
        "Nenhuma conexão à Internet encontrada. O aplicativo está sendo executado no modo offline.",
      html: true,
      ok: {
        label: "OK",
        unelevated: true
      },
      position: "top",
      color: "positive"
    }).onOk(() => {});
  } else if(nickname) {

    Loading.hide();
    return $firestore
      .collection("project")
      .where("nickname", "==", nickname)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          var value = {
            id: doc.id,
            data: doc.data()
          };
          commit("setSelectProject", value);
          dispatch('getDesafio')

          Loading.hide();
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }
};

function handleSuccess(commit, user) {
  commit("setCurrentUser", user)
}

function handleError(commit, error) {
  Loading.hide();
  commit("setError", error);
  console.log(error);
}

// ok
export const getPontosMembers = async ({ state, commit }) => {
  var pontos = state.pontos
  Loading.hide();
  if (pontos.length === 0) {

    var members = state.selectProject?.data?.members;

    $firestore.collection("resultados").where('uid', 'in', members)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var value = {
              id: doc.id,
              data: doc.data()
            }
            commit("setPontosMembers", value);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

  }
};
// ok
export const getMembers = async ({ state, commit }) => {
  let gamers = state.gamers
  Loading.hide();
  if (gamers.length === 0) {
    var members = state.selectProject?.data?.members;

      $firestore.collection("users").where('uid', 'in', members)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              var value = {
                id: doc.id,
                data: doc.data()
              }
              commit("setMembers", value);
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });


  }
};
//ok
export const getDesafio = async ({ state, commit }) => {
  const uid = state.selectProject.uid
  let myDesafio = state.myDesafio

  Loading.hide();
    if (myDesafio.length === 0) {
      $firestore.collection("users").where('desafio', '==', uid)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              var value = {
                id: doc.id,
                data: doc.data()
              }
              commit("setMyDesafio", value);
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });

    }

};

