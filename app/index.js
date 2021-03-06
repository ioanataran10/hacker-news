import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'

const Posts = React.lazy(() => import('./components/Posts'))
const User = React.lazy(() => import('./components/User'))
const Post = React.lazy(() => import('./components/Post'))

export default class App extends React.Component {
    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState(({ theme }) => ({
                theme: theme === 'light' ? 'dark' : 'light'
            }))
        }
    }

    render() {
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className='container'>
                            <Nav />

                            <React.Suspense fallback={<Loading />}>
                                <Switch>
                                    <Route 
                                        exact 
                                        path='/' 
                                        render={() => <Posts type='top' />}
                                    />
                                    <Route
                                        path='/new'
                                        render={() => <Posts type='new' />}
                                    />
                                    <Route path='/post' component={Post}/>
                                    <Route path='/user' component={User} />
                                    <Route render={() => <h1>404</h1>} />
                                    
                                </Switch>
                            </React.Suspense>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(
    <App/>, document.getElementById('app') 
)