import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter'
import axios from 'axios'

export default class DisksComponent extends Component {

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

        var url = 'localhost:4200/country';
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
                                    Header: "ID",
                                    id: "id",
                                    accessor: d => d.id,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["id"] }),
                                    filterAll: true
                                },
                                {
                                    Header: "Code",
                                    id: "code",
                                    accessor: d => d.code,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["code"] }),
                                    filterAll: true
                                },
                                {
                                    Header: "Name",
                                    accessor: "name",
                                    id: "name",
                                    accessor: d => d.name,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["name"] }),
                                    filterAll: true
                                }
                            ]
                        },

                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
                <br />
            </div>
        );
    }
}