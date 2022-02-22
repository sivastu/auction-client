import React,{useEffect,createContext,useReducer,useContext,useState} from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
//navigation
import NavBar from './components/Navbar'
//pages
import Home from './components/screens/Home'
import Signin from './components/screens/SignIn'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePosts from './components/screens/Maps'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPosts from './components/screens/SubscribesUserPosts'
import Reset from './components/screens/Reset'
import NewPassword from './components/screens/Newpassword'
import Admin from './admin/Admin'
import Changepassword from './components/screens/Changepassword'
import Removeaccount from './components/screens/Removeaccount'
import India from './components/screens/India'
import Travel from './components/screens/Travel'
import Veri_success from './components/screens/Veri_success'
import Veri_fail from './components/screens/Veri_fail'
import Detail from './components/screens/Detail'
import About from './components/screens/About'
import Contact from './components/screens/Contact'
import Guide from './components/screens/Guide'
//admin
import Mapdata from './components/screens/admin/Mapdata'
//css
import 'bootstrap/dist/css/bootstrap.css'
import "./App.css"

export const UserContext = createContext()

const Routing = ()=>{

  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  const [reset,setReset] = useState('')

  useEffect(()=>{
      const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else if (history.location.pathname.startsWith('/map_admin')){
      history.push('/map_admin')
    }else if (history.location.pathname.startsWith('/mapdata')){
      history.push('/mapdata')
    }else if (history.location.pathname.startsWith('/detail/:slug/:id')){
      history.push('/detail/:slug/:id')
    }else if (history.location.pathname.startsWith('/veri_success')){
      history.push('/veri_success')
    }else if (history.location.pathname.startsWith('/veri_fail')){
      history.push('/veri_fail')
    }else if (history.location.pathname.startsWith('/about')){
      history.push('/about')
    }else if (history.location.pathname.startsWith('/contact')){
      history.push('/contact')
    }else if (history.location.pathname.startsWith('/guide')){
      history.push('/guide')
    }
    // else{
    //   history.push('/india')
    // }
  },[])

  return(
    <Switch>
      <Route exact path="/" >
      <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/guide">
        <Guide />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost/>
      </Route>
      <Route path="/maps">
        <CreatePosts/>
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowingpost">
        <SubscribedUserPosts />
      </Route>
      <Route path="/india">
        <India />
      </Route>
      <Route path="/travel">
        <Travel />
      </Route>
      <Route path="/changepassword">
        <Changepassword />
      </Route>
      <Route path="/removeaccount">
        <Removeaccount />
      </Route>
      <Route exact  path="/reset">
        <Reset/>
      </Route>
      <Route path="/reset/:token">
        <NewPassword />
      </Route>
      <Route  path="/map_admin">
        <Admin />
      </Route>
      <Route path="/mapdata">
        <Mapdata />
      </Route>
      <Route path="/veri_success">
        <Veri_success />
      </Route>
      <Route path="/veri_fail">
        <Veri_fail />
      </Route>
      <Route path="/detail/:slug/:id">
        <Detail />
      </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
