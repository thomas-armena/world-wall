import React from 'react';
import SideBar from './SideBar';
import ProjectDropdown from './ProjectDropdown';
import Wall from './Wall';
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
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleDropDown = this.handleDropDown.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    componentDidMount() {

        //login when application starts
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:8000/profile')
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

    handleDropDown(){
        this.setState({loginShow:!this.state.loginShow});
    }

    handleSignOut(){
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:8000/logout')
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

        const View = () => (
            <div>
                <Wall edit={false}/>
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
                        <Link className={match ? 'link activated' : 'link'} to={to}>{label}</Link>
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
                    {/*
                    <i className="material-icons right"
                        style={{
                            color: 'white',
                            top: '5px',
                        }}
                    >
                        account_circle
                    </i>
                    */}
                </div>
            );
        } else {
            loginArea = (
                <div>
                    <li className='link right' onClick={this.handleLoginClick}>Sign In</li>
                    <li className='link right' onClick={this.handleLoginClick}>Register</li>
                </div>
            );
        }
        const dropDownToggle = this.state.loginShow ? 'show-drop' : 'hide-drop'
        const UserDropDown = (
            <div className={'user-dropdown '+dropDownToggle}>
                <div className='item'>Profile</div>
                <div className='item' onClick={this.handleSignOut}>Signout</div>
            </div>
        );

        return (
            <Router>
                <div>
                    <NavBar>
                        <ul>
                            <li className='left'><MenuLink activeOnlyWhenExact={true} to="/" label="Home" /></li>
                            <li className='left'><MenuLink to="/create" label="Create" /></li>
                            <li className='left'><MenuLink to="/view" label="View" /></li>
                        </ul>
                        <ul>
                            {loginArea}
                        </ul>
                    </NavBar>
                    {UserDropDown}
                    <div id="content-wrapper">
                        <Route exact path="/" component={Home} />
                        <Route path="/create" component={Editor} />
                        <Route path="/view" component={View} />
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
