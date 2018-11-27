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
        /*

        var data = '{"success":true,"code":200,"message":"success","data":[{"id":22,"name":"Felipe","email":"mercury.musica@gmail.com","countrycode":"CO","status":1},{"id":24,"name":"Desire","email":"desmandriba@yahoo.com","countrycode":"PE","status":1},{"id":26,"name":"Diego","email":"cobra.rockmetal@gmail.com","countrycode":"PE","status":1},{"id":42,"name":"Diego","email":"diegoreyes.bernardini@gmail.com","countrycode":"PE","status":1},{"id":183,"name":"Guillermo","email":"guillermobruno@rocketmail.com","countrycode":"AR","status":0},{"id":195,"name":"Joel","email":"djcaile@outlook.com","countrycode":"CL","status":1}],"errors":{}}';
        data = JSON.parse(data);
        this.setState({
            data: data,
            original: data,
        })
        */

        var url = 'localhost:4200/users';
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
                                    Header: "Name",
                                    accessor: "name",
                                    id: "name",
                                    accessor: d => d.name,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["name"] }),
                                    filterAll: true
                                },
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
                                    id: "countrycode",
                                    accessor: d => d.countrycode,
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["countrycode"] }),
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