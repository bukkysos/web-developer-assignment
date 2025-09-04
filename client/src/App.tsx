
import { BrowserRouter, Routes, Route } from "react-router";
import { UsersList } from "./pages/UsersList";
import { UserPost } from "./pages/UserPost";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/user-post" element={<UserPost />} />
        <Route path="/test" element={<>Hello wolrd</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App