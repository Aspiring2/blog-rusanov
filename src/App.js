import React from "react";
import Container from "@mui/material/Container";

import { useDispatch, useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home, FullPost, AddPost, Login } from "./pages";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { Services } from "./pages/Services";
import { Posts } from "./pages/Posts";
import { Tags } from "./pages/Tags";
import About from "./pages/About";
import Footer from "./components/Footer";
import { AddService } from "./pages/AddService";
import { FullService } from "./pages/FullService";


function App() {

  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>  
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/posts" element={<Posts/>}/> 
          <Route path="/services" element={<Services/>}/> 
          <Route path="/services/:id" element={<FullService/>}/>
          <Route path="/services/:id/edit" element={<AddService/>}/>
          <Route path="/tags/:id" element={<Tags/>}/> 
          <Route path="/posts/:id/edit" element={<AddPost/>}/>  
          <Route path="/post/:id" element={<FullPost/>}/>
          <Route path="/add-post" element={<AddPost/>}/>  
          <Route path="/add-service" element={<AddService/>}/>  
          <Route path="/login" element={<Login/>}/>  
          {/* <Route path="/register" element={<Registration/>}/> */}
        </Routes>
      </Container>
      <Footer/>
    </>
  );
}

export default App;
