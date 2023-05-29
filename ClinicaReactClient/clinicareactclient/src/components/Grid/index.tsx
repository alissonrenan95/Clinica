import React from 'react'

type Props = {
    headers: string[][],
    datagrid: string[][][],
    children?:any
}

//Primeira dimensão = array geral; (datagrid[])
//Segunda dimensão = array de registros por linha na table; (datagrid[][])
//Terceira dimensão = valores do registro/linha/coluna da tabela; (datagrid[][][])

const Grid = (props: Props) => {
    return (
        <table>
            {props.children}
            {(props?.headers?.length>0)?(
            <thead>
            {props?.headers?.map(headerlinha => (
                <tr>
                    {headerlinha.map(header=><th>{header}</th>)}
                </tr>
            ))}
            </thead>
            ):""}
            <tbody>
                {props?.datagrid?.map(data => (
                    data.map(objtr=>(

                        <tr>
                            {objtr.map(objtd => (<td>{objtd}</td>))}
                        </tr>)
                    
                    ))
                )}
            </tbody>
        </table>
    )
}

export default Grid;