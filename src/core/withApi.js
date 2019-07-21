import React from 'react'

const Context = React.createContext()

export { Context }

const withApi = Component => props =>
    <Context.Consumer>
        {
            api => <Component {...props} api={api} />
        }
    </Context.Consumer>

export default withApi