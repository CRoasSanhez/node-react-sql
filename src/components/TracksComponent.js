import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter'
import axios from 'axios'


export default class TracksComponent extends Component {

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

        var url = 'localhost:4200/tracks/filter1';
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
                                    Header: "Id",
                                    id: "id",
                                    accessor: d => d.id,
                                },
                                {
                                    Header: "Title",
                                    id: "title",
                                    accessor: d => d.title,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["title"] }),
                                    filterAll: true
                                },
                                {
                                    Header: "Album",
                                    id: "album",
                                    accessor: d => d.album,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["album"] }),
                                    filterAll: true
                                }
                            ]
                        },
                        {
                            Header: "Info",
                            columns: [
                                {
                                    Header: "Email",
                                    accessor: "email",
                                    id: "email",
                                    accessor: d => d.email,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["email"] }),
                                    filterAll: true
                                },
                                {
                                    Header: "Country",
                                    accessor: "country",
                                    id: "country",
                                    accessor: d => d.country,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["country"] }),
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