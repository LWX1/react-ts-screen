
import BaseRouter from "./router";
import AuthRouter from "./router/AuthRouter";

function App() {
  return (
    <div className="App">
      <AuthRouter>
        {
          <BaseRouter />
        }
      </AuthRouter>
    </div>
  );
}

export default App;
