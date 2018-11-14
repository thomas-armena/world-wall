import React from 'react';
import SideBar from './SideBar';
import ProjectDropdown from './ProjectDropdown';
import Wall from './Wall';
import View from './View';
import Login from './Login';
import Register from './Register';
import NavBar from './NavBar';
import Home from './Home';
import FocusWindow from './FocusWindow';
import EditorWindow from './EditorWindow';
import DragLayer from './DragLayer';
import './styles.scss';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';
import FWindowActions from '../actions/FWindowActions';




export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loginShow: false,
            menuShow: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleClickMenu = this.handleClickMenu.bind(this);
        this.handleDropDown = this.handleDropDown.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.get(process.env.USER_LOGIN)
            .then(response => {
                UserActions.userLogin(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        UserStore.on('CHANGE',this.handleChange);
    }

    componentWillUnmount() {
        UserStore.removeListener('CHANGE',this.handleChange);
    }

    handleChange(){
        this.setState({user:UserStore.getUser()});
    }

    handleLoginClick(){
        FWindowActions.fWindowContent('LOGIN');
        FWindowActions.fWindowShow();
    }

    handleRegisterClick(){
        FWindowActions.fWindowContent('REGISTER');
        FWindowActions.fWindowShow();
    }

    handleDropDown(){
        this.setState({loginShow:!this.state.loginShow});
    }

    handleClickMenu(){
        this.setState({menuShow:!this.state.menuShow});
    }

    hideMenu(){
        this.setState({menuShow:false});
    }

    handleSignOut(){
        axios.defaults.withCredentials = true;
        axios.get(process.env.USER_LOGOUT)
            .then(response => {
                console.log(response);
                UserActions.userLogout();
                this.setState({loginShow:false});
            })
            .catch(error=>{
                console.log(error);
            });
    }

    render() {

        const Editor = () => (
            <div>
                <SideBar />
                <Wall edit={true} />
                <ProjectDropdown />
                <EditorWindow />
                <DragLayer />
            </div>
        );

        const About = () => (
            <div>About</div>
        );

        const MenuLink = ({ label, to, activeOnlyWhenExact }) => (
            <Route
                path={to}
                exact={activeOnlyWhenExact}
                children={({ match }) => (
                    <div>
                        <Link onClick={this.hideMenu} className={match ? 'link activated' : 'link'} to={to}>{label}</Link>
                    </div>
                )}
            />
        );

        let loginArea;
        if(this.state.user != null){
            loginArea = (
                <div style={{display:'block'}}>
                    <li className='link right' onClick={this.handleDropDown}>

                        {this.state.user.username}
                    </li>
                </div>
            );
        } else {
            loginArea = (
                <div>
                    <li className='link right' onClick={this.handleLoginClick}>Sign In</li>
                    <li className='link right' onClick={this.handleRegisterClick}>Register</li>
                </div>
            );
        }
        const dropDownToggle = this.state.loginShow ? 'show-drop' : 'hide-drop';
        const UserDropDown = (
            <div className={'user-dropdown '+dropDownToggle}>
                <div className='item'>Profile</div>
                <div className='item' onClick={this.handleSignOut}>Signout</div>
            </div>
        );

        const menuToggle = this.state.menuShow ? 'show-menu' : 'hide-menu';
        let MenuDropDown;
        if (this.state.user){
            MenuDropDown = (
                <div className={'menu-dropdown '+menuToggle}>
                    <div className='menu-item'>Profile</div>
                    <div className='menu-item' onClick={this.handleSignOut}>Signout</div>
                </div>
            );
        } else {
            MenuDropDown = (
                <div className={'menu-dropdown '+menuToggle}>
                    <div className='menu-item'><MenuLink to="/" label="Home" /></div>
                    <div className='menu-item'>Profile</div>
                    <div className='menu-item' onClick={this.handleLoginClick}>Sign In</div>
                    <div className='menu-item' onClick={this.handleRegisterClick}>Register</div>
                    <div className='menu-item'><MenuLink to="/view/4kings" label="View" /></div>
                </div>
            );
        }


        return (
            <Router>
                <div>
                    <div className='nav-bar'>
                        <i className="material-icons left icon" onClick={this.handleClickMenu}>toc</i>
                        <div className='nav-desktop'>
                            <ul>
                                <li className='left'><MenuLink activeOnlyWhenExact={true} to="/" label="Home" /></li>
                                <li className='left'><MenuLink to="/create" label="Create" /></li>
                                <li className='left'><MenuLink to="/view/4kings" label="View" /></li>
                            </ul>
                            <ul>
                                {loginArea}
                            </ul>
                        </div>
                    </div>
                    {UserDropDown}
                    {MenuDropDown}
                    <div id="content-wrapper">
                        <Route exact path="/" component={Home} />
                        <Route path="/create" component={Editor} />
                        <Route path="/view/:id" component={View} />
                        <Route path="/about" component={About} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </div>
                    <FocusWindow />

                </div>
            </Router>
        );
    }
}
