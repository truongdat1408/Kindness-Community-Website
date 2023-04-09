import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import HomeAd from './components/admin/home/HomeAd';
import ProfileAd from './components/admin/profile/ProfileAd';
import UserAd from './components/admin/users/UserAd';
import CreateActivity from './components/client/activities/CreateActivity';
import ListPosts from './components/client/group/ListPosts';
import Members from './components/client/group/Members';
import QA from './components/client/group/QA';
import Settings from './components/client/group/Settings';
import SinglePost from './components/client/group/SinglePost';
import ChangePassword from './components/client/individual/ChangePassword';
import Profile from './components/client/individual/Profile';
import Error404 from './components/commons/Error404';
import AuthRoute from './components/user/auth/AuthRoute';
import ClientAuthenRoute from "./components/user/auth/ClientAuthRoute";
import Login from './components/user/auth/Login';
import Register from './components/user/auth/Register';
import Admin from './pages/admin/Admin';
import Auth from './pages/auth/Auth';
import Group from './pages/client/Group';
import NewsFeed from './pages/client/NewsFeed';
import Personal from './pages/client/Personal';
import SearchResults from './pages/client/SearchResults';

function App() {
  const AuthenRoute = AuthRoute
  return (
    <Router>
      <Switch>
        <Route path="/login" exact render={() => (<Auth component={Login} />)} />
        <Route path="/register" exact render={() => (<Auth component={Register} />)} />
        <Redirect exact path="/admin" from="/admin" to={"/admin/home"} />
        <AuthenRoute path="/admin/home" exact render={() => (<Admin component={HomeAd} />)} />
        <AuthenRoute path="/admin/users" exact render={() => (<Admin component={UserAd} />)} />
        <AuthenRoute path="/admin/profile" exact render={() => (<Admin component={ProfileAd} />)} />
        <ClientAuthenRoute path="/" exact component={NewsFeed} />
        <ClientAuthenRoute path="/create-activity" exact render={() => (<Personal component={CreateActivity} />)} />
        <ClientAuthenRoute path="/profile/:profile_username?" exact render={() => (<Personal component={Profile} />)} />
        <ClientAuthenRoute path="/edit-password" exact render={() => (<Personal component={ChangePassword} />)} />
        <ClientAuthenRoute path="/group/:id" exact render={() => (<Group component={ListPosts} />)} />
        <ClientAuthenRoute path="/group/members/:id" exact render={() => (<Group component={Members} />)} />
        <ClientAuthenRoute path="/group/:id/post/:post_id" exact render={() => (<Group component={SinglePost} />)} />
        <ClientAuthenRoute path="/group/:id/qa" exact render={() => (<Group component={QA} />)} />
        <ClientAuthenRoute path="/group/:id/settings" exact render={() => (<Group component={Settings} />)} />
        <ClientAuthenRoute path={"/search/top/:con?"} exact component={SearchResults} />
        <Route path="*" exact component={Error404} />
      </Switch>
    </Router>
  );
}

export default App;
