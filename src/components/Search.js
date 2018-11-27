import React, { Component } from 'react'
import axios from 'axios'
import TableRow from './TableRow';

var tableStyle = {
    height: 600,
    overflow: "scroll"
}

class Search extends Component {

    state = {
        error: false,
        query: '',
        type: 'artist',
        results: [],
        original: []
    }

    filterData = (items) => {
        return items.map((item) => {
            switch (this.state.type) {
                //artist
                case "artist":
                    return {
                        id: item.id,
                        image_url: 'https://i1.wp.com/www.jweekly.com/wp-content/uploads/2015/08/Aplotnik-performance-art-beat_normal_size.jpg?w=298&crop=0%2C0px%2C100%2C300px&ssl=1',
                        name: item.name,
                        description: item.name + ' - Country: ' + (item.country || "US") + ' - Score: ' + item.score
                    }
                // Track
                case "recording":
                    return {
                        id: item.id,
                        image_url: 'https://www.sonicscoop.com/wp-content/uploads/2013/07/wax-to-tracks-producer-contest-1520.jpg',
                        name: item.title,
                        description: item.title + ' - Dur: ' + Math.round(item.length / 1000 / 60) + ' - Score: ' + item.score
                    }
                // Disc
                case "release":
                    return {
                        id: item.id,
                        image_url: 'https://image.freepik.com/free-icon/music-album_318-43305.jpg',
                        name: item.title,
                        description: item.title + ' - Date: ' + item.date + ' - Score: ' + item.score
                    }
            }
        })
    }

    getGreatestDescription = () => {
        let newArr = []
        if (this.state.results.length == 1) {
            this.setState({
                type: this.state.type,
                results: this.state.original,
                original: this.state.original
            })
        } else {
            newArr.push(this.state.results.reduce(function (a, b) { return a.description.length > b.description.length ? a : b }))
            this.setState({
                type: this.state.type,
                results: newArr,
                original: this.state.original
            })
        }
    }

    getInfo = () => {
        var type = window.location.href.split("/")[window.location.href.split("/").length - 1];
        this.setState({
            type: type,
            results: [],
            original: []
        })

        var url = 'localhost:4200/' + this.state.type;

        axios.get(url, { query: this.state.query })
            .then(({ data }) => {
                let value = type + "s";
                data = data.data;
                var newRes = this.filterData(data[value]);
                this.setState({
                    results: newRes,
                    original: newRes,
                })
            })
            .catch(() => this.setState({ error: true }))
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 3) {
                if (this.state.query.length % 2 === 0) {
                    this.getInfo()
                }
            } else if (!this.state.query) {
            }
        })
    }

    tabRow() {
        return this.state.results.map(function (object, i) {
            return <TableRow obj={object} key={i} />;
        });
    }

    render() {
        return (
            <div className="container">
                <form>
                    <input
                        placeholder="Search for..."
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                    />
                </form>
                <div className="container" >
                    <div className="container" style={tableStyle}>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>Image</td>
                                    <td onClick={this.getGreatestDescription}>Name</td>
                                    <td>Description</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.tabRow()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search