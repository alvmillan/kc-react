import React from 'react'

const withLoading = Component => class extends React.Component {
    state = {}
    render () {
        const {loading} = this.state;
        return (
            <>
                { loading && 'Loading...'}
                <Component {...this.props} onLoad={this.load} hidden={this.loading} />
            </>
        )
    }
    load = async promise => {
        this.setState({loading: true})
        const loaded = await promise()
        this.setState({loading: false})
        return loaded
    }
}

export default withLoading