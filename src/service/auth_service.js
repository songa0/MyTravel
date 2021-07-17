import {
  firebaseAuth,
  githubAuthProvider,
  googleAuthProvider,
} from "./firebase";

class authService {
  login(providerName) {
    const provider = this.getProvider(providerName);
    return firebaseAuth.signInWithPopup(provider);
  }
  logout() {
    return firebaseAuth.signOut();
  }
  getProvider(providerName) {
    switch (providerName) {
      case "Google":
        return googleAuthProvider;
      case "Github":
        return githubAuthProvider;
      default:
        Error("Invalid Provider Name");
    }
  }

  onAuthStateChanged(onUserChanged) {
    firebaseAuth.onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  }
}

export default authService;
