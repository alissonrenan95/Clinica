import React from 'react'

type Props = {
    headers: string[],
    datagrid: string[][]
}

const Grid = (props: Props) => {
    return (
        <table>
            <thead>
                <tr>
                    {props?.headers?.map(header => (<td>header</td>))}
                </tr>
            </thead>
            <tbody>
                {props.datagrid?.map(data => (
                    <tr>
                        {data.map(obj => (<td>{obj}</td>))}
                    </tr>)
                )}
            </tbody>
        </table>
    )
}

export default Grid;