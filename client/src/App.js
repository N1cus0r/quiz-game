import AuthProvider from "./context/AuthProvider";
import GameProvider from "./context/GameProvider";
import RoomProvider from "./context/RoomProvider";
import AppRouter from "./routing/AppRouter";
import AppTheme from "./theme/AppTheme";

function App() {
  return (
    <div className="App">
      <AppTheme>
        <AuthProvider>
          <RoomProvider>
            <GameProvider>
              <AppRouter />
            </GameProvider>
          </RoomProvider>
        </AuthProvider>
      </AppTheme>
    </div>
  );
}

export default App;
