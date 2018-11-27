import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter'
import axios from 'axios'


export default class ArtistsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            original: [],
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    getInfo = () => {

        var url = 'localhost:4200/albums';
        axios.get(url)
            .then(({ data }) => {
                data = data.data;
                this.setState({
                    data: data,
                    original: data,
                })
            })
            .catch(() => this.setState({ error: true }))
    }

    render() {
        const { data } = this.state.data;
        return (
            <div className="container">
                <ReactTable
                    data={data}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value}
                    columns={[
                        {
                            Header: "Main",
                            columns: [
                                {
                                    Header: "Title",
                                    id: "title",
                                    accessor: d => d.title,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["title"] }),
                                    filterAll: true
                                },
                                {
                                    Header: "Artist",
                                    id: "artist",
                                    accessor: d => d.artist,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["artist"] }),
                                    filterAll: true
                                }
                            ]
                        },
                        {
                            Header: "Info",
                            columns: [
                                {
                                    Header: "Label",
                                    accessor: "label",
                                    id: "label",
                                    accessor: d => d.label,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["label"] }),
                                    filterAll: true
                                },
                                {
                                    Header: "CountryCode",
                                    accessor: "countrycode",
                                    id: "countrycode",
                                    accessor: d => d.countrycode,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["countrycode"] }),
                                    filterAll: true
                                }
                            ]
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
                <br />
            </div>
        );
    }
}