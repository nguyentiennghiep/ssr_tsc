import * as React from 'react';
declare var __isBrowser__: boolean;
class Grid extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let repos;
        console.log(__isBrowser__);
        if (__isBrowser__) {
            repos = (window as any).__INITIAL_DATA__;
            delete (window as any).__INITIAL_DATA__;
        } else {
            repos = props.staticContext.data;
        }

        this.state = {
            repos,
            loading: repos ? false : true,
        };
        this.fetchRepos = this.fetchRepos.bind(this);
    }
    componentDidMount() {
        if (!this.state.repos) {
            this.fetchRepos(this.props.match.params.id);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchRepos(this.props.match.params.id);
        }
    }

    fetchRepos(lang) {
        this.setState(() => ({
            loading: true
        }));

        this.props.fetchInitialData(lang)
            .then((repos) => this.setState(() => ({
                repos,
                loading: false,
            })));
    }
    render() {
        const { repos, loading } = this.state;
        if (loading === true) {
            return <p>LOADING</p>;
        }
        return <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
            {repos.map(item => (
                <li key={item.name} style={{ margin: 30 }}>
                    <ul>
                        <li><a href={item.html_url}>{item.name}</a></li>
                        <li>@{item.owner.login}</li>
                        <li>{item.stargazers_count} stars</li>
                    </ul>
                </li>
            ))}
        </ul>;
    }
}

export default Grid;