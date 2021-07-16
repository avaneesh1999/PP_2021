import Signup from "./Components/Signup";
import AuthProvider from'./Context/AuthProvider'

function App() {
  return (
    <AuthProvider>

    {/* Hello */}
    <Signup/>
    </AuthProvider>
  );
}

export default App;
