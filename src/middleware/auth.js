export default function(next, store) {
  if (store.state.isLoggedIn == false) {
    next("/");
    store.commit('setLoginModal', true)
  } else {
    next();
  }
}
