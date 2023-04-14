export class LocalStorageAPI {
  // Auth Tokens
  static getLocalStorageTokens() {
    return JSON.parse(localStorage.getItem("authTokens"));
  }

  static setLocalStorageTokens(tokens) {
    localStorage.setItem("authTokens", JSON.stringify(tokens));
  }

  static delLocalStorageTokens() {
    localStorage.removeItem("authTokens");
  }

  // Room
  static getLocalStorageRoom() {
    return JSON.parse(localStorage.getItem("room"));
  }

  static setLocalStorageRoom(code) {
    localStorage.setItem("room", JSON.stringify(code));
  }

  static delLocalStorageRoom() {
    localStorage.removeItem("room");
  }

  // Question
  static getLocalStorageQuestion() {
    return JSON.parse(localStorage.getItem("question"));
  }

  static setLocalStorageQuestion(question) {
    localStorage.setItem("question", JSON.stringify(question));
    window.dispatchEvent(new Event("questionUpdate"));
  }

  static delLocalStorageQuestion() {
    localStorage.removeItem("question");
  }

  // Theme
  static getLocalStorageTheme() {
    return JSON.parse(localStorage.getItem("theme"));
  }

  static setLocalStorageTheme(mode) {
    localStorage.setItem("theme", JSON.stringify(mode));
  }
}
