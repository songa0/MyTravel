import { firebaseAuth, githubAuthProvider, googleAuthProvider } from "./login";

class authService {
  login(providerName) {
    const provider = this.getProvider(providerName);
    return firebaseAuth.signInWithPopup(provider);
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
}

export default authService;
